//////////////////////////////////////////
//                                      //
//                                      //
//               LOADERS                //
//                                      //
//                                      //
//////////////////////////////////////////

import { CreateLogger } from 'agnostics/logger'
const { YAY, ERR, SAY } = CreateLogger( import.meta.url )

import path from 'path'
import fs from 'fs/promises'
import { pathToFileURL } from 'node:url'

export async function LoadDep( name, url ) {

	const [ base, stem ] = url.split('.')
	let mod

	if (!globalThis[base]) {
		try {
			mod = (await import (base))
		} catch(err) {
			try {
				const pkgDir = path.join(process.cwd(), 'node_modules', base)
				const pkgJsonPath = path.join(pkgDir, 'package.json')
				const pkgJson = JSON.parse(await fs.readFile(pkgJsonPath))
				let entry = pkgJson.main || pkgJson.module || 'index.js'
				if (pkgJson.exports && pkgJson.exports['.']) {
					const exportIndex = pkgJson.exports['.']?.index || pkgJson.exports['.']
					entry = exportIndex.replace(/^\.\//, '')
				}
				const fullEntryPath = path.join(pkgDir, entry)
				const entryUrl = pathToFileURL(fullEntryPath).href
				mod = (await import (entryUrl))
			} catch(err) {
				return ERR(`FAIL:`, name, err.message)	
			}
		}
		if (stem) mod = mod[stem]
		globalThis[name] = mod
		YAY(`LOADED:`, name)
		return globalThis[name]
	}
}

export async function LoadWebview() {
	return await LoadDep('Webview', '@webviewjs/webview.Application')
}

export async function LoadYargs() {

	const YargsLib = await LoadDep('Yargs', 'yargs.default')
	const YargsBin = await LoadDep('YargsBin', 'yargs/helpers.hideBin')

	return { YargsLib, YargsBin }
}

export async function LoadGlobby() {
	return await LoadDep('Globby', 'globby.globby')
}
