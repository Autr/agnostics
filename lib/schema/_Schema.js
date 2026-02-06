




import { default as Types } from './_Types.js'

export class Schema {
	

	$data = {}

	constructor( properties = null ) {
		this.$data = Types.Obj( properties )
	}
}

export class Yargs {

	$positionals = {}
	$options = {}

	constructor( positionals = {}, options = {} ) {
		this.$positionals = Types.Obj( positionals )
		this.$options = Types.Obj( options )

		
	}

	run() {

	}
}