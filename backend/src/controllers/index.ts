import { deleteUser } from "./services/deleteUser";
import { getSavedUsers } from "./services/getSavedUsers";
import { getUser } from "./services/getUser";
import { isSaveUser } from "./services/isSaveUser";
import { saveUser } from "./services/saveUser";
import { searchUser } from "./services/searchUser";
import { userExtended } from "./services/userExtended";

export const resolvers = {
	UserSearchResult: {
		extended: userExtended,
	},

	User: {
		save: isSaveUser,
	},

	Query: {
		searchUser,
		getUser,
		getSavedUsers,
	},
	Mutation: {
		saveUser,
		deleteUser,
	},
};
