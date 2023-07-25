import { gql, useQuery } from "urql";

const Query = gql`
  query SearchUser( $searchUserUsername2: String!) {
  searchUser(username: $searchUserUsername2) {
    githubID
    login
    avatarUrl
    save
    extended {
      followers
    }
  }
}
`;

export const useFetcherSearchPeople = (name: string) => {
	const [result, reexecuteQuery] = useQuery({
		query: Query,
		variables: {
			searchUserUsername2: name,
		},
		pause: true,
	});

	const { data, error, fetching } = result;

	return {
		people: data?.searchUser,
		isLoading: fetching,
		isError: error && !data?.searchUser,
		error: error,
		reexecute: reexecuteQuery,
	};
};

/* type peopleResponse = {
	githubID: number;
	login: string;
	avatarUrl: string;
	apiUrl: string;
	htmlUrl: string;
}; */

/* 
const fetcher = async (name: string) => {
	const response = await fetch(
		`https://api.github.com/search/users?q=${name}+in:login&page=1&per_page=10`,
	);

	if (!response.ok) {
		throw new Error("Error fetching people");
	}

	const data = await response.json();

	const peopleData = data.items.map((personResponse: peopleResponse) => {
		return {
			githubID: personResponse.githubID,
			login: personResponse.login,
			avatarUrl: personResponse.avatarUrl,
			apiUrl: personResponse.apiUrl,
			htmlUrl: personResponse.htmlUrl,
		};
	});

	return { peopleData, count: data.total_count };
};

export const useFetcherPeople = (name: string) => {
	const { data, error, isLoading } = useSWR(name ? name : null, fetcher);

	return {
		people: data?.peopleData,
		count: data?.count,
		isLoading: isLoading,
		isError: error && !data?.peopleData,
		error: error,
	};
};
 */
