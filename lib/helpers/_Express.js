
// eventually API structure

/*

	easy peasy

	/helloworld 
	/foo
	/foo/:id/bar
	/foo/:id/bar/:name
	/foo/list
	/foo/list/:offset
	/foo/list/:offset/really/:deep/thing/:right/here
	/foo/list/:offset/really/:deep/thing/:right/here/:ooooh

	.scriptName('api')
	.command('helloworld')
	.command('foo <id> bar [name]')
	.command('foo')
	.command('foo list [offset]')
	.command('foo list <offset> really <deep> thing <right> here [ooooh]')


	RULES: last one is always optional (to avoid conflicts)




*/
