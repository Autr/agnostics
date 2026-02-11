//////////////////////////////////////////
//                                      //
//                                      //
//            AUTO INSTANCE             //
//                                      //
//                                      //
//////////////////////////////////////////

import { workerData, parentPort } from 'worker_threads'
const { importUrl, importName, constructArguments } = workerData

import { CreateLogger } from 'agnostics/logger'
const { SAY, ERR } = CreateLogger( import.meta.url )
import path from 'node:path'

async function RunInstance() {

	// ========= INSTANTIATE =========

	const cwdImportUrl = path.resolve( process.cwd(), importUrl )
	const imported = await import(cwdImportUrl)
	const instantiator = imported[importName]
	if (!instantiator) return ERR('NO INSTANCE:', importUrl, importName)

	// ========= INSTANCE =========

	const instance = new instantiator()
	await instance.construct( ...constructArguments )

	// ========= REQ / RES =========

	parentPort.on( 'message', async ({type,name,req,index}) => {

		const res = await instance[name](...req)

		parentPort.postMessage({
			type,
			name,
			index,
			res
		})
	})

	// ========= ALL EVENTS =========

	instance.on('*', (name, res) => {

		parentPort.postMessage({
			type: 'listener',
			name,
			res
		})
	})

	// ========= INIT METHODS =========

	const methodListenerNames = instance.getMethodListenerNames()

	parentPort.postMessage({
		name: 'methodListenerNames',
		res: methodListenerNames
	})


}

RunInstance()