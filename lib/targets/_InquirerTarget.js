

// @inquirer/prompts

async function LoadInquirer() {

	if (!globalThis.inquirerLib) {
		try {
			globalThis.inquirerLib = (await import ('inquirer')).inquirer
			return true
		} catch(err) {
			return ERR(`GLOBS UNAVAILABLE`, err)	
		}
	}
}
