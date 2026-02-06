//////////////////////////////////////////
//                                      //
//                                      //
//                INPUTS                //
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
// --------- BUTTON ---------

export const Button = (event, schema) => EventCaller(event, { type: 'boolean', gui: 'button', ...schema })
export const ButtonHtml = def => ({ nodeName: 'input', type: 'button' })

// --------- CHECKBOX ---------

export const Checkbox = (value, schema) => DefaultCaller(value, { type: 'boolean', gui: 'checkbox', ...schema })
export const CheckboxHtml = def => ({ nodeName: 'input', type: 'checkbox' })

// --------- COLOR ---------

export const ColorPicker = (value, schema) => DefaultCaller(value, { type: 'color', gui: 'colorpicker', ...schema })
export const ColorPickerHtml = def => ({ nodeName: 'input', type: 'color' })

// --------- DATE ---------

export const Date = (value, schema) => DefaultCaller(value, { type: 'string', gui: 'date', ...schema })
export const DateHtml = def => ({ nodeName: 'input', type: 'date' })

// --------- DATETIME ---------

export const Datetime = (value, schema) => DefaultCaller(value, { type: 'string', gui: 'datetime', ...schema })
export const DatetimeHtml = def => ({ nodeName: 'input', type: 'datetime-local' })

// --------- EMAIL ---------

export const Email = (value, schema) => DefaultCaller(value, { type: 'string', gui: 'email', ...schema })
export const EmailHtml = def => ({ nodeName: 'input', type: 'email' })

// --------- FILE ---------

export const File = (value, schema) => DefaultCaller(value, { type: 'buffer', gui: 'file', ...schema })
export const FileHtml = def => ({ accept: def.accept, nodeName: 'input', type: 'file' })

// --------- FILES ---------

export const Files = (value, schema) => DefaultCaller(value, { type: 'array', gui: 'files', ...schema })
export const FilesHtml = def => ({ accept: def.accept, multiple: true, nodeName: 'input', type: 'file' })

// --------- HIDDEN ---------

export const Hidden = (value, items, schema) => ArrCaller(value, items, { type: 'array', gui: 'files', ...schema })
export const HiddenHtml = def => ({ nodeName: 'input', type: 'hidden' })

// --------- MONTH ---------

export const Month = (value, schema) => DefaultCaller(value, { type: 'string', gui: 'month', ...schema })
export const MonthHtml = def => ({ nodeName: 'input', type: 'month' })

// --------- NUMBER ---------

export const Number = (value, schema) => DefaultCaller(value, { type: 'number', gui: 'number', ...schema })
export const NumberHtml = def => ({ nodeName: 'input', type: 'number' })

// --------- PASSWORD ---------

export const Password = (value, schema) => DefaultCaller(value, { type: 'string', gui: 'password', ...schema })
export const PasswordHtml = def => ({ nodeName: 'input', type: 'password' })

// --------- RADIO ---------

export const Radio = (value, enumOptions, schema) => EnumCaller(value, enumOptions, { type: 'enumeration', gui: 'radio', ...schema })
export const RadioHtml = def => ({
  nodeName: 'fieldset',
  children: def.enum.map(item => ({ nodeName: 'input', type: 'radio' }))
})

// --------- RANGE ---------

export const Range = (value, min, max, schema) => MinMaxCaller(value, min, max, { type: 'number', gui: 'range', ...schema })
export const RangeHtml = def => ({
  nodeName: 'input', type: 'range', min: def.min, max: def.max, step: def.step,
  aria: { formValuemin: def.min, formValuemax: def.max }
})

// --------- RESET ---------

export const Reset = (event, schema) => EventCaller(event, { type: 'boolean', gui: 'reset', ...schema })
export const ResetHtml = def => ({ nodeName: 'input', type: 'reset' })

// --------- SEARCH ---------

export const Search = (value, schema) => DefaultCaller(value, { type: 'string', gui: 'search', ...schema })
export const SearchHtml = def => ({ nodeName: 'input', type: 'search' })

// --------- SELECT ---------

export const Select = (value, enumOptions, schema) => EnumCaller(value, enumOptions, { type: 'enumeration', gui: 'select', ...schema })
export const SelectHtml = def => ({
  nodeName: 'select',
  children: def.enum.map(item => ({ nodeName: 'option' }))
})

// --------- MULTISELECT ---------

