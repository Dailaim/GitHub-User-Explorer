export function GithubToken() {
	const gitHubToken = process.env.GITHUB_TOKEN;
	if (gitHubToken) {
		return {
			Authorization: `Bearer ${gitHubToken}`,
		};
	}
	return {};
}
