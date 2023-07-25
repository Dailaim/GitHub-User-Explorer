import { PrismaClient } from "@prisma/client";
import td from "testdouble";
import { suite } from "uvu";
import * as assert from "uvu/assert";
import { serverTest } from "./serverTest";
import { Response } from "./types"; 

const Queries = suite("Queries");

Queries.before.each((context) => {
	context.prisma = td.object<PrismaClient>();
});

Queries.after.each(() => {
	td.reset();
});

Queries("fetches user 'octocat'", async (context) => {
	const SEARCH_USER = `#graphql
      query SearchUser($username: String!) {
        searchUser(username: $username) {
          githubID
          login
        }
      }
    `;

	td.when(context.prisma.user.findMany(td.matchers.anything())).thenResolve([]);

	const result = await serverTest.executeOperation(
		{
			query: SEARCH_USER,
			variables: { username: "octocat" },
		},
		{
			contextValue: {
				prisma: context.prisma,
			},
		},
	);

	const body = result.body as unknown as Response;

	assert.is(
		body.kind,
		"single",
		`Response kind is ${body.kind} instead of 'single'`,
	);

	assert.type(
		body.singleResult.errors,
		"undefined",
		"An error was returned when it should not have been",
	);

	assert.is(
		body.singleResult.data.searchUser.length > 0,
		true,
		"The searchUser array should not be empty for an existing user",
	);

	const data = body.singleResult.data;

	assert.is(
		data.searchUser[0].login,
		"octocat",
		`Response body is ${data.searchUser[0].login} instead of 'octocat'`,
	);
});

Queries("fetches 'Daizaikun'", async (context) => {
	const SEARCH_USER = `#graphql
      query SearchUser($username: String!) {
        searchUser(username: $username) {
          githubID
          login
        }
      }
    `;

	td.when(context.prisma.user.findMany(td.matchers.anything())).thenResolve([]);

	const result = await serverTest.executeOperation(
		{
			query: SEARCH_USER,
			variables: { username: "Daizaikun" },
		},
		{
			contextValue: {
				prisma: context.prisma,
			},
		},
	);

	const body = result.body as unknown as Response;

	assert.is(
		body.kind,
		"single",
		`Response kind is ${body.kind} instead of 'single'`,
	);

	assert.type(
		body.singleResult.errors,
		"undefined",
		"An error was returned when it should not have been",
	);

	assert.is(
		body.singleResult.data.searchUser.length,
		1,
		"The searchUser array should be empty for a non-existing user",
	);
});


Queries("fetches null", async (context) => {
	const SEARCH_USER = `#graphql
      query SearchUser($username: String!) {
        searchUser(username: $username) {
          githubID
          login
        }
      }
    `;

	td.when(context.prisma.user.findMany(td.matchers.anything())).thenResolve([]);

	const result = await serverTest.executeOperation(
		{
			query: SEARCH_USER,
			variables: { username: "Daizaasdfvasdikun" },
		},
		{
			contextValue: {
				prisma: context.prisma,
			},
		},
	);

	const body = result.body as unknown as Response;

	assert.is(
		body.kind,
		"single",
		`Response kind is ${body.kind} instead of 'single'`,
	);

	assert.type(
		body.singleResult.errors,
		"undefined",
		"An error was returned when it should not have been",
	);

	assert.is(
		body.singleResult.data.searchUser.length,
		0,
		"The searchUser array should be empty for a non-existing user",
	);
});

Queries.run();
