import { useEffect } from "react";
import { Card } from "../components/card";
import { useSavePeopleState } from "../context/savePeopleListContext copy";

import { ErrorMessage } from "../components/error";
import { Loading } from "../components/loading";
import { useFetcherSavePeople } from "../hooks/peopleSaveList";
import { useSaveOrDeletePerson } from "../hooks/saveOrDeletePerson";

export function Save() {
	const { peopleSave, setPeople, people } = useSavePeopleState();

	const { isError, isLoading, people: users } = useFetcherSavePeople();

	useEffect(() => {
		if (users) {
			setPeople(users);
		}
	}, [setPeople, users]);

	const { onSave } = useSaveOrDeletePerson(peopleSave);

	return (
		<>
			{isError && <ErrorMessage>Failed to load user</ErrorMessage>}

			{isLoading && <Loading>Loading...</Loading>}

			{!isLoading && !isError &&  (
				<ul
					role="list"
					className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10"
				>
					{people.map((person, index) => (
						<li
							key={person.githubID}
							className="col-span-1 flex flex-col divide-y divide-gray-200 dark:divide-gray-700 rounded-lg bg-white dark:bg-gray-800 text-center shadow"
						>
							<Card
								person={person}
								onSave={() => {
									onSave(person, index);
								}}
							/>
						</li>
					))}
				</ul>
			)}
		</>
	);
}
