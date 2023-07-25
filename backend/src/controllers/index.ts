import { deleteUser } from "./services/deleteUser";
import { getSavedUsers } from "./services/getSavedUsers";
import { getUser } from "./services/getUser";
import { saveUser } from "./services/saveUser";
import { searchUser } from "./services/searchUser";

export const resolvers = {
  Query: {
    searchUser,
    getUser,
    getSavedUsers,
  },
  Mutation: {
    saveUser,
    deleteUser
  },
};
