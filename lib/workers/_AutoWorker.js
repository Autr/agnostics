//////////////////////////////////////////
//                                      //
//                                      //
//             AUTO WORKER              //
//                                      //
//                                      //
//////////////////////////////////////////

import { CreateLogger } from 'agnostics/logger'
const { SAY, ERR, YAY, HMM, HUH } = CreateLogger( import.meta.url )

import { Worker } from 'node:worker_threads'
import { BaseRemote } from '../bases/_BaseRemote.js'

import { fileURLToPath } from 'node:url'
import path from 'node:path'

// Get the directory of the CURRENT file
const __filename = fileURLToPath(import.meta.url)
const _dir = path.dirname(__filename)

// We use a template literal or a joined string that Rollup 
// can't resolve statically during the build.
const workerFilename = '_AutoRunner.js'; 
export const AutoRunnerPath = path.join(_dir, 'workers', workerFilename);

export class AutoWorker extends BaseRemote {

	className = 'AutoWorker:BaseRemote'
	
	$worker = null

	$listenerCbs = {
		error: [],
		exit: [],
		online: []
	}

	importUrl = null 
	importName = null

	constructor( importPath  ) {

		super() // Base = on / $call pattern

		let [ importUrl, importName ] = importPath.split('?')
		if (importName === '') importName = 'default'

		this.importUrl = importUrl
		this.importName = importName

	}

	$sendRequest( type, name, req, index) {

		this.$worker.postMessage({
			type,
			name,
			req,
			index
		})
	}

	construct( ...constructArguments ) {

		const { importUrl, importName } = this 

		this.className = importName + ':' + this.className

		this.$worker = new Worker(
			new URL('./_AutoRunner.js?worker', import.meta.url).pathname, 
			{
				type: 'module',
				workerData: {
					importUrl,
					importName,
					constructArguments
				}})

		// ========= MESSAGES =========

		this.$worker.on('message', message => {

			// ========= INIT =========

			if (message.name === 'methodListenerNames') {

				const { methodNames, listenerNames } = message.res
				this.$initMethodsAndListeners( methodNames, listenerNames )

			} else {

				// ========= RESPONSE =========

				const { type, index, name, res } = message
				this.$handleResponse( type, index, name, res )
			}

			if (this.finishConstruct) {
				HUH('INITED / finishConstruct')
				this.finishConstruct()
				this.finishConstruct = null
			}
		})

		// ========= ERROR =========

		this.$worker.on('error', message => {
			ERR('ERROR:', message)
			this.$call( 'error', message )
		})

		// ========= EXIT =========

		this.$worker.on('exit', message => {
			HMM('EXIT:', message)
			this.$call( 'exit', message )
		})

		// ========= ONLINE =========

		this.$worker.on('online', message => {
			YAY('WORKER ONLINE')
			this.$call( 'online', true )
		})

		// ========= INIT =========

		return new Promise( resolve => {
			HMM('INITIIALISE (wait)')
			this.finishConstruct = resolve
		})
	}


}
