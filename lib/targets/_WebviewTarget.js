//////////////////////////////////////////
//                                      //
//                                      //
//            WINDOW TARGET             //
//                                      //
//                                      //
//////////////////////////////////////////

import { CreateLogger } from 'agnostics/logger'
const { SAY, ERR, YAY, HUH, HMM } = CreateLogger( import.meta.url )
import fs from 'node:fs'

import { BaseRemote } from '../bases/_BaseRemote.js'

export const WebviewConfig = {

	app: {
		controlFlow: 0, // Poll | WaitUntil | Exit | ExitWithCode
		waitTime: 0, // ms for WaitUntil
		exitCode: 0, // for ExitWithCode
	},
	browser: {
		resizable: true,
		title: 'Hello World',
		width: 800,
		height: 600,
		x: null,
		y: null,
		contentProtection: false,
		alwaysOnTop: false,
		alwaysOnBottom: false,
		visible: true,
		decorations: true, // false = borderless/frameless
		transparent: false, // needs CSS background: transparent
		visibleOnAllWorkspaces: false,
		maximized: false,
		maximizable: true,
		minimizable: true,
		focused: true,
		fullscreen: null // Exclusive | Borderless | null
	},
	webview: {
		enableDevtools: true,
		incognito: false,
		userAgent: null,
		child: false,
		preload: null,
		hotkeysZoom: false,
		theme: 2, // Light | Dark | System
		clipboard: false,
		autoplay: false,
		backForwardNavigationGestures: false
	},
	showDevTools: false
}

const PreloadScript = `

	console.log('[PRELOAD] safe ipc')

	globalThis.gt = globalThis

	gt.postMessage = gt.webkit.messageHandlers.ipc.postMessage || gt.ipc.postMessage || gt.chrome.webview.postMessage

`


export class WebviewTarget extends BaseRemote {

	className = 'WebviewTarget:BaseRemote:BaseOnCall'

	$instance = null

	constructor( source, config = {} ) {

		super()

		if (!source) throw Error('NO SOURCE')

		config = { ...WebviewConfig, ...(config || {})}

		const clean = obj => Object.fromEntries(
			Object.entries(obj).filter(([, v]) => v != null))

		const isUrl = source.startsWith('http') || source.startsWith('www')
		const isPath = source.startsWith('/')||source.startsWith('.')
		const isHtml = source.trim().startsWith('<')

		if (isUrl) {
			config.webview.url = source
		} else if (isPath && !isHtml) {
			config.webview.html = fs.readFileSync(source, 'utf8')
			SAY('READ HTML:', source)
		} else {
			config.webview.html = source
		}

		const appOpts = clean({...WebviewConfig.app, ...config.app})
		const browserOpts = clean({...WebviewConfig.browser, ...config.browser})
		const webviewOpts = clean({...WebviewConfig.webview, ...config.webview})

		webviewOpts.preload = PreloadScript


		const app = new globalThis.Webview( appOpts )
		const browser = app.createBrowserWindow( browserOpts )
		const webview = browser.createWebview( webviewOpts )

		if (config.showDevTools && !webview.isDevtoolsOpen()) webview.openDevtools()
		if (!config.showDevTools && webview.isDevtoolsOpen()) webview.closeDevtools()

		app.onEvent(event => {

			if (event === 0) {
				SAY('WINDOW CLOSE REQ:', event)
				this.$call('closing', 0)
				browser.close()
			} else if (event === 1) {
				SAY('APP CLOSE REQ:', event)
				this.$call('closing', 1)
				app.close()
			} else {
				SAY('MISC EVENT:', event)
			}
		})

		webview.onIpcMessage( message => {
			SAY('WEBVIEW MESSAGE:', message)
		})

		this.$instance = { app, browser, webview }

	}

	construct( ...constructArguments ) {

		const { app, browser, webview } = this.$instance 

		const args = constructArguments.map( arg => JSON.stringify(arg) ).join(', ')

		SAY('EVAL')
		webview.evaluateScript(`

			console.log('EVAL')	

			gt.app = new App( ${args} )

			gt.onIpcMessage = async message => {

				console.log('NEW MESSAGE', message)
				// const res = await app[name](...req)

				// parentPort.postMessage({
				// 	type,
				// 	name,
				// 	index,
				// 	res
				// })
			}

			app.on('*', (name, res) => {

				console.log('WOOOO', name, res)
				gt.webkit.messageHandlers.ipc.postMessage('data')
				gt.ipc.postMessage({
					type: 'listener',
					name,
					res
				})
			})
		`)

		// ========= INIT =========

		return new Promise( resolve => {
			HMM('INITIIALISE (wait)')
			this.resolveConstruct = resolve
			app.run()
		})
	}

}