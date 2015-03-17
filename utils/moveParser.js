/**
 * parseMoves - Parse an array of moves and crate metadata specific to each move
 * @version 1.0.0
 * @example
 * parseMoves([ 'F Eng C A Lon-Tun', 'A Lon-Tun', 'F Run-Bul' ])
 * @param {array} moves - The array of moves to process
 * @return {object} - An object containing move metadata
 */
module.exports = function parseMoves( moves ) {
    'use strict';

    const HOLD_CHECK = /holds/i
    const CONVOY_CHECK = /\bC\s[A|F]\b/
    const SUPPORT_CHECK = /\bS\s[A|F]\b/
    const HOLD = /(F|A)\s(\b[\s\S]+?\b)[\-|\s](Holds)/i
    const MOVE = /(F|A)\s(\b[\s\S]+?\b)\-([\s\S]+)/i
    const SUPPORT = /(F|A)\s(\b[\s\S]+?\b)\s(S)\s(F|A)\s(\b[\s\S]+\b)\-(\b[\s\S]+\b)/i
    const CONVOY = /(F)\s(\b[\s\S]+?\b)\s(C)\s(F|A)\s(\b[\s\S]+\b)\-(\b[\s\S]+\b)/i
    const ORIGINAL_MOVE = /[\s\S]+\s[C|S]\s(.*)/i

    let moveData = []

    moves.forEach(function loopThroughMoves( move ) {
        let moveBreakout,
            moveMeta = {
                originalMove: move
            }

        if ( HOLD_CHECK.test( move )) {
            moveBreakout = HOLD.exec( move )

            moveMeta.hold = true

            if ( !moveBreakout ) {
                moveMeta.invalid = true
                moveMeta.invalidReason = 'Unable to parse your move. Check to make sure you have your hyphens and what-not'
                moveData.push( moveMeta )
                return
            }

            moveMeta.destinationLocation = moveBreakout[ 2 ].toLowerCase()
        } else if ( CONVOY_CHECK.test( move )) {
            moveBreakout = CONVOY.exec( move )

            moveMeta.convoy = true

            if ( !moveBreakout ) {
                moveMeta.invalid = true
                moveMeta.invalidReason = 'Unable to parse your move. Check to make sure you have your hyphens and what-not'
                moveData.push( moveMeta )
                return
            }

            moveMeta.convoyedUnitType = moveBreakout[ 4 ]
            moveMeta.convoyedUnitLocation = moveBreakout[ 5 ].toLowerCase()
            moveMeta.convoyedUnitDestination = moveBreakout[ 6 ].toLowerCase()
            moveMeta.originalMove = move.match( ORIGINAL_MOVE )[ 1 ]
        } else if ( SUPPORT_CHECK.test( move )) {
            moveBreakout = SUPPORT.exec( move )

            moveMeta.support = true

            if ( !moveBreakout ) {
                moveMeta.invalid = true
                moveMeta.invalidReason = 'Unable to parse your move. Check to make sure you have your hyphens and what-not'
                moveData.push( moveMeta )
                return
            }

            moveMeta.supportedUnitType = moveBreakout[ 4 ]
            moveMeta.supportedUnitLocation = moveBreakout[ 5 ].toLowerCase()
            moveMeta.supportedUnitDestination = moveBreakout[ 6 ].toLowerCase()
            moveMeta.originalMove = move.match( ORIGINAL_MOVE )[ 1 ]
        } else {
            moveBreakout = MOVE.exec( move )

            if ( !moveBreakout ) {
                moveMeta.invalid = true
                moveMeta.invalidReason = 'Unable to parse your move. Check to make sure you have your hyphens and what-not'
                moveData.push( moveMeta )
                return
            }

            moveMeta.destinationLocation = moveBreakout[ 3 ].toLowerCase()
        }

        moveMeta.unitType = moveBreakout[ 1 ]
        moveMeta.currentLocation = moveBreakout[ 2 ].toLowerCase()

        moveData.push( moveMeta )
    })

    return moveData
}
