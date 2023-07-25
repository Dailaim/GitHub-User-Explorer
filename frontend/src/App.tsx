import { Route } from "wouter";
import { Home } from "./routers/home";
import { User } from "./routers/user";

import { Client, Provider, cacheExchange, fetchExchange } from "urql";
import { Layout } from "./components/layaout";
import { Save } from "./routers/save";

const client = new Client({
	url: import.meta.env.VITE_BACK_URL ?? "http://localhost:8080/graphql",
	exchanges: [cacheExchange, fetchExchange],
});

function App() {
	return (
		<>
			<Provider value={client}>
				<Layout />

				<Route path="/" component={Home} />

				<Route path="/users/:name">
					{(params) => <User name={params.name} />}
				</Route>

				<Route path="/save" component={Save} />
			</Provider>
		</>
	);
}

export default App;
