import { useEffect } from "react";
import { Card } from "../components/card";
import { useSavePeopleState } from "../context/savePeopleListContext copy";

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
			{isError && (
				<div className="flex flex-col justify-center items-center">
					<h1 className="text-2xl first-line:font-bold text-red-500 dark:text-red-400">
						Error...
					</h1>
				</div>
			)}

			{isLoading && (
				<div className="flex flex-col justify-center items-center">
					<h1 className="text-2xl first-line:font-bold text-gray-500 dark:text-gray-400">
						Loading...
					</h1>
				</div>
			)}

			{!isLoading && !isError && (
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
