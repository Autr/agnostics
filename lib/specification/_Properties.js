//////////////////////////////////////////
//                                      //
//                                      //
//            SPECIFICATION             //
//                                      //
//                                      //
//////////////////////////////////////////

export const Properties = {

	// --------- EVENTS ---------

	onsend: {
		description: 'callback for checking value before sending', 
		matches: [ 'oncheck', 'validate', 'coerce', 'check']
	},
	onreceive: {
		description: 'callback for checking value when received', 
		matches: [ 'onreceive', 'validate', 'coerce', 'check']
	},
	onupdate: {
		description: 'callback for updated value', 
		matches: [ 'onupdate', 'update', 'change', 'onchange']
	},

	// --------- DEFINITION ---------

	type: {
		description: 'not that important, except for translation / adaptors',
		matches: ['type']
	},

	subtype: {
		description: 'original type when inputted / translation',
		matches: ['subtype']
	},

	// --------- UNIQUE KEYS AND INDEXES ---------

	index: {
		description: 'unique index (inherited == null)',
		matches: ['index', 'idx']
	},
	key: {
		description: 'unique key (inherited == null)', 
		matches: [ 'key', 'id' ]
	},

	// --------- VISUAL AND TEXTUAL ---------

	label: {
		description: 'human readable name of property', 
		matches: [ 'label', 'name', 'title']
	},
	description: {
		description: 'human readable description', 
		matches: [ 'description', 'desc', 'summary']
	},

	// --------- UNIVERSAL ---------

	default: {
		description: 'default value (standard)',
		matches: ['default', 'value']
	},
	gui: {
		description: 'what user interface to use (can be HTML config)', 
		matches: [ 'gui', 'interface','widget','ui:widget']
	},
	classname: {
		description: 'name of class associated to', 
		matches: [ 'classname', 'class', 'object', 'objectname']
	},
	required: {
		description: 'required property flag', 
		matches: [ 'required', 'require', 'mandatory','demandOption']
	},
	disabled: {
		description: 'gui interaction is disabled', 
		matches: [ 'disabled', 'inactive']
	},
	readonly: {
		description: 'property can only be read',
		matches: ['readonly', 'ro']
	},

	// --------- STRUCTURAL ---------

	properties: {
		description: 'an object of further properties',
		matches: ['properties', 'props']
	},
	items: {
		description: 'property definition for items in array',
		matches: ['items', 'array']
	},
	enum: {
		description: 'list of options / allowed values', 
		matches: [ 'enum', 'enums', 'enumNames', 'oneOf', 'autocomplete']
	},

	// --------- INPUT SPECIFIC ---------

	pattern: {
		description: 'regex or shorthand string validation', 
		matches: [ 'pattern', 'regex','match', 'regularexp']
	},
	step: {
		description: 'iterator of numbers', 
		matches: [ 'step', 'increment','resolution']
	},
	unit: {
		description: 'unit of measurement (numbers)', 
		matches: [ 'unit', 'measure','metric','factor']
	},
	min: {
		description: 'minimum number or string length', 
		matches: [ 'min', 'minlength', 'minimum']
	},
	max: {
		description: 'maximum number or string length', 
		matches: [ 'max', 'maxlength', 'maximum']
	},
	placeholder: {
		description: 'only used in textual inputs', 
		matches: [ 'placeholder']
	},
	accept: {
		description: 'only used in file / url inputs', 
		matches: ['accept','extensions','mime']
	},
	size: {
		description: 'used for textarea rows and select static box', 
		matches: ['rows', 'size']
	},

	// --------- MISC ---------

	misc: {
		description: 'everything else'
	}
}


// export const Table = '\n'+Object.keys(Specification).map( key => {
// 	const desc = Specification[key].description
// 	const type = (Specification[key].type || '🚨')
// 	const keys = Specification[key].keys ? '('+Specification[key].keys.join(', ')+')' : ''
// 	return `${key.padEnd(16)}${type.padEnd(24)}${desc} ${keys}`
// }).join('\n')

