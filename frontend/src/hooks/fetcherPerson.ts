import { gql, useQuery } from "urql";
import { person } from "../types/person";

const peopleQuery = gql`
query GetUser($username: String!) {

  getUser(username: $username) {
    name
    avatarUrl
    githubID
    apiUrl
    htmlUrl
    location
    publicRepos
    followers
    following
    login
    save
}
}`;

export const useFetcherPerson = (name: string) => {
	const [result] = useQuery({
		query: peopleQuery,
		variables: {
			username: name,
		},
		requestPolicy: "network-only",
	});

	return {
		person: result?.data?.getUser as person,
		error: result.error,
		loading: result.fetching,
	};
};
