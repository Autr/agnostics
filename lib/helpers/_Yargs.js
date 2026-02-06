//////////////////////////////////////////
//                                      //
//                                      //
//               YARGS                  //
//                                      //
//                                      //
//////////////////////////////////////////

import { Obj, isArr, isNum, isBool } from '../inputs/index.js'
import { NormaliseAccept } from './_Parsers.js'

import { CreateLogger } from '../logger/index.js'
const { SAY, ERR, HMM, HUH } = CreateLogger( import.meta.url )


async function LoadYargs() {

	if (!globalThis.yargsLib || !globalThis.yargsHideBin) {
		try {
			globalThis.yargsLib = (await import ('yargs')).default
			globalThis.yargsHideBin = (await import ('yargs/helpers')).hideBin
			return true
		} catch(err) {
			return ERR(`YARGS UNAVAILABLE`, err)	
		}
	}
}

async function LoadGlobby() {

	if (!globalThis.globbyLib || !globalThis.pathExtname) {
		try {
			globalThis.globbyLib = (await import ('globby')).globby
			globalThis.pathExtname = (await import ('path')).extname
			return true
		} catch(err) {
			return ERR(`GLOBS UNAVAILABLE`, err)	
		}
	}
}

async function GetYargsFiles( value, extensions ) {

	try {

		if (!(await LoadGlobby())) return []


		const anything = (extensions.length === 0 || extensions.includes('*'))

		const found = await globalThis.globbyLib(value, {
			onlyFiles: true,
			expandDirectories: false,
			caseSensitiveMatch: false
		})

		const exts = extensions.map( ext => ext.toLowerCase().replaceAll('.',''))
		const files = anything ? found : found.filter(file => {
			const ext = globalThis.pathExtname(file).replaceAll('.','')
			return exts.includes(ext)
		})

		if (files.length === 0) ERR('NO FILES', value)

		return files

	} catch (err) {
		ERR('FILES ERROR:', err.message)
		return []
	}
}

export function GetYargsType( type ) {
	if (isNum(type)) return 'number'
	if (isBool(type)) return 'boolean'
	return 'string'
}


export function GetParsedYargsOptions( agOptions, aliasStore = [] ) {

	const options = {}

	for (const [key, def] of Object.entries( agOptions )) {

		const label = def?.label || key
		let alias = label[0]
		let counter = 1

		while (aliasStore.includes(alias) && counter < 4) {
			alias = label.substring(0,counter++)
		}

		if (aliasStore.includes(alias)) {
			HMM('CANNOT GENERATE ALIAS FOR:', key)
			alias = null
		} else {
			aliasStore.push(alias)
		}

		options[key] = ConvertYargsProperty( def, {
			alias: alias,
			demandOption: def.required || false,
		})
	}

	return options
}

export function ConvertYargsProperty( def, override = {} ) {

	const array = def.gui == 'files' || isArr(def.type)

	return Object.assign({
		array,
		describe: def.description,
		type: GetYargsType(def.type),
		coerce: def.oncheck,
		default: def.default,
		accept: NormaliseAccept( def.accept )
	}, override)
}


export function YargsProcessWorkaround() {

	// YARGS HACK (MINIMUM POSITIONAL ARGUMENTS)

	let index = process.argv.length
	for (let i = 0; i < process.argv.length; i++) {
		const arg = process.argv[i]
		if (arg.startsWith('--')) index = i
	}
	process.argv.splice(index, 0, 'run')
}

export class YargsCommand {

	command = '$0'
	description = 'N/A'
	version = 'N/A'
	positionals = {}
	options = {}

	$positionals = {}
	$options = {}
	$aliasStore = []

