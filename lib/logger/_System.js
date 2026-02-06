//////////////////////////////////////////
//                                      //
//                                      //
//               SYSTEM                 //
//                                      //
//                                      //
//////////////////////////////////////////

import { Timestamp } from './_Defs.js'
import { Settings } from './_Settings.js'
import { ANSI } from './_Defs.js'

function GetStack() {
	const err = new Error()
	const stack = err.stack.split('\n').slice(2).map(line => {
		return ('').padStart(16) + line.trim()
	}).join('\n')
	return stack
}

const GetLine = (type, ...args) => {
	const line = (type.toUpperCase()).padEnd(8) + args.join(' ')
	const stack = (type == 'error' || type == 'debug' ? '\n' + GetStack() : '')
	return line + stack
}

export function SystemLog(overrides = {} ) {

	const config = { ...Settings, ...overrides }

	const saved = {
		log: console.log,
		info: console.info,
		error: console.error,
		warn: console.warn,
		trace: console.trace
	}

	globalThis.SAYLogger = saved

	const filename = config.filename.replaceAll('$TIMESTAMP', Timestamp(...config.timestamp))
	
	return new Promise( async resolve => {


		if (typeof process !== 'undefined') {


			const fs = await import('node:fs')
			const path = await import('node:path')
			const util = await import('node:util')

			if (await fs.existsSync(filename)) throw Error(`${filename} already exists`)
			const dir = path.dirname(filename)
			try { await fs.mkdirSync(dir) } catch(err) {}
			const output = fs.createWriteStream(filename, { flags: 'a' })

			output.on('error', err => {
				saved.error(err)
			})

			globalThis.SAYBuffer = {
				log: (...args) => output.write(GetLine('log', ...args)+'\n'),
				info: (...args) => output.write(GetLine('info', ...args)+'\n'),
				error: (...args) => output.write(GetLine('error', ...args)+'\n'),
				warn: (...args) => output.write(GetLine('warn', ...args)+'\n'),
			}

			console.log = (...args) => {
				const line = GetLine('log', ...args)
				output.write(line + '\n')
				saved.log(...args)
			}

			console.error = (...args) => {
				const line = GetLine('error', ...args)
				output.write(line + '\n')
				saved.error(...args)
			}
			console.warn = (...args) => {
				const line = GetLine('warn', ...args)
				output.write(line + '\n')
				saved.warn(...args)
			}
			console.info = (...args) => {
				const line = GetLine('info', ...args)
				output.write(line + '\n')
				saved.info(...args)
			}			

			process.on('uncaughtException', async err => {
				try {
					console.error(err)
					if (config?.onCrash) await config.onCrash()
				} catch (err) {
					saved.error('uncaught', err)
				} finally {
					if (output) output.end()
				}
			})

			process.on('exit', async e => {
				try {
					if (config.onExit) await config.onExit(saypath)
				} catch(err) {
					saved.log('exit', e)
				} finally {
					if (output) output.end()
				}
			})

		} else {

			const buffer = []
			const MAX_LINES = 200

			const BufferPush = (line) => {
				buffer.push(line)
				if (buffer.length > MAX_LINES / 2) {
					buffer = buffer.slice(MAX_LINES/-4) // remove 1/4
				}
			}

			globalThis.SAYBuffer = {
				log: (...args) => BufferPush(GetLine('log', ...args)),
				info: (...args) => BufferPush(GetLine('info', ...args)),
				error: (...args) => BufferPush(GetLine('error', ...args)),
				warn: (...args) => BufferPush(GetLine('warn', ...args)),
			}

			console.log = (...args) => {
				BufferPush(GetLine('log', ...args))
				saved.log(...args)
			}
			console.error = (...args) => {
				BufferPush(GetLine('error', ...args))
				saved.error(...args)
			}
			console.warn = (...args) => {
				BufferPush(GetLine('warn', ...args))
				saved.warn(...args)
			}
			console.info = (...args) => {
				BufferPush(GetLine('info', ...args))
				saved.info(...args)
			}			

			window.addEventListener('error', err => {
				console.error(err.error.stack)
				if (config.onCrash) config.onCrash(DownloadableLog(filename, buffer))
			})

			window.addEventListener('pagehide', async e => {
				if (config.onExit) config.onExit(DownloadableLog(filename, buffer))
			}, { capture: true })

		}

		resolve()
	})
}

export const DownloadableLog = (filename, buffer) => {

	const content = buffer.join('\n') + '\n'
	const blob = new Blob([content], {type: 'text/plain'})
	const url = URL.createObjectURL(blob)
	
	const a = document.createElement('a')
	a.href = url
	a.download = filename
	a.style.display = 'none'
	document.body.appendChild(a)

	return {
		buffer,
		filename,
		content,
		blob,
		url, 
		download: () => {
			a.click()
			document.body.removeChild(a)
			URL.revokeObjectURL(url)
		}
	}

}



