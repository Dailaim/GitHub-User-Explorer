import { gql, useQuery } from "urql";

const Query = gql`
  query GetSavedUsers {
    getSavedUsers {
      githubID
      login
      avatarUrl
      save
    }
  }
`;

export const useFetcherPeopleSave = () => {
	const [result, reexecuteQuery] = useQuery({
		query: Query,
	});

	const { data, error, fetching } = result;

	return {
		people: data?.getSavedUsers,
		isLoading: fetching,
		isError: error && !data?.getSavedUsers,
		error: error,
    reexecute: reexecuteQuery,
	};
};

