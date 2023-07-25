import { context } from "@/types/serverTypes";
import wretch from "wretch";

interface githubApiResponse {
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
	name: string;
	company: string;
	blog: string;
	location: string;
	twitter_username: string;
	public_repos: number;
	public_gists: number;
	followers: number;
	following: number;
	created_at: string;
	updated_at: string;
}

export const getUser = async (parent, { username }, context: context, info) => {
	try {
		const response: githubApiResponse = await wretch(
			`https://api.github.com/users/${username}`,
		)
			.get()
			.json();

		if (!response) {
			throw new Error(`User ${username} not found`);
		}

		const saved = await context.prisma.user.findFirst({
			where: {
				githubID: response.id,
			},
		});

		const user = {
			githubID: response.id,
			login: response.login,
			name: response.name,
			location: response.location,
			publicRepos: response.public_repos,
			followers: response.followers,
			following: response.following,
			apiUrl: response.url,
			avatarUrl: response.avatar_url,
			htmlUrl: response.html_url,
			save: saved ? true : false,
		};

		return user;
	} catch (err) {
		console.error(err);
		throw new Error(`Error fetching user ${username}`);
	}
};
