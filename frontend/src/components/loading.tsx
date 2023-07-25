export function Loading({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col justify-center items-center">
			<h1 className="text-2xl first-line:font-bold text-blue-500">
				{children}
			</h1>
		</div>
	);
}