export const Multiselect = (value, enumOptions, schema) => EnumCaller(value, enumOptions, { type: 'array', gui: 'multiselect', ...schema })
export const MultiselectHtml = def => ({
  nodeName: 'select', multiple: true,
  children: def.enum.map(item => ({ nodeName: 'option' }))
})

// --------- SUBMIT ---------

export const Submit = (event, schema) => EventCaller(event, { type: 'boolean', gui: 'submit', ...schema })
export const SubmitHtml = def => ({ nodeName: 'input', type: 'submit' })

// --------- TEL ---------

export const Tel = (value, schema) => DefaultCaller(value, { type: 'string', gui: 'tel', ...schema })
export const TelHtml = def => ({ nodeName: 'input', type: 'tel' })

// --------- TEXT ---------

export const Text = (value, schema) => DefaultCaller(value, { type: 'string', gui: 'text', ...schema })
export const TextHtml = def => ({
  nodeName: 'input', type: 'text', placeholder: def.placeholder,
  pattern: def.pattern, minlength: def.min, maxlength: def.max
})

// --------- TEXTAREA ---------

export const Textarea = (value, schema) => DefaultCaller(value, { type: 'string', gui: 'textarea', ...schema })
export const TextareaHtml = def => ({
  nodeName: 'textarea', placeholder: def.placeholder,
  minlength: def.min, maxlength: def.max, rows: def.size,
  aria: { multiline: true }
})

// --------- TIME ---------

export const Time = (value, schema) => DefaultCaller(value, { type: 'string', gui: 'time', ...schema })
export const TimeHtml = def => ({ nodeName: 'input', type: 'time' })

// --------- URL ---------

export const Url = (value, schema) => DefaultCaller(value, { type: 'string', gui: 'url', ...schema })
export const UrlHtml = def => ({ nodeName: 'input', type: 'url' })

// --------- WEEK ---------

export const Week = (value, schema) => DefaultCaller(value, { type: 'string', gui: 'week', ...schema })
export const WeekHtml = def => ({ nodeName: 'input', type: 'week' })

// --------- METER ---------

export const Meter = (value, schema) => DefaultCaller(value, { type: 'number', gui: 'meter', ...schema })
export const MeterHtml = def => ({ nodeName: 'meter', min: def.min, max: def.max, low: def.min, high: def.max })

// --------- FIELDSET ---------

export const Fieldset = (properties, schema) => ObjCaller(properties, { type: 'object', gui: 'fieldset', ...schema })
export const FieldsetHtml = def => ({ nodeName: 'fieldset' })

// --------- FORM ---------

export const Form = (properties, schema) => ObjCaller(properties, { type: 'object', gui: 'form', ...schema })
export const FormHtml = def => ({ nodeName: 'form' })

// --------- DATA ---------

export const Data = (value, schema) => DefaultCaller(value, { type: 'string', gui: 'data', ...schema })
export const DataHtml = def => ({ nodeName: 'data' })

// --------- VEC4 ---------

export const XY = (value, enumOptions, schema) => EnumCaller(value, enumOptions, { type: 'vec2', gui: 'xy', ...schema })
export const XYHtml = def => ({
  nodeName: 'fieldset',
  children: ['x', 'y'].map(() => RangeHtml(def))
})

// --------- VEC3 ---------

export const XYZ = (value, enumOptions, schema) => EnumCaller(value, enumOptions, { type: 'vec3', gui: 'xyz', ...schema })
export const XYZHtml = def => ({
  nodeName: 'fieldset',
  children: ['x', 'y', 'z'].map(() => RangeHtml(def))
})

// --------- VVEC4 ---------

export const XYZW = (value, enumOptions, schema) => EnumCaller(value, enumOptions, { type: 'vec4', gui: 'xyzw', ...schema })
export const XYZWHtml = def => ({
  nodeName: 'fieldset',
  children: ['x', 'y', 'z', 'w'].map(() => RangeHtml(def))
})

/* MISC GUI

	<optgroup> / <option> difference
	<details> / <summary> list group dropdown (native)
	<dialog> 
	<map> / <area> quite nice
	<progress> similar to meter

*/


/*

CSSGUI = 
DIV :hover / :focus / :active based dropdown
SELECT "base-select"  https://caniuse.com/mdn-css_properties_appearance_base-select
Popover API - this is the one for dropdowns etc

*/
