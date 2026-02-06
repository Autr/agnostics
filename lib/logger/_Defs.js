//////////////////////////////////////////
//                                      //
//                                      //
//                DEFS                  //
//                                      //
//                                      //
//////////////////////////////////////////

export const Timestamp = ( from = 0, to = 3, space = '-' ) => {

	const str = new Date().toISOString()
	from = from > 0 ? 5 + ((from-1) * 3) : 0
	to = to > 0 ? 4 + ((to-1) * 3) : 0
	return str.slice(from, to).replace(/[:T]/g, space)
}

export const ANSI = {
	reset:    "\x1b[0m",
	black:     "\x1b[30m",
	gray:     "\x1b[90m",
	red:      "\x1b[91m",
	green:    "\x1b[92m",
	yellow:   "\x1b[93m",
	blue:     "\x1b[94m",
	magenta:  "\x1b[95m",
	cyan:     "\x1b[96m",
	white:    "\x1b[97m",
}


export const ANSIDark = {
	black:     'rgb(120, 120, 120)',
	gray:     'rgb(180,180,180)',
	red:      'rgb(255,140,140)',
	green:    'rgb(130,255,130)',
	yellow:   'rgb(255,255,120)',
	blue:     'rgb(200,200,255)',
	magenta:  'rgb(255,160,255)',
	cyan:     'rgb(120,255,255)',
	white:    'rgb(255,255,255)',
}


export const ANSILight = {
	white:     'rgb(0, 0, 0)',
	gray:     'rgb(120,120,120)',
	red:      'rgb(255,30,30)',
	green:    'rgb(40,190,80)',
	yellow:   'rgb(255,180,0)',
	blue:     'rgb(0,80,250)',
	magenta:  'rgb(240,80,240)',
	cyan:     'rgb(40,180,180)',
	black:    'rgb(200,200,200)',
}

