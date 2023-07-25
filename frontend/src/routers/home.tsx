import { Card } from "../components/card";
import { usePeopleState } from "../context/peopleListContext";
import { useAutoSearch } from "../hooks/autoSearch";
import { usePeopleList } from "../hooks/peopleList";
import { useSaveOrDeletePerson } from "../hooks/saveOrDeletePerson";

export function Home() {
	const { isError, isLoading, reexecute } = usePeopleList();

	const {
		setPeople,
		setSearch,
		people,
		autoSearch,
		setAutoSearch,
		search,
		peopleSave,
	} = usePeopleState();

	useAutoSearch(reexecute, search, autoSearch, 500);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		reexecute();
	};

	const { onSave } = useSaveOrDeletePerson(peopleSave);

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col justify-center items-center bg-white dark:bg-gray-800 p-4 rounded-md my-5"
			>
				<label
					className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
					htmlFor="search"
				>
					Search
				</label>
				<input
					type="text"
					id="search"
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-gray-800 dark:border-gray-600"
					value={search}
					onChange={(e) => {
						if (e.target.value === "" && autoSearch) {
							setPeople([]);
							setSearch("");
							return;
						}
						if (e.target.value === " " && autoSearch) {
							setSearch("");
							setPeople([]);
							return;
						}
						setSearch(e.target.value);
					}}
					placeholder="Search"
				/>
				<div className="mt-4 flex items-center">
					<input
						title="Auto Search"
						type="checkbox"
						id="autoSearch"
						className="mr-2 h-5 w-5 text-blue-600 rounded dark:border-gray-600 dark:bg-gray-800"
						checked={autoSearch}
						onChange={(e) => {
							setAutoSearch(e.target.checked);
						}}
					/>
					<label
						className="block text-gray-700 dark:text-white text-sm font-bold"
						htmlFor="autoSearch"
					>
						Auto Search
					</label>
				</div>
				<button
					className="mt-4 bg-blue-500 hover:bg-blue-700 text-white dark:text-gray-800 dark:bg-blue-300 dark:hover:bg-blue-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					type="submit"
				>
					Search
				</button>
			</form>

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
					className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
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
