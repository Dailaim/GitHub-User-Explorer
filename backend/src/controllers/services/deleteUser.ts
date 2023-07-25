import { user } from "@/types/User";
import { getUser } from "./getUser";

export const deleteUser = async (parent, { githubID }, context, info) => {

	const existingUser = await context.prisma.user.findUnique({
		where: { githubID },
	});

	if (!existingUser) {
		throw new Error("User with this githubID does not exist");
	}

	return await context.prisma.user.delete({
		where: { githubID },
	});
};
