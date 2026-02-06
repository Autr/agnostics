//////////////////////////////////////////
//                                      //
//                                      //
//              SETTINGS                //
//                                      //
//                                      //
//////////////////////////////////////////

/*

	follows usual patterns:

	standard
	warning
	error
	success

	additionally:

	debug

	for additional visual formatting

*/

export const Settings = {
	verbose: true, // shows all
	info: true, // shows warnings + success
	timestamp: null, // [3, 7, '-'],

	infoPrepend:    '⬤  ',
	debugPrepend:   '⬤  ',
	warnPrepend:    '⬤  ',
	errorPrepend:   '⬤  ',
	successPrepend: '⬤  ',

	infoName:    'SAY',
	debugName:   'HUH',
	warnName:    'HMM',
	errorName:   'ERR',
	successName: 'YAY',

	infoColor:    'blue',
	debugColor:   'magenta',
	warnColor:    'yellow',
	errorColor:   'red',
	successColor: 'green',

	onCrash: null,
	onExit:  null,
	filename: '.logs/$TIMESTAMP.log'
}