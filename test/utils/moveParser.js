var test = require( 'tape' ),
    moveParser = require( '../../utils/moveParser' )

test( 'check for hold', function( t ) {
    'use strict';

    const moves = [
        'F London Holds',
        'F London-Holds',
        'F Lon Holds',
        'F Lon-Holds',
        'F london holds',
        'F london-holds',
        'F lon holds',
        'F lon-holds'
    ],
    moveObj = moveParser( moves )

    t.plan( 2 )

    t.ok( moveObj, 'moveObj exists' )
    t.equal( typeof moveObj, 'object', 'moveObj is an object' )

    t.end()
})
