//////////////////////////////////////////
//                                      //
//                                      //
//                TYPES                 //
//                                      //
//                                      //
//////////////////////////////////////////

import {
	MinMaxCaller,
	DefaultCaller,
	ObjCaller,
	ArrCaller,
	EnumCaller,
	EventCaller
} from './_Callers.js'



// ========= TYPES =========

// --------- BANG ---------

export const isBang = type => type.startsWith('bang')
export const Bang = (event, schema) => EventCaller(event, { type: 'bang', gui: 'button', ...schema })

// --------- INT ---------

export const isInt = type => type.startsWith('int')
export const Int = (value, min, max, schema) => MinMaxCaller(value, min, max, { type: 'integer', gui: 'number', ...schema })

// --------- FLOAT ---------

export const isFloat = type => type.startsWith('float') || type.startsWith('doubl')
export const Float = (value, min, max, schema) => MinMaxCaller(value, min, max, { type: 'float', gui: 'number', ...schema })

// --------- NUM ---------

export const isNum = type =>
  type.startsWith('num') ||
  type.startsWith('int') ||
  type.startsWith('float') ||
  type.startsWith('doubl')
export const Num = (value, min, max, schema) => MinMaxCaller(value, min, max, { type: 'number', gui: 'number', ...schema })

// --------- ENUM ---------

export const isEnum = type => type.startsWith('enum')
export const Enum = (value, enumOptions, schema) => EnumCaller(value, enumOptions, { type: 'enumeration', gui: 'select', ...schema })

// --------- ARR ---------

export const isArr = type => type.startsWith('arr')
export const Arr = (value, items, schema) => ArrCaller(value, items, { type: 'array', gui: 'multiselect', ...schema })

// --------- OBJ ---------

export const isObj = type =>
  type.startsWith('obj') ||
  type.startsWith('map') ||
  type.startsWith('dict')
export const Obj = (properties, schema) => ObjCaller(properties, { type: 'object', gui: 'fieldset', ...schema })

// --------- STR ---------

export const isStr = type => type.startsWith('str')
export const Str = (value, schema) => DefaultCaller(value, { type: 'string', gui: 'text', ...schema })

// --------- BOOL ---------

export const isBool = type => type.startsWith('bool')
export const Bool = (value, schema) => DefaultCaller(value, { type: 'boolean', gui: 'checkbox', ...schema })

// --------- COLOR ---------

export const isColor = type =>
  type.startsWith('colo') ||
  type.startsWith('hsl') ||
  type.startsWith('rgb') ||
  type.startsWith('hsv')
export const Color = (value, schema) => DefaultCaller(value, { type: 'color', gui: 'color', ...schema })

// --------- VEC2 ---------

export const isVec2 = type => type.startsWith('vec') && type.endsWith('2')
export const Vec2 = (value, schema) => DefaultCaller(value, { type: 'vec2', gui: 'xy', ...schema })

// --------- VEC3 ---------

export const isVec3 = type => type.startsWith('vec') && type.endsWith('3')
export const Vec3 = (value, schema) => DefaultCaller(value, { type: 'vec3', gui: 'xyz', ...schema })

// --------- VEC4 ---------

export const isVec4 = type => type.startsWith('vec') && type.endsWith('4')
export const Vec4 = (value, schema) => DefaultCaller(value, { type: 'vec4', gui: 'xyzw', ...schema })

// --------- BUFFER ---------

export const BUFF = 'buffer'
export const isBuff = type => type.startsWith('buff') || type.startsWith('base')
export const Buff = (value, schema) => DefaultCaller(value, { type: 'buffer', gui: 'data', ...schema })

// --------- TEXTURE ---------

export const isTex = type => type.startsWith('tex') || type.startsWith('samp')
export const Tex = (value, schema) => DefaultCaller(value, { type: 'texture', gui: 'data', ...schema })

// --------- ANY ---------

export const isAny = type => true
export const Any = (value, schema) => DefaultCaller(value, { type: 'any', gui: 'data', ...schema })
