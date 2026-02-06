//////////////////////////////////////////
//                                      //
//                                      //
//                CALLER                //
//                                      //
//                                      //
//////////////////////////////////////////

import { Properties } from './../specification/index.js'

const META_PROPS = ['options', 'config', 'extra', 'custom', 'props']

export function Caller( data ) {

	let output = {}

	const WriteProp = (key, value, otherKey) => {
		if (output[key] != null) {
			if (!output.misc) output.misc = {}
			output.misc[otherKey || key] = value
		} else {
			output[key] = value
		}
	}

	const AddProp = ( inputKey, inputValue ) => {

		for (const [outputKey, spec] of Object.entries(Properties)) {
			if (inputKey == outputKey) {
				WriteProp( outputKey, inputValue )
				continue
			} else {
				for (const otherKey of [outputKey, ...(spec.keys || [])]) {
					if (inputKey.includes(otherKey.replace(/[_-]/g, ''))) {
						WriteProp( outputKey, inputValue, otherKey )
						continue
					}
				}
			}
		}
	}

	const ExtractProps = ( data ) => {

		for (let [key,value] of Object.entries(data)) {

			key = key.toLowerCase() // controversial

			// SPLIT FOR OPTIONS

			if (key.includes(':')) {
				const [sub1, sub2] = key.split(':')
				AddProp(sub2, value)
			}

			// SEARCH FOR OPTIONS

			for (const name of META_PROPS) {
				if (key.includes(name) && typeof value == 'object') {
					ExtractProps(value)
					continue
				}
			}

			if (value != null) AddProp( key,value )

		}
	}

	ExtractProps( data )

	return data
}

//////////////////////////////////////////
//                                      //
//                                      //
//            TYPE CALLERS              //
//                                      //
//                                      //
//////////////////////////////////////////


/** @type {typeof MinMaxCaller} */
export function MinMaxCaller( value, min, max, schema ) {
	const property = Caller({ ...schema, default: value, min, max })
	return property 
}

/** @type {typeof DefaultCaller} */
export function DefaultCaller( value, schema ) {
	const property = Caller({ ...schema, default: value })
	return property
}

/** @type {typeof EnumCaller} */
export function EnumCaller( value, enumOptions, schema ) {
	return Caller( {...schema, default: value, enum: enumOptions } )
}

/** @type {typeof ObjCaller} */
export function ObjCaller( properties, schema) {
	const objProperty = Caller({ ...schema, properties })
	let index = 0
	for (let [key,prop] of Object.entries(objProperty.properties)) {
		prop.key = key
		prop.index = index++
	}
	return objProperty
}

/** @type {typeof ArrCaller} */
export function ArrCaller(value, items, schema) {
	const arrProperty = Caller({ ...schema, default: value, items })
	return arrProperty
}

/** @type {typeof EventCaller} */
export function EventCaller( event, schema ) {
	const eventProperty = Caller({ ...schema, onupdate: event })
	return eventProperty
}
