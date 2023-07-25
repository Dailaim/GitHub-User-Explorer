import { suite } from "uvu";
import * as assert from "uvu/assert";
import { serverTest } from "./serverTest";

import { PrismaClient } from "@prisma/client";
import td from "testdouble";
import { Response } from "./types";

const Queries = suite("Queries");

Queries.before.each((context) => {
	context.prisma = td.object<PrismaClient>();
});

Queries.after.each(() => {
	td.reset();
});

Queries("fetches saved users", async (context) => {
	td.when(context.prisma.user.findMany()).thenResolve([
		{
			id: 1,
			githubID: 1234567890,
			login: "Daizaikun",
			avatarUrl: "https://avatars.githubusercontent.com/u/1234567890?v=4",
			apiUrl: "https://api.github.com/users/Daizaikun",
		},
	]);

	const GET_SAVED_USERS = `#graphql
      query {
        getSavedUsers {
          id
          githubID
          login
        }
      }
    `;

	const res = await serverTest.executeOperation(
		{
			query: GET_SAVED_USERS,
		},
		{
			contextValue: {
				prisma: context.prisma,
			},
		},
	);

	const body = res.body as unknown as Response;

	assert.ok(body, "Body should not be null");

	assert.ok(body.singleResult, "Data should not be null");

	const { data, errors } = body.singleResult;

	assert.is(
		errors,
		undefined,
		`No errors should be returned ${JSON.stringify(errors)}`,
	);

	assert.ok(data, `Data should not be null ${JSON.stringify(data)}`);

	const getSavedUsers = data.getSavedUsers;

	assert.ok(getSavedUsers, "getSavedUsers should not be null");
	assert.ok(getSavedUsers.length > 0, "getSavedUsers should not be empty");
	assert.is(
		getSavedUsers[0].login,
		"Daizaikun",
		`User login is not 'Daizaikun'`,
	);
});

Queries.run();
