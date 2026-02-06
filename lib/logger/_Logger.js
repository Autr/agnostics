//////////////////////////////////////////
//                                      //
//                                      //
//               LOGGER                 //
//                                      //
//                                      //
//////////////////////////////////////////

import { ANSI, ANSIDark, ANSILight, Timestamp } from './_Defs.js'
import { Settings } from './_Settings.js'

export function ExtractMetaName( url ) {

	return url.split('/').reverse().slice(0,2).map( str => {
		if (str.charAt(0) == '_' || str.charAt(0) == '$') str = str.substring(1)
		let split = str.split('.')
		split = split.slice(0,Math.max(split.length-1,1))
		return split.join('')

	}).reverse().join(':')
}

function CreateMethod( method, name, filename, timestamp, prepend, color, log, trace ) {

	return (...args) => {

		const ts = timestamp ? Timestamp(...timestamp) + ' ' : ''
		const label = name ? `[${name}] ` : ''

		if (typeof process !== 'undefined') {

			const ansiColor = ANSI[color] || ANSI.gray

			let text = `${ansiColor}${ts}${label}${prepend || ''}`

			let first = true
			const rest = [];

			for (const arg of args) {
				if (first && typeof arg === 'string') {
					text += arg + ' '
					first = false;
				} else {
					rest.push(arg);
				}
			}

			text = text.trimEnd() + ANSI.reset

			if (log) globalThis.SAYLogger[method](text, ...rest)

		} else {

			const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
			const cssColor = isDarkMode ? ANSIDark[color] : ANSILight[color]

			const parts = [`%c${ts}${label}${prepend || ''}`, `color:${cssColor}`]

			let i = 0;
			for (const arg of args) {
				if (i === 0 && typeof arg === 'string') {
					parts[0] += arg + ' '
				} else {
					parts[0] += '%o '
					parts.push(arg)
				}
				i++
			}

			if (log) globalThis.SAYLogger[method](...parts)
		}

		if (globalThis.SAYBuffer) globalThis.SAYBuffer[method](...args)

	}


}

export function CreateLogger( filename, overrides = {} ) {

	const name = ExtractMetaName( filename )
	const config = { ...Settings, ...overrides }

	if (!globalThis.SAYLogger) {
		globalThis.SAYLogger = {
			log: console.log,
			info: console.info,
			error: console.error,
			warn: console.warn,
			trace: console.trace,
		}
	}

	const output = {
		[config.infoName]: CreateMethod(
			'info',
			name, 
			filename,
			config.timestamp, 
			config.infoPrepend,
			config.infoColor,
			config.verbose,
			false
		),

		[config.warnName]: CreateMethod( 
			'warn',
			name, 
			filename,
			config.timestamp, 
			config.warnPrepend,
			config.warnColor,
			config.verbose,
			false
		),

		[config.successName]: CreateMethod( 
			'log',
			name, 
			filename,
			config.timestamp, 
			config.successPrepend,
			config.successColor,
			config.verbose || config.info,
			false
		),

		[config.errorName]: CreateMethod( 
			'error',
			name, 
			filename,
			config.timestamp, 
			config.errorPrepend,
			config.errorColor,
			true,
			config.verbose
		),

		[config.debugName]: CreateMethod( 
			'log',
			name, 
			filename,
			config.timestamp, 
			config.debugPrepend,
			config.debugColor,
			config.debug || config.verbose,
			false
		)
	}

	output[config.infoName][config.warnName] = output[config.warnName]
	output[config.infoName][config.successName] = output[config.successName]
	output[config.infoName][config.errorName] = output[config.errorName]
	output[config.infoName][config.debugName] = output[config.debugName]

	return output

}
