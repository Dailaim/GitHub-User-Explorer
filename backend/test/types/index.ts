import { user } from "../../src/types/User";
export { context } from "../../src/types/serverTypes";

export interface Data {
	searchUser: user[];
	getUser: user;
	getSavedUsers: user[];
	saveUser: user;
	deleteUser: user;
}

export interface GraphQLResponseError {
	message: string;
	locations: Array<{
		line: number;
		column: number;
	}>;
	path: string[];
	extensions: {
		code: string;
		stacktrace: string[];
	};
}

export interface SingleResult {
	data: Data;
	errors: GraphQLResponseError | Array<GraphQLResponseError> | undefined;
}

export interface Response {
	kind: string;
	singleResult: SingleResult;
}
