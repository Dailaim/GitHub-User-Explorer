import serve from "@es-exec/esbuild-plugin-serve";
import * as esbuild from "esbuild";

// recibr argumentos de la linea de comandos
const args = process.argv.slice(2);

// si el argumento es -w o --watch, se activa el watch mode
const watch = args.includes("-w") || args.includes("--watch");

const minify = args.includes("-m") || args.includes("--minify");

const plugins = [];

// si el argumento es -s o --serve, se activa el modo de desarrollo

if (args.includes("--serve") || args.includes("-s")) {
	/* 	const serverArgs = [];

	if (watch) {
		serverArgs.push("--watch-path=src");
	}
 */
	plugins.push(
		serve({
			main: "dist/index.js",
			runOnError: true,
			env: "./.env",
		}),
	);
}

/** @type esbuild.BuildOptions */
const build = {
	bundle: true,
	minify: minify,
	platform: "node",
	target: "node18",
	format: "esm",
	outdir: "dist",
	tsconfig: "./tsconfig.json",
	entryPoints: ["src/index.ts"],
	packages: "external",
	plugins: plugins,
};

if (watch) {
	const ctx = await esbuild.context({ ...build });

	await ctx.watch();
	console.log("watching...");
} else {
	await esbuild.build({ ...build }).catch((err) => {
		console.error(err);
		process.exit(1);
	});
}
