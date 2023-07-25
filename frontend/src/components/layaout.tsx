import { Link } from "wouter";

export function Layout() {
	return (
		<div className="flex justify-around w-full">
			<Link
				href="/"
				className="flex-1 text-center text-lg text-white hover:text-yellow-500 transition-colors duration-300"
			>
				Home
			</Link>
			<Link
				href="/save"
				className="flex-1 text-center text-lg text-white hover:text-yellow-500 transition-colors duration-300"
			>
				Saved Profiles
			</Link>
		</div>
	);
}
