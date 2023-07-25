import { FC } from "react";
import { Link } from "wouter";
import { person } from "../types/person";

export const Card: FC<{ person: person; onSave?: () => void }> = ({
	person,
	onSave,
}) => {
	return (
		<>
			<div className="flex flex-1 flex-col p-8">
				<img
					className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
					src={person.avatarUrl}
					alt=""
				/>
				<h3 className="mt-6 text-sm font-medium text-gray-900 dark:text-gray-200">
					{person.login}
				</h3>
				<dl className="mt-1 flex flex-grow flex-col justify-between">
					<dt className="sr-only">Role</dt>
					<dd className="mt-3">
						<span className="inline-flex items-center rounded-full bg-green-50 dark:bg-green-500 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-200 ring-1 ring-inset ring-green-600/20 dark:ring-green-400">
							{person.githubID}
						</span>
					</dd>
				</dl>
			</div>
			<div>
				<div className="-mt-px flex divide-x divide-gray-200 dark:divide-gray-700">
					<div className="flex w-0 flex-1">
						<Link
							href={`/users/${person.login}`}
							className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 dark:text-gray-200"
						>
							Ver perfil
						</Link>
					</div>
					<button
						type="button"
						className="-ml-px flex w-0 flex-1"
						onClick={onSave}
					>
						<span className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 dark:text-gray-200">
							{!person.save ? "Guardar" : "Eliminar"}
						</span>
					</button>
				</div>
			</div>
		</>
	);
};
