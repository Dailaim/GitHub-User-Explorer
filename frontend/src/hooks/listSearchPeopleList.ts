import { useEffect } from "react";
import { searchPeopleListState } from "../context/searchPeopleContext";
import { useFetcherSearchPeople } from "./fecherSearchPeople";

export function useListSearchPeople() {
	const { setPeople, search } = searchPeopleListState();

	const { people, error, isLoading, reexecute } =
		useFetcherSearchPeople(search);

	useEffect(() => {
		if (people) {
			setPeople(people);
		}
	}, [people, setPeople]);

	return {
		reexecute,
		isLoading: isLoading,
		isError: error && !people,
	};
}
