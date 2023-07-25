import { gql, useMutation } from "urql";

const QuerySavePersonLogin = gql`
  mutation SaveUser($search: UserSearchInput) {
    saveUser ( search: $search) {
      id
      githubID
      followers
    }
  }
`;

const QuerySavePersonUser = gql`
  mutation SaveUser($user: UserInput) {
    saveUser ( user: $user) {
      id
      githubID
      followers
    }
  }
`;


/* 
  Return the mutation function to save a person
  If login is true, return the mutation function to save a person by login
  If login is false, return the mutation function to save a person by user
*/
export const useSavePerson = ( login?: boolean ) => {
	const [, savePersonLogin] = useMutation(QuerySavePersonLogin);

	const [, savePersonUser] = useMutation(QuerySavePersonUser);

	if (login) {
		return savePersonLogin;
	} else {
		return savePersonUser;
	}
};
