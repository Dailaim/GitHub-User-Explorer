import { user } from "@/types/User";
import { getUser } from "./getUser";

export const saveUser = async (parent, { user, search }, context, info) => {
	let saveUser: user = user;

	if (search) {
		saveUser = await getUser(parent, { username: search.login }, context, info);
	}

	const existingUser = await context.prisma.user.findUnique({
		where: { githubID: saveUser.githubID },
	});

	if (existingUser) {
		throw new Error('User with this githubID already exists');
	}
  
  saveUser.save = undefined;

	return await context.prisma.user.create({ data: saveUser });
};