
//////////////////////////////////////////
//                                      //
//                                      //
//                ASCII                 //
//                                      //
//                                      //
//////////////////////////////////////////

import chars from './chars.js'


export function BigText( string ) {			


	const height = chars?.[0].length 
	const spacing = 1


	let text = ''

	for (let y = 0; y < height; y++) {
		for (let i = 0; i < string.length; i++) {

			const letter = string[i]
			const line = chars[letter][y]
			text += line
			text += ('').padEnd(spacing)
		}

		text += '\n'
	}

	return text


}

// looks great whatever it is