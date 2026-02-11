//////////////////////////////////////////
//                                      //
//                                      //
//             BASE REMOTE              //
//                                      //
//                                      //
//////////////////////////////////////////

/*
	
	CLASSES MUST HAVE:

	1) single config on constructor
	2) some way to post / receive
	3) 


*/

import { CreateLogger } from 'agnostics/logger'
const { SAY, ERR, YAY, HMM, HUH } = CreateLogger( import.meta.url )

import { BaseOnCall } from './_BaseOnCall.js'

export class BaseRemote extends BaseOnCall {

	className = 'BaseRemote:BaseOnCall'

	$methodReqs = {
	}

	constructor() {
		super()
		this.isIniting = true
	}

	construct() {}

	getMethodListenerNames() {
		let methodNames = new Set()
		let current = this
		const exclude = ['getMethodListenerNames', 'construct', 'on']

		do {
			Object.getOwnPropertyNames(current).forEach(prop => {
				if (prop === 'constructor') return
				const desc = Object.getOwnPropertyDescriptor(current, prop)
				if (!desc || prop[0] === '$' || exclude.includes(prop)) return
				if (
					typeof desc.value === 'function' ||
					typeof desc.get === 'function' ||
					typeof desc.set === 'function'
				) {
					methodNames.add(prop)
				}
			})

			current = Object.getPrototypeOf(current)
		} while (current !== null && current !== Object.prototype)

		methodNames = [...methodNames].sort()
		const listenerNames = Object.keys(this.$listenerCbs || {})
		return { methodNames, listenerNames }
	}

	$initMethodsAndListeners( methodNames, listenerNames ) {

		// ========= METHODS =========

		for (const name of methodNames) {
			this.$methodReqs[name] = []

			this[name] = (...req) => {

				const type = 'method'
				const index = this.$methodReqs[name].length
				this.$sendRequest( type, name, req, index ) 
				return new Promise( resolve => {
					this.$methodReqs[name].push( resolve )
				})
			}
		}

		// ========= CALLBACKS =========

		for (const listenerCb of listenerNames) {
			this.$listenerCbs[listenerCb] = []
		}

		// ========= READY =========

		YAY('REMOTE:', this.className)

		HUH('➔ METHODS:', methodNames.join(' '))
		HUH('➔ LISTENERS:', listenerNames.join(' '))
		this.isIniting = false
	}

	$handleResponse( type, index, name, res ) {

		if (type === 'method') {
			const resolver = this.$methodReqs[name]?.[index]
			if (!resolver) {
				ERR(`REMOTE NO RESOLVER:`, name, index)
			} else {
				this.$methodReqs[name][index](res)
				this.$methodReqs[name][index] = null
				const allDone = this.$methodReqs[name].every(item => item === null)
				if (allDone) this.$methodReqs[name] = []
			}
		}  else if (type === 'listener') {
			this.$call( name, res )
		} else {
			HMM(`UNKNOWN RESPONSE:`, {type,name})
		}
	}

}