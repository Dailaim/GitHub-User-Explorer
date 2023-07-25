import serve from '@es-exec/esbuild-plugin-serve';
import * as esbuild from 'esbuild';



// recibr argumentos de la linea de comandos
const args = process.argv.slice(2)

// si el argumento es -w o --watch, se activa el watch mode
const watch = args.includes('-w') || args.includes('--watch')


// si el argumento es -d o --dev, se activa el modo de desarrollo
const dev = args.includes('-d') || args.includes('--dev')

const minify = args.includes('-m') || args.includes('--minify')


const plugins = []

if (args.includes('--serve') || args.includes('-s')) {
  plugins.push(serve({
    main: 'dist/index.js',
    runOnError: true,

  }))
}

/** @type esbuild.BuildOptions */
const build = {
  bundle: true,
  minify: minify,
  platform: 'node',
  target: 'node18',
  format: 'esm',
  outdir: 'dist',
  tsconfig: './tsconfig.json',
  entryPoints: ['src/index.ts'],
  packages: 'external',
  plugins: plugins,
  
}



await esbuild.build({...build}).catch((err) => {
  console.error(err)
  process.exit(1)
})

