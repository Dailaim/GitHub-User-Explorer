export type person = {
	id?: number;
	login: string;
	githubID: number;
	avatarUrl: string;
	apiUrl: string;
	htmlUrl: string;
	name: string;
	location?: string;
	publicRepos?: number;
	followers?: number;
	following?: number;
	save?: boolean;
};
