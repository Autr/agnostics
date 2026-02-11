//////////////////////////////////////////
//                                      //
//                                      //
//                BASE                  //
//                                      //
//                                      //
//////////////////////////////////////////

import { CreateLogger } from 'agnostics/logger'
const { ERR } = CreateLogger( import.meta.url )

export class BaseOnCall {
	
	className = 'Base'

	$listenerCbs = {}

	constructor() {}

	$call( name, res ) {
		const alls = ['all', '*']
		const includesKey = Object.keys(this.$listenerCbs).includes(name)
		if (!includesKey) return ERR(`NONEXISTENT:`, name)
		for (const callback of this.$listenerCbs[name]) callback(res)
		for (const all of alls) {
			if (this.$listenerCbs[all]) {
				for (const callback of this.$listenerCbs[all]) callback(name, res)
			}
		}

	}

	on( name, callback ) {
		const isAll = name === 'all' || name === '*'
		const includesKey = Object.keys(this.$listenerCbs).includes(name)
		if (!includesKey && !isAll) return ERR(`NONEXISTENT:`, name)
		if (!this.$listenerCbs[name]) this.$listenerCbs[name] = []
		this.$listenerCbs[name].push(callback)
	}

}