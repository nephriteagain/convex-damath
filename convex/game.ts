import { cloneDeep } from 'lodash';
import { piece, boxPiece } from '../types';
import { movePiece as movePieceHelper } from '../gameLogic/movePiece';
import { gameData } from "../types";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { checkMovablePieces, kingPromoter } from '../gameLogic/checkMovablePieces'
// import { } from '../gameLogic/'
export const getGameData = query({
    args: {id: v.id('games')},
    handler: async (ctx, args) => {
        const gameData = await ctx.db.get(args.id)
        return gameData
    }
})

const pieceType = v.object({
    type: v.union(v.literal('z'), v.literal('x')),
    value: v.number(),
    king: v.boolean(),
    moves: v.array(v.number())
})
// const boxPieceType = v.object({
//     x: v.number(),
//     y: v.number(),
//     playable: v.boolean(),
//     operation: v.optional(v.union(
//         v.literal('add'),
//         v.literal('subtract'),
//         v.literal('multiple'),
//         v.literal('divide'),
//     )),
//     piece: v.optional(pieceType),
//     highlightMoves: v.optional(v.boolean())

// })
const movePieceArgs = {
    piece: pieceType, 
    index : v.number(), 
    pieceIndex: v.number(),
    playerTurn: v.string(),
    players: v.object({
        z: v.string(),
        x: v.string()
    }),
    id: v.id('games'),
    boardData: v.array(v.any())
}
export const movePiece = mutation({
    // wtf is this typings
    args: movePieceArgs,
    handler: async (ctx, args) => {
        const {piece, index, pieceIndex, playerTurn, id, boardData, players} = args
        let nextTurn = playerTurn === players?.x ? players?.z : players?.x
        const oldBoard = cloneDeep(boardData)

        const capturedPieceArr : piece[] = []
        //@ts-ignore
        const newBoardData = movePieceHelper(boardData, piece, index, pieceIndex, capturedPieceArr)
        const playerToCheck = players.x === nextTurn ? 'x' : 'z'

        //@ts-ignore
        const didCapturedAPiece = pieceCount(boardData) > pieceCount(newBoardData)
        const boardDataWithNewMoves = checkMovablePieces(newBoardData, playerToCheck, didCapturedAPiece, piece)
        const canMultiJump = boardDataWithNewMoves.some(box => box?.piece?.moves && box.piece.moves.length > 0 && box?.piece?.type !== playerToCheck && box?.piece?.value === piece.value)

        if (canMultiJump && didCapturedAPiece) {
            console.log('can multi jump')
            nextTurn = playerTurn === players?.z ? players?.z : players?.x
        }

        if (!canMultiJump) {
            kingPromoter(boardDataWithNewMoves)
        }
        await ctx.db.patch(id, {playerTurn: nextTurn, boardData: boardDataWithNewMoves})
        return

    }
})

function pieceCount(board: boxPiece[]) : number {
    let count = 0
    board.forEach(box => {
        if (box?.piece) {
            count++
        }
    })
    return count
}