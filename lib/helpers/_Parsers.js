//////////////////////////////////////////
//                                      //
//                                      //
//                PARSING               //
//                                      //
//                                      //
//////////////////////////////////////////

// --------- MIME BUCKETS ---------

const BUCKETS = {
	image: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp', 'ico'],
	video: ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'],
	audio: ['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a'],
	text:  ['txt', 'md', 'csv', 'html', 'css', 'js', 'json'],
	font:  ['woff', 'woff2', 'ttf', 'otf'],
	application: ['pdf', 'zip', 'json', 'xml']
}

// --------- ALIASES ---------

const ALIASES = {
	'jpg': 'jpeg',
	'jpeg': 'jpg',
	'm4a': 'mp4',
	'mp4': 'm4a',
	'tif': 'tiff',
	'tiff': 'tif'
}

export const NormaliseAccept = (input) => {
	if (!input) return []
	
	const raw = Array.isArray(input) ? input : input.split(/[,\s]+/)
	const extensions = new Set()

	raw
		.map(item => item.trim().toLowerCase())
		.filter(Boolean)
		.forEach(item => {
			let current = []

			// 1. Handle Wildcards (e.g., image/*)
			if (item.includes('/*') || (item.includes('/') && item.endsWith('/'))) {
				const cat = item.split('/')[0]
				if (BUCKETS[cat]) current.push(...BUCKETS[cat])
			} 
			
			// 2. Handle Specific Mimes (e.g., image/png -> png)
			else if (item.includes('/')) {
				current.push(item.split('/').pop())
			}

			// 3. Handle Extensions (e.g., .jpg -> jpg)
			else if (item.includes('.')) {
				current.push(item.split('.').pop())
			}

			// 4. Fallback (e.g., "png")
			else {
				current.push(item)
			}

			// FINAL PASS: add found items + their aliases to the Set
			
			current.forEach(ext => {
				extensions.add(ext)
				if (ALIASES[ext]) extensions.add(ALIASES[ext])
			})
		})

	return Array.from(extensions)
}