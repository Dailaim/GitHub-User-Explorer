import { PrismaClient } from "@prisma/client";
import td from "testdouble";
import { suite } from "uvu";
import * as assert from "uvu/assert";
import { serverTest } from "./serverTest";
import { Response } from "./types";

const Mutations = suite("Mutations");

Mutations.before.each((context) => {
	context.prisma = td.object<PrismaClient>();
});

Mutations.after.each(() => {
	td.reset();
});

Mutations("deletes an existing user", async (context) => {
	const mockUser = {
		githubID: 123,
		login: "testuser",
		name: "testuser",
		apiUrl: "testuser",
		avatarUrl: "testuser",
		htmlUrl: "testuser",
	};

	td.when(
		context.prisma.user.findUnique({
			where: { githubID: td.matchers.anything() },
		}),
	).thenResolve(mockUser);

	td.when(
		context.prisma.user.delete({ where: { githubID: td.matchers.anything() } }),
	).thenResolve(mockUser);

	const DELETE_USER = `#graphql
  mutation DeleteUser($id: Int!) {
    deleteUser(githubID: $id) {
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
			query: DELETE_USER,
			variables: {
				id: 123,
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

	assert.equal(
		data.deleteUser.githubID,
		123,
		"Deleted user's githubID should match the one provided",
	);
	assert.equal(
		data.deleteUser.login,
		"testuser",
		"Deleted user's login should match the one provided",
	);
});

Mutations(
	"throws an error when deleting a non-existing user",
	async (context) => {
		const mockUser = {
			githubID: 123,
			login: "testuser",
			name: "testuser",
			apiUrl: "testuser",
			avatarUrl: "testuser",
			htmlUrl: "testuser",
		};

		td.when(context.prisma.user.findUnique(td.matchers.anything())).thenResolve(
			null,
		);

		td.when(
			context.prisma.user.delete({
				where: { githubID: td.matchers.anything() },
			}),
		).thenResolve(mockUser);

		const DELETE_USER = `#graphql
    mutation DeleteUser($id: Int!) {
      deleteUser(githubID: $id) {
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
				query: DELETE_USER,
				variables: {
					id: 123,
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

		assert.ok(
			errors,
			"Response should have errors when deleting a non-existing user",
		);

		assert.is(
			errors[0].message,
			"User with this githubID does not exist",
			`"Error message should be 'User with this githubID does not exist'" instead of ${JSON.stringify(
				body,
			)}`,
		);
	},
);

Mutations.run();
