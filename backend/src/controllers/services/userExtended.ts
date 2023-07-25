import { getUser } from "./getUser";

export const userExtended = async (parent, args, context, info) => {
	return await getUser(parent, { username: parent.login }, context, info);
};
