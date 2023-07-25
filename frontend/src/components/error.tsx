export function ErrorMessage({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col justify-center items-center">
			<h1 className="text-2xl first-line:font-bold text-red-500 dark:text-red-400">
				{children}
			</h1>
		</div>
	);
}
