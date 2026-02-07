# Agnostics

![agnostics](https://github.com/Autr/agnostics/raw/main/diogenes.jpg)

# Usage

```js

import { CreateLogger } from 'agnostics/logger'
const { SAY, ERR, HMM, HUH, YAY } = CreateLogger( import.meta.url )

YAY('success')
HUH('debug')
HMM('warning')
ERR('error')
SAY('info')

import { Bool, Num, Str, YargsCommand } from 'agnostics/helpers'

const yargsCommand = new YargsCommand({
    positionals: {
    	hello: Str('world', { required: true, description: 'hello world' }),
    	world: Num( 999, { required: true, description: 'quantify that' })
    },
    options: {
        foo: Bool( null, { required: false, description: 'fooing' }),
        bar: Bool( true, { required: false, description: 'barring' })
    },
    description: 'hello world cli'
})

yargsCommand.run( async yargsData => {
	SAY( yargsData )
})

```


