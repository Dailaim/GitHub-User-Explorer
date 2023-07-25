import { gql, useMutation } from "urql";

const QueryDeletePerson = gql`
  mutation DeleteUser($githubID: Int!) {
  deleteUser(githubID: $githubID) {
    id
  }
}
`;

export const useDeletePerson = () => {
	const [, savePersonLogin] = useMutation(QueryDeletePerson);

	return savePersonLogin;
};
