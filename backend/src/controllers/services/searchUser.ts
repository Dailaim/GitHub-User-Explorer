import { user } from "@/types/User";
import wretch from "wretch";

interface githubApiResponse {
	total_count: number;
	incomplete_results: boolean;
	items: Item[];
}

interface Item {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: boolean;
	score: number;
}

export const searchUser = async (parent, { username }, context, info) => {
	const response: githubApiResponse = await wretch(
		`https://api.github.com/search/users?q=${username}+in:login&page=1&per_page=10`,
	)
		.get()
		.json();

	if (!response.items) {
		throw new Error("Unable to fetch users");
	}


	const existingUsers = await context.prisma.user.findMany({
		where: {
			githubID: {
				in: response.items.map((user) => user.id), 
			},
		},
	});


	const existingUsersMap = existingUsers.reduce(
		(map, user) => ({
			...map,
			[user.githubID]: user,
		}),
		{},
	);


	const users: Partial<user>[] = response.items.map(
		(user) : Partial<user> => ({
			githubID: user.id,
			login: user.login,
			avatarUrl: user.avatar_url,
			apiUrl: user.url,
			htmlUrl: user.html_url,
			save: !!existingUsersMap[user.id], 
		}),
	);

	return users;
};
