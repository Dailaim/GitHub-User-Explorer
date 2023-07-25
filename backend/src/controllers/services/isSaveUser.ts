export const isSaveUser = async (parent, { username }, context, info) => {
	const saved = await context.prisma.user.findFirst({
		where: {
			githubID: parent.githubID,
		},
	});

	return saved ? true : false;
};
