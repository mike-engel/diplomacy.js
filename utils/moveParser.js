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
    const CONVOY_CHECK = /\bC\b/
    const SUPPORT_CHECK = /\bS\b/
    const HOLD = /(F|A)\s(\w+)[\-|\s](Holds)/i
    const MOVE = /(F|A)\s(\w+)[\-|\s](\w+)/i
    // const SUPPORT = /(F|A)\s(\w+)\s(S)\s(F|A)\s(\w+)[\-|\s](\w+)/i
    // const CONVOY = /(F)\s(\w+)\s(C)\s(F|A)\s(\w+)[\-|\s](\w+)/i

    let moveData = []

    moves.forEach(function loopThroughMoves( move ) {
        let moveMeta

        if ( HOLD_CHECK.test( move )) {
            moveMeta = HOLD.exec( move )

            moveData.push({
                originalMove: move,
                unitType: moveMeta[ 0 ],
                currentLocation: moveMeta[ 1 ],
                destinationLocation: moveMeta[ 2 ],
                hold: true
            })
        } else if ( CONVOY_CHECK.test( move )) {
            // do some convoy parsing
        } else if ( SUPPORT_CHECK.test( move )) {
            // do some support parsing
        } else {
            moveMeta = MOVE.exec( move )

            moveData.push({
                originalMove: move,
                unitType: moveMeta[ 0 ],
                currentLocation: moveMeta[ 1 ],
                destinationLocation: moveMeta[ 2 ],
                hold: false
            })
        }
    })

    return moveData
}
