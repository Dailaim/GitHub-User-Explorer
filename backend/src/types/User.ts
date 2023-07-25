export type user = {
	id?: number;
	githubID: number;
	login: string;
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
