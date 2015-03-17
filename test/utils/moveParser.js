var test = require( 'tape' ),
    moveParser = require( '../../utils/moveParser' )

test( 'parse hold orders', function( t ) {
    'use strict';

    const moves = [
        'F London Holds',
        'F London-Holds',
        'F Lon Holds',
        'F Lon-Holds',
        'A london holds',
        'A london-holds',
        'A lon holds',
        'A lon-holds'
    ],
    moveArr = moveParser( moves )

    let holdCount = 0

    t.plan( 9 )

    t.ok( moveArr, 'moveArr exists' )
    t.equal( moveArr.length, 8, 'eight moves were parsed' )
    t.equal( Array.isArray( moveArr ), true, 'moveArr is an array' )
    t.equal( moveArr[ 0 ].hold, true, 'the first move is a hold order' )
    t.equal( moveArr[ 0 ].unitType, 'F', 'the first move uses a fleet' )
    t.equal( moveArr[ 4 ].unitType, 'A', 'the first move uses an army' )
    t.equal( moveArr[ 0 ].currentLocation, 'london', 'the first move has the appropriate starting location' )
    t.equal( moveArr[ 1 ].currentLocation, 'london', 'the second move has the appropriate starting location' )

    for ( let idx = 0; idx < moves.length; idx++ ) {
        if ( moveArr[ idx ].hold ) {
            holdCount++
        }
    }

    t.equal( holdCount, 8, 'eight holds were returned' );

    t.end()
})

test( 'parse move orders', function( t ) {
    'use strict';

    const moves = [
        'F London-Wales',
        'F Lon-Wal',
        'A london-wales',
        'A lon-wal',
        'F English Channel-Irish Sea',
        'F english channel-irish sea'
    ],
    moveArr = moveParser( moves )

    let holdCount = 0,
        supportCount = 0,
        convoyCount = 0,
        invalidCount = 0

    t.plan( 16 )

    t.ok( moveArr, 'moveArr exists' )
    t.equal( moveArr.length, 6, 'six moves were parsed' )
    t.equal( Array.isArray( moveArr ), true, 'moveArr is an array' )
    t.equal( moveArr[ 0 ].hold, undefined, 'the first move is not a hold order' )
    t.equal( moveArr[ 0 ].unitType, 'F', 'the first move uses a fleet' )
    t.equal( moveArr[ 2 ].unitType, 'A', 'the third move uses an army' )
    t.equal( moveArr[ 0 ].currentLocation, 'london', 'the first move has the appropriate starting location' )
    t.equal( moveArr[ 0 ].destinationLocation, 'wales', 'the first move has a destination' )
    t.equal( moveArr[ 1 ].currentLocation, 'lon', 'the second move has the appropriate starting location' )
    t.equal( moveArr[ 1 ].destinationLocation, 'wal', 'the second move has a destination' )
    t.equal( moveArr[ 4 ].currentLocation, 'english channel', 'the fifth move has the appropriate starting location' )
    t.equal( moveArr[ 4 ].destinationLocation, 'irish sea', 'the fifth move has a destination' )

    for ( let idx = 0; idx < moves.length; idx++ ) {
        if ( moveArr[ idx ].hold ) {
            holdCount++
        }

        if ( moveArr[ idx ].support ) {
            supportCount++
        }

        if ( moveArr[ idx ].convoy ) {
            convoyCount++
        }

        if ( moveArr[ idx ].invalid ) {
            invalidCount++
        }
    }

    t.equal( holdCount, 0, 'zero holds were returned' );
    t.equal( supportCount, 0, 'zero supports were returned' );
    t.equal( convoyCount, 0, 'zero convoys were returned' );
    t.equal( invalidCount, 0, 'zero moves were invalid' );

    t.end()
})

