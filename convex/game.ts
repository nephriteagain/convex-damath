import { cloneDeep } from 'lodash';
import { piece, boxPiece } from '../types';
import { movePiece as movePieceHelper } from '../gameLogic/movePiece';
import { gameData } from "../types";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { checkMovablePieces, kingPromoter } from '../gameLogic/checkMovablePieces'
import { COUNTING, WHOLE, INTEGER } from '../lib/data/gameData';
// import { } from '../gameLogic/'
import { scoreHandler, getNewPieceBox, getTotalRemainingScore} from '../gameLogic/scoreHandler'

function generateId() {
    return Math.random().toString(16).slice(2)
}

const games = {
    'COUNTING': COUNTING,
    'WHOLE': WHOLE,
    'INTEGER': INTEGER,
}   


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
    boardData: v.array(v.any()),
    score: v.object({
        z: v.number(),
        x: v.number()
    })
}
export const movePiece = mutation({
    // wtf is this typings
    args: movePieceArgs,
    handler: async (ctx, args) => {
        const {piece, index, pieceIndex, playerTurn, id, boardData, players, score} = args
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

        let newScore = score
        if (didCapturedAPiece) {
            const capturedPiece = capturedPieceArr[0]
            const newPieceBox = getNewPieceBox(boardDataWithNewMoves, piece)
            const scoree = players.x === nextTurn ? 'z' : 'x'
            newScore = scoreHandler(score, scoree, piece, capturedPiece, newPieceBox)
        }

        if (canMultiJump && didCapturedAPiece) {
            nextTurn = playerTurn === players?.z ? players?.z : players?.x
        }

        if (!canMultiJump) {
            kingPromoter(boardDataWithNewMoves)
        }

        if (!boardDataWithNewMoves.some(box => box?.piece?.moves && box.piece.moves.length > 0)) {
            const totalScores = {...newScore}
            totalScores.x += getTotalRemainingScore('x', boardDataWithNewMoves)
            totalScores.z += getTotalRemainingScore('z', boardDataWithNewMoves)
            await ctx.db.patch(id, {
                playerTurn: nextTurn, 
                boardData: 
                boardDataWithNewMoves,
                score: newScore,
                gameOngoing: false
            })
            return
        }
        
        await ctx.db.patch(id, {
            playerTurn: nextTurn, 
            boardData: 
            boardDataWithNewMoves,
            score: newScore,
        })
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

export const getWatchGameList = query({
    args: {
        filter: v.optional(v.union(
            v.string(),
            v.null()
        )),
        order: v.optional(v.union(
            v.literal('asc'),
            v.literal('desc'),
        ))
    },
    handler: async (ctx, args) => {
        const { filter, order = 'desc' } = args        
        if (
            filter === 'COUNTING' ||
            filter === 'WHOLE' ||
            filter === 'INTEGER'
        ) {
            const watchGameList = await ctx.db
                .query('games')
                .filter(q => q.eq(q.field('gameOngoing'), true))
                .filter(q => q.eq(q.field('gameType'), filter))
                .order(order)
                .collect()
            return watchGameList
        }
        const watchGameList = await ctx.db
            .query('games')
            .filter(q => q.eq(q.field('gameOngoing'), true))
            .order(order)
            .collect()
        return watchGameList
    }
})

export const sendGameMessage = mutation({
    args: {
        id: v.id('games'), 
        sId: v.string(), 
        text: v.string(),
        chat: v.array(v.object({
            sId: v.string(),
            mId: v.string(),
            text: v.string()
        }))
    },
    handler: async (ctx, args) => {
        const {id, sId, text, chat} = args
        const newMessage = {
            sId,
            mId: generateId(),
            text,
        }
        const newChat = [...chat, newMessage]
        const res = await ctx.db.patch(id, {chat: newChat})
        return res
    }
})

export const requestRestart = mutation({
    args: {
        userId: v.string(),
        gameId: v.id('games')
    },
    handler: async (ctx, args) => {
       const { userId, gameId } = args 
       const res = await ctx.db.patch(gameId, {
        command: {
            sender: userId,
            type: 'REQ_RESTART'
           }
    })
       return res
    }
})

const gameTypeSchema = v.union(
    v.literal('COUNTING'),
    v.literal('INTEGER'),
    v.literal('WHOLE'),
)

export const approveRestart = mutation({
    args: {
        gameId: v.id('games'),
        gameType: gameTypeSchema
    },
    handler: async (ctx, args) => {
        const { gameId, gameType } = args
        
        await ctx.db.patch(gameId, {
            boardData: games[gameType],
            command: undefined
        })
    }
})

export const requestChangeGameMode = mutation({
    args: {
        userId: v.string(),
        gameId: v.id('games'),
        gameType: gameTypeSchema
    },
    async handler(ctx, args) {
        const { userId, gameId, gameType } = args
        const res = await ctx.db.patch(gameId, {
            command: {
                type: 'REQ_CHANGE_GAME_MODE',
                sender: userId,
                data: gameType
            }
        })
        return res
    },
})

export const approveChangeGameMode = mutation({
    args: {
        gameId: v.id('games'),
        gameType: gameTypeSchema
    },
    handler: async (ctx, args) => {
        const { gameId, gameType } = args        
        const res = await ctx.db.patch(gameId, {
            command: undefined,
            boardData: games[gameType]
        })
        return res
    },
})

export const leaveGame = mutation({
    args: {gameId: v.id('games')},
    handler: async (ctx, args) => {
        const {gameId} = args
        const res =  await ctx.db.patch(gameId, {gameOngoing: false})
        return res
    }
})

export const clearCommands = mutation({
    args: {gameId: v.id('games')},
    handler: async (ctx, args) => {
        const { gameId } =  args
        const res = await ctx.db.patch(gameId, {command: undefined})
        return res
    }
})
