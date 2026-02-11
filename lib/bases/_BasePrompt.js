//////////////////////////////////////////
//                                      //
//                                      //
//             BASE PROMPT              //
//                                      //
//                                      //
//////////////////////////////////////////

import { CreateLogger } from 'agnostics/logger'
const { SAY, HMM, ERR, YAY } = CreateLogger( import.meta.url )

import { BaseOnCall } from './_BaseOnCall.js'

export class BasePrompt extends BaseOnCall {

	className = 'BasePrompt:BaseOnCall'

	constructor( ) {
		super()
	}

	ask( config = { message: '', schema: {} } ) {

		HMM('ASK NOT IMPLEMENTED:', this.className)
		const { message, schema } = config
		return new Promise( resolve => {
			const res = {}
			for (const [key,value] of Object.entries(schema)) res[key] = true
			resolve(res)
		})
	}
}

