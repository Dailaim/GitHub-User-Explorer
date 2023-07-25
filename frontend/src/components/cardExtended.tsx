import { person } from "../types/person";

export default function CardExtended({
	user,
	onSave,
}: { user: person; onSave: () => void }) {
	return (
		<div className="flex flex-col items-center p-8 space-y-6  max-w-2xl place-content-center mx-auto my-10">
			<img
				className="w-32 h-32 rounded-full"
				src={user.avatarUrl}
				alt={user.name}
			/>
			<h3 className="text-lg font-semibold dark:text-gray-100">{user.name}</h3>
			<span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100">
				{user.login}
			</span>
			<p className="text-gray-600 dark:text-gray-300">
				Followers: {user.followers || "N/A"}
			</p>

			<p className="text-gray-600 dark:text-gray-300">
				Location: {user.location || "N/A"}
			</p>
			<p className="text-gray-600 dark:text-gray-300">
				Public repos: {user.location ?? 0}
			</p>
			<div className="flex space-x-4 w-full">
				<a
					href={user.htmlUrl}
					className="w-full p-2  text-center font-semibold text-white rounded-lg shadow-md hover:bg-gray-700 bg-gray-800"
				>
					Github
				</a>
				<button
					onClick={onSave}
					type="button"
					className="w-full p-2 text-center font-semibold text-white rounded-lg shadow-md hover:bg-gray-700 bg-gray-800"
				>
					{!user.save ? "Save" : "Delete"}
				</button>
			</div>
		</div>
	);
}