test( 'parse support orders', function( t ) {
    'use strict';

    const moves = [
        'F London S A Yorkshire-Wales',
        'F Lon S A Yor-Wal',
        'A london S F yorkshire-wales',
        'A lon S F yor-wal'
    ],
    moveArr = moveParser( moves )

    let supportCount = 0

    t.plan( 15 )

    t.ok( moveArr, 'moveArr exists' )
    t.equal( moveArr.length, 4, 'four moves were parsed' )
    t.equal( Array.isArray( moveArr ), true, 'moveArr is an array' )
    t.equal( moveArr[ 0 ].hold, undefined, 'the first move is not a hold order' )
    t.equal( moveArr[ 0 ].support, true, 'the first move is a support order' )
    t.equal( moveArr[ 0 ].unitType, 'F', 'the first move uses a fleet' )
    t.equal( moveArr[ 2 ].unitType, 'A', 'the third move uses an army' )
    t.equal( moveArr[ 0 ].originalMove, 'A Yorkshire-Wales', 'the supported move is included' )
    t.equal( moveArr[ 0 ].currentLocation, 'london', 'the first move has the appropriate starting location' )
    t.equal( moveArr[ 0 ].supportedUnitLocation, 'yorkshire', 'the first move has the appropriate support starting location' )
    t.equal( moveArr[ 0 ].supportedUnitDestination, 'wales', 'the first move has the appropriate support destination' )
    t.equal( moveArr[ 2 ].currentLocation, 'london', 'the third move has the appropriate starting location' )
    t.equal( moveArr[ 2 ].supportedUnitLocation, 'yorkshire', 'the third move has the appropriate support starting location')
    t.equal( moveArr[ 2 ].supportedUnitDestination, 'wales', 'the third move has the appropriate support destination' )

    for ( let idx = 0; idx < moves.length; idx++ ) {
        if ( moveArr[ idx ].support ) {
            supportCount++
        }
    }

    t.equal( supportCount, 4, 'four supports were returned' );

    t.end()
})

test( 'parse convoy orders', function( t ) {
    'use strict';

    const moves = [
        'F English Channel C A Yorkshire-Wales',
        'F Eng C A Yor-Wal',
        'F english channel C F yorkshire-wales',
        'F eng C F yor-wal'
    ],
    moveArr = moveParser( moves )

    let convoyCount = 0

    t.plan( 14 )

    t.ok( moveArr, 'moveArr exists' )
    t.equal( moveArr.length, 4, 'four moves were parsed' )
    t.equal( Array.isArray( moveArr ), true, 'moveArr is an array' )
    t.equal( moveArr[ 0 ].hold, undefined, 'the first move is not a hold order' )
    t.equal( moveArr[ 0 ].convoy, true, 'the first move is a convoy order' )
    t.equal( moveArr[ 0 ].unitType, 'F', 'the first move uses a fleet' )
    t.equal( moveArr[ 0 ].originalMove, 'A Yorkshire-Wales', 'the convoyed move is included' )
    t.equal( moveArr[ 0 ].currentLocation, 'english channel', 'the first move has the appropriate starting location' )
    t.equal( moveArr[ 0 ].convoyedUnitLocation, 'yorkshire', 'the first move has the appropriate support starting location' )
    t.equal( moveArr[ 0 ].convoyedUnitDestination, 'wales', 'the first move has the appropriate support destination' )
    t.equal( moveArr[ 2 ].currentLocation, 'english channel', 'the third move has the appropriate starting location' )
    t.equal( moveArr[ 2 ].convoyedUnitLocation, 'yorkshire', 'the third move has the appropriate support starting location')
    t.equal( moveArr[ 2 ].convoyedUnitDestination, 'wales', 'the third move has the appropriate support destination' )

    for ( let idx = 0; idx < moves.length; idx++ ) {
        if ( moveArr[ idx ].convoy ) {
            convoyCount++
        }
    }

    t.equal( convoyCount, 4, 'four supports were returned' );

    t.end()
})

test( 'parsing of invalid moves should fail with a message', function( t ) {
    'use strict';

    const moves = [
        'G English Channel C A Yorkshire-Wales',
        'F London Wales',
        'G London-Wales',
        'F English Channel C A Yorkshire Wales',
        'F  English Channel-London'
    ],
    moveArr = moveParser( moves )

    let invalidCount = 0,
        invalidReasonCount = 0

    t.plan( 8 )

    t.ok( moveArr, 'moveArr exists' )
    t.equal( moveArr.length, 5, 'five moves were parsed' )
    t.equal( Array.isArray( moveArr ), true, 'moveArr is an array' )
    t.equal( moveArr[ 0 ].invalid, true, 'the first move is invalid' )
    t.equal( typeof moveArr[ 0 ].invalidReason, 'string', 'the invalid message is a string' )
    t.equal( moveArr[ 0 ].invalidReason, 'Unable to parse your move. Check to make sure you have your hyphens and what-not', 'the invalid message says some things' )

    for ( let idx = 0; idx < moves.length; idx++ ) {
        if ( moveArr[ idx ].invalid ) {
            invalidCount++
        }

        if ( moveArr[ idx ].invalidReason ) {
            invalidReasonCount++
        }
    }

    t.equal( invalidCount, 5, 'all moves were marked as invalid' )
    t.equal( invalidReasonCount, 5, 'all invalid moves had an error message' )
})
