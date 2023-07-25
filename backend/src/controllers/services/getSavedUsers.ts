import { user } from "@/types/User";
import { context } from "@/types/serverTypes";

export const getSavedUsers = async (parent, args, context: context, info) => {
	const users: user[] = await context.prisma.user.findMany();

	users.forEach((user) => {
		user.save = true;
	});

	return users;
};