	constructor( { positionals, options = {}, description = 'N/A', version = 'N/A' } ) {


		this.description = description
		this.version = version

		// --------- OPTIONS ---------

		this.$options = Obj( options ).properties
		this.options = GetParsedYargsOptions( this.$options, this.$aliasStore )

		// --------- POSITIONALS ---------

		this.$positionals = Obj( positionals ).properties
		const posKeys = Object.keys( this.$positionals )
		const strArray = []

		for (let i = 0; i < posKeys.length; i++) {

			const key = posKeys[i]
			const def = this.$positionals[key]

			const array = def.gui == 'files' || isArr(def.type)
			const required = i < posKeys.length - 1 || def.required

			strArray.push( required ? '<' : '[' )
			strArray.push( key )
			if (array) strArray.push( '..' )
			strArray.push( required ? '>' : ']' )
			strArray.push( ' ' )

			this.positionals[key] = ConvertYargsProperty( def, {
				array: array,
				demandOption: required,
			})
		}

		this.command = strArray.join('')

	}

	async run( runCallback = async yargsData => {} ) {

		if (!(await LoadYargs())) return

		YargsProcessWorkaround()

		const args = globalThis.yargsHideBin( process.argv )
		const instance = globalThis.yargsLib( args )

		instance.command(
			this.command,
			this.description,
			yargsData => {
				const positionals = Object.entries(this.positionals)
				for (const [key, def] of positionals) {
					yargsData.positional(key, def)
				}
			},
			async yargsData => {

				const lookup = ['positionals']
				for (const id of lookup) {
					const keys = Object.keys(this[id])
					for (const key of keys) {
						const def = this[id][key]
						if (def.array && yargsData[key]) {
							yargsData[key] = await GetYargsFiles( yargsData[key], def.accept )
						}
					}
				}

				await runCallback( yargsData )

			}
		)

		if (this.options) instance.options(this.options)

		instance.strict()
		instance.recommendCommands()

		instance.help()
		instance.alias('h', 'help')
		instance.version(this.version)

		return await instance.parse()

	}
}


export class YargsCLI {

	options = null
	description = 'N/A'
	version = 'N/A'

	$aliasStore = []
	$options = {}
	$commands = {}

	constructor( { commands, options = {}, description = 'N/A', version = 'N/A' } ) {

		if (typeof commands != 'object') throw Error('no commands defined')
		if (!description) HMM('no description defined (recommended)')
		if (!version) HMM('no version defined (recommended)')

		this.description = description
		this.version = version

		// --------- OPTIONS ---------

		this.$options = Obj( options ).properties
		this.options = GetParsedYargsOptions( this.$options, this.$aliasStore )

		// --------- COMMANDS ---------

		this.$commands = commands

	}

	async run( runCallback = async (cmdKey, yargsData) => {} ) {

		if (!(await LoadYargs())) return

		// YargsProcessWorkaround()


		const args = globalThis.yargsHideBin( process.argv )
		const instance = globalThis.yargsLib( args )

		for (const [cmdKey, cmdObj] of Object.entries(this.$commands)) {

			instance.command(
				`${cmdKey} ${cmdObj.command}`.trim(),
				cmdObj.description,
				yargsData => {
					const positionals = Object.entries(cmdObj.positionals)
					for (const [key, def] of positionals) yargsData.positional(key, def)
					const options = Object.entries(cmdObj.options)
					for (const [key, def] of options) yargsData.option(key, def)
				},
				async yargsData => {

					const lookup = [ cmdObj.positionals ]

					for (const obj of lookup) {
						const keys = Object.keys(obj)
						for (const key of keys) {
							const def = obj[key]
							if (def.array && yargsData[key]) {
								yargsData[key] = await GetYargsFiles( yargsData[key], def.accept )
							}
						}
					}

					await runCallback( cmdKey, yargsData )

				})
		}

		if (this.options) instance.options(this.options)

		instance.demandCommand(1, 'You must provide a valid command')
		instance.strict()
		instance.recommendCommands()

		instance.help()
		instance.alias('h', 'help')
		instance.version(this.version)

		return await instance.parse()
	}


}



