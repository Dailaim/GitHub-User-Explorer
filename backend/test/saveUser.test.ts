import { suite } from "uvu";
import * as assert from "uvu/assert";
import { serverTest } from "./serverTest";

import { PrismaClient } from "@prisma/client";
import td from "testdouble";
import { user } from "../src/types/User";
import { Response } from "./types";

const Mutations = suite("Mutations");

Mutations.before.each((context) => {
	context.prisma = td.object<PrismaClient>();
});

Mutations.after.each(() => {
	td.reset();
});

Mutations("saves a user", async (context) => {
	const mockUser: user = {
		githubID: 53654,
		htmlUrl: "AFdsahdfg",
		login: "Daizaikun",
		name: "AFdsahgdf",
		apiUrl: "AFdsa",
		avatarUrl: "AFdsa",
	};

	td.when(
		context.prisma.user.create({
			data: td.matchers.anything(),
		}),
	).thenResolve(mockUser);

	td.when(
		context.prisma.user.findUnique({
			where: { githubID: td.matchers.anything() },
		}),
	).thenResolve(null);

	const SAVE_USER = `#graphql
      mutation SaveUser($user: UserInput!) {
        saveUser(user: $user) {
          githubID
          login
          name
          apiUrl
          avatarUrl
          htmlUrl
        }
      }
    `;

	const res = await serverTest.executeOperation(
		{
			query: SAVE_USER,
			variables: {
				user: mockUser,
			},
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

	if (data) {
		const savedUser = data.saveUser;

		assert.ok(savedUser, "saveUser should not be null");
		assert.is(savedUser.login, mockUser.login, `User login is not 'Daizaikun'`);
	}
});

Mutations("fails to save a user that already exists", async (context) => {
	const mockUser: user = {
		githubID: 53654,
		htmlUrl: "AFdsahdfg",
		login: "Daizaikun",
		name: "AFdsahgdf",
		apiUrl: "AFdsa",
		avatarUrl: "AFdsa",
	};

	td.when(
		context.prisma.user.create({
			data: td.matchers.anything(),
		}),
	).thenResolve(mockUser);

	td.when(
		context.prisma.user.findUnique({
			where: { githubID: td.matchers.anything() },
		}),
	).thenResolve(null);

	const SAVE_USER = `#graphql
      mutation SaveUser($user: UserInput!) {
        saveUser(user: $user) {
          githubID
          login
          name
          apiUrl
          avatarUrl
          htmlUrl
        }
      }
    `;

	const res = await serverTest.executeOperation(
		{
			query: SAVE_USER,
			variables: {
				user: mockUser,
			},
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

	const { errors } = body.singleResult;

	assert.ok(errors, "Errors should not be null");

	const message = errors[0].message;

	assert.ok(message, "Message should not be null");
	assert.is(
		message,
		"User·with·this·githubID·already·exists",
		`Message is ${message} instead of 'User·with·this·githubID·already·exists'`,
	);
});

Mutations.run();
