import { useEffect } from "react";
import { usePeopleState } from "../context/peopleListContext";
import { useFetcherPeople2 } from "./fetchPeople";

export function usePeopleList() {
	const { setPeople,  search } = usePeopleState();

	const { people, error, isLoading, reexecute } = useFetcherPeople2(search);

	useEffect(() => {
		if (people) {
			setPeople(people);
		}
	}, [ people, setPeople]);

	return {
    reexecute,
		isLoading: isLoading,
		isError: error && !people,
	};
}
