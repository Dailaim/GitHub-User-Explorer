import { Link, Route } from "wouter";
import { Home } from "./routers/home";
import { User } from "./routers/user";

import { Client, Provider, cacheExchange, fetchExchange } from "urql";
import { Save } from "./routers/save";

const client = new Client({
	url: import.meta.env.VITE_BACK_URL ?? "http://localhost:8080/graphql",
	exchanges: [cacheExchange, fetchExchange],
});

function App() {
	return (
		<>
			<Provider value={client}>
				<div>
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
							Save
						</Link>
					</div>

					<Route path="/" component={Home} />

					<Route path="/users/:name">
						{(params) => <User name={params.name} />}
					</Route>

					<Route path="/save" component={Save} />
				</div>
			</Provider>
		</>
	);
}

export default App;
