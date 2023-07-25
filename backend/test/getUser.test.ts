import { PrismaClient } from "@prisma/client";
import * as td from "testdouble";
import { suite } from "uvu";
import * as assert from "uvu/assert";
import { serverTest } from "./serverTest";
import { Response } from "./types"; 

const Query = suite("Queries");

Query.before.each((context) => {
	context.prisma = td.object<PrismaClient>();
});

Query.after.each(() => {
	td.reset();
});

Query("fetches a user with a given username", async (context) => {
	td.when(
		context.prisma.user.findFirst(
			td.matchers.contains({ where: { githubID: td.matchers.anything()}}),
		),
	).thenResolve(true);

	const GET_USER = `#graphql
    query GetUser($username: String!) {
      getUser(username: $username) {
        id
        githubID
        login
        name
        save
      }
    }
  `;

	const res = await serverTest.executeOperation(
		{
			query: GET_USER,
			variables: {
				username: "Daizaikun",
			},
		},
		{
			contextValue: {
				prisma: context.prisma,
			},
		},
	);

	const body = res?.body as unknown as Response;

	const { data, errors } = body.singleResult;

	assert.is(errors, undefined, "Response has errors");
	assert.ok(data, `Response has no data ${JSON.stringify(body)}`);

	const user = data?.getUser;

	assert.ok(user, "User not found");

	assert.is(user.save, true, "User is not save");
	assert.is(user.login, "Daizaikun", "User login is not 'Daizaikun'");
});

Query("fetches a user with a given username not save", async (context) => {

	td.when(
		context.prisma.user.findFirst(
			td.matchers.contains({ where: { githubID: td.matchers.anything()}}),
		),
	).thenResolve(false);

	const GET_USER = `#graphql
    query GetUser($username: String!) {
      getUser(username: $username) {
        id
        githubID
        login
        name
        save
      }
    }
  `;

	const res = await serverTest.executeOperation(
		{
			query: GET_USER,
			variables: {
				username: "Daizaikun",
			},
		},
		{
			contextValue: {
				prisma: context.prisma,
			},
		},
	);

	const body = res?.body as unknown as Response;

	const { data, errors } = body.singleResult;

	assert.is(errors, undefined, "Response has errors");
	assert.ok(data, `Response has no data ${JSON.stringify(body)}`);

	const user = data?.getUser;

	assert.ok(user, "User not found");

	assert.is(user.save, false, "User is save");
	assert.is(user.login, "Daizaikun", "User login is not 'Daizaikun'");
});

Query.run();
