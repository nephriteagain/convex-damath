import { boxPiece, operation } from "../../types"

export const COUNTING : boxPiece[]  = [
    {x: 0, y: 7, hightlighted: false,    playable: true, piece: {type: 'x', king: false, movable: false, value: 3},   operation: operation.MULTIPLY, },
    {x: 1, y: 7,  playable: false, },
  
    {x: 2, y: 7, hightlighted: false,   playable: true, piece: {type: 'x', king: false, movable: false, value: 6},   operation: operation.DIVIDE, },
    {x: 3, y: 7,  playable: false, },
  
    {x: 4, y: 7, hightlighted: false,   playable: true, piece: {type: 'x', king: false, movable: false, value: 9},   operation: operation.SUBTRACT, },
    {x: 5, y: 7 ,  playable: false, },
  
    {x: 6, y: 7, hightlighted: false,   playable: true, piece: {type: 'x', king: false, movable: false, value: 12},   operation: operation.ADD, },
    {x: 7, y: 7,  playable: false, },
  
    {x: 0, y: 6,  playable: false, },
    {x: 1, y: 6, hightlighted: false,  playable: true, piece: {type: 'x', king: false, movable: false, value: 8},  operation: operation.DIVIDE, },
  
    {x: 2, y: 6,  playable: false, },
    {x: 3, y: 6, hightlighted: false,    playable: true, piece: {type: 'x', king: false, movable: false, value: 11},  operation: operation.MULTIPLY, },
    
    {x: 4, y: 6,  playable: false, },
    {x: 5, y: 6, hightlighted: false,  playable: true, piece: {type: 'x', king: false, movable: false, value: 4},  operation: operation.ADD, },
  
    {x: 6, y: 6,  playable: false, },
    {x: 7, y: 6, hightlighted: false,  playable: true, piece: {type: 'x', king: false, movable: false, value: 1},  operation: operation.SUBTRACT, },
  
    {x: 0, y: 5, hightlighted: false,   playable: true, piece: {type: 'x', king: false, movable: false, value: 5},  operation: operation.SUBTRACT, },
    {x: 1, y: 5,  playable: false, },
  
    {x: 2, y: 5, hightlighted: false,  playable: true, piece: {type: 'x', king: false, movable: false, value: 2},  operation: operation.ADD, },
    {x: 3, y: 5,  playable: false, },
  
    {x: 4, y: 5, hightlighted: false,  playable: true, piece: {type: 'x', king: false, movable: false, value: 7},  operation: operation.MULTIPLY, },
    {x: 5, y: 5,  playable: false, },
  
    {x: 6, y: 5, hightlighted: false,   playable: true, piece: {type: 'x', king: false, movable: false, value: 10},  operation: operation.DIVIDE, },
    {x: 7, y: 5,  playable: false, },
  
    {x: 0, y: 4,  playable: false, },
    {x: 1, y: 4, hightlighted: false,   playable: true,   operation: operation.ADD, },
  
    {x: 2, y: 4,  playable: false, },
    {x: 3, y: 4, hightlighted: false,   playable: true,   operation: operation.SUBTRACT, },
  
    {x: 4, y: 4,  playable: false, },
    {x: 5, y: 4, hightlighted: false,   playable: true,   operation: operation.DIVIDE, },
  
    {x: 6, y: 4,  playable: false, },
    {x: 7, y: 4, hightlighted: false,   playable: true,   operation: operation.MULTIPLY, },
  
    {x: 0, y: 3, hightlighted: false,   playable: true,   operation: operation.MULTIPLY, },
    {x: 1, y: 3,  playable: false, },
  
    {x: 2, y: 3, hightlighted: false,   playable: true,   operation: operation.DIVIDE, },
    {x: 3, y: 3,  playable: false, },
  
    {x: 4, y: 3, hightlighted: false,   playable: true,   operation: operation.SUBTRACT, },
    {x: 5, y: 3,  playable: false, },
  
    {x: 6, y: 3, hightlighted: false,   playable: true,   operation: operation.ADD, },
    {x: 7, y: 3,  playable: false, },
  
    {x: 0, y: 2,  playable: false, },
    {x: 1, y: 2, hightlighted: false,   playable: true, piece: {type: 'z', king: false, movable: true, value: 10},  operation: operation.DIVIDE, },
  
    {x: 2, y: 2,  playable: false, },
    {x: 3, y: 2, hightlighted: false,  playable: true, piece: {type: 'z', king: false, movable: true, value: 7},  operation: operation.MULTIPLY, },
  
    {x: 4, y: 2,  playable: false, },
    {x: 5, y: 2, hightlighted: false,   playable: true, piece: {type: 'z', king: false, movable: true, value: 2},  operation: operation.ADD, },
  
    {x: 6, y: 2,  playable: false, },
    {x: 7, y: 2, hightlighted: false,  playable: true, piece: {type: 'z', king: false, movable: true, value: 5},  operation: operation.SUBTRACT, },
  
    {x: 0, y: 1, hightlighted: false,  playable: true, piece: {type: 'z', king: false, movable: false, value: 1},  operation: operation.SUBTRACT, },
    {x: 1, y: 1,  playable: false, },
  
    {x: 2, y: 1, hightlighted: false,  playable: true, piece: {type: 'z', king: false, movable: false, value: 4},  operation: operation.ADD, },
    {x: 3, y: 1,  playable: false, },
  
    {x: 4, y: 1, hightlighted: false,   playable: true, piece: {type: 'z', king: false, movable: false, value: 11},  operation: operation.MULTIPLY, },
    {x: 5, y: 1,  playable: false, },
  
    {x: 6, y: 1, hightlighted: false,  playable: true, piece: {type: 'z', king: false, movable: false, value: 8},  operation: operation.DIVIDE, },
    {x: 7, y: 1,  playable: false, },
  
    {x: 0, y: 0,  playable: false, },
    {x: 1, y: 0, hightlighted: false,   playable: true, piece: {type: 'z', king: false, movable: false, value: 12},   operation: operation.ADD, },
  
    {x: 2, y: 0,  playable: false, },
    {x: 3, y: 0, hightlighted: false,  playable: true, piece: {type: 'z', king: false, movable: false, value: 9},   operation: operation.SUBTRACT, },
  
    {x: 4, y: 0,  playable: false, },
    {x: 5, y: 0, hightlighted: false,  playable: true, piece: {type: 'z', king: false, movable: false, value: 6},   operation: operation.DIVIDE, },
  
    {x: 6, y: 0,  playable: false, },
    {x: 7, y: 0, hightlighted: false,  playable: true, piece: {type: 'z', king: false, movable: false, value: 3},  operation: operation.MULTIPLY, },
  ]



export const INTEGER = [
  {x: 0, y: 7, hightlighted: false,    playable: true, piece: {type: 'x', king: false, movable: false, value: 2},   operation: operation.MULTIPLY, },
    {x: 1, y: 7,  playable: false, },
  
    {x: 2, y: 7, hightlighted: false,   playable: true, piece: {type: 'x', king: false, movable: false, value: -5},   operation: operation.DIVIDE, },
    {x: 3, y: 7,  playable: false, },
  
    {x: 4, y: 7, hightlighted: false,   playable: true, piece: {type: 'x', king: false, movable: false, value: 8},   operation: operation.SUBTRACT, },
    {x: 5, y: 7 ,  playable: false, },
  
    {x: 6, y: 7, hightlighted: false,   playable: true, piece: {type: 'x', king: false, movable: false, value: -11},   operation: operation.ADD, },
    {x: 7, y: 7,  playable: false, },
  
    {x: 0, y: 6,  playable: false, },
    {x: 1, y: 6, hightlighted: false,  playable: true, piece: {type: 'x', king: false, movable: false, value: -7},  operation: operation.DIVIDE, },
  
    {x: 2, y: 6,  playable: false, },
    {x: 3, y: 6, hightlighted: false,    playable: true, piece: {type: 'x', king: false, movable: false, value: 10},  operation: operation.MULTIPLY, },
    
    {x: 4, y: 6,  playable: false, },
    {x: 5, y: 6, hightlighted: false,  playable: true, piece: {type: 'x', king: false, movable: false, value: -3},  operation: operation.ADD, },
  
    {x: 6, y: 6,  playable: false, },
    {x: 7, y: 6, hightlighted: false,  playable: true, piece: {type: 'x', king: false, movable: false, value: 0},  operation: operation.SUBTRACT, },
  
    {x: 0, y: 5, hightlighted: false,   playable: true, piece: {type: 'x', king: false, movable: false, value: 4},  operation: operation.SUBTRACT, },
    {x: 1, y: 5,  playable: false, },
  
    {x: 2, y: 5, hightlighted: false,  playable: true, piece: {type: 'x', king: false, movable: false, value: -1},  operation: operation.ADD, },
    {x: 3, y: 5,  playable: false, },
  
    {x: 4, y: 5, hightlighted: false,  playable: true, piece: {type: 'x', king: false, movable: false, value: 6},  operation: operation.MULTIPLY, },
    {x: 5, y: 5,  playable: false, },
  
    {x: 6, y: 5, hightlighted: false,   playable: true, piece: {type: 'x', king: false, movable: false, value: -9},  operation: operation.DIVIDE, },
    {x: 7, y: 5,  playable: false, },
  
    {x: 0, y: 4,  playable: false, },
    {x: 1, y: 4, hightlighted: false,   playable: true,   operation: operation.ADD, },
  
    {x: 2, y: 4,  playable: false, },
    {x: 3, y: 4, hightlighted: false,   playable: true,   operation: operation.SUBTRACT, },
  
    {x: 4, y: 4,  playable: false, },
    {x: 5, y: 4, hightlighted: false,   playable: true,   operation: operation.DIVIDE, },
  
    {x: 6, y: 4,  playable: false, },
    {x: 7, y: 4, hightlighted: false,   playable: true,   operation: operation.MULTIPLY, },
  
    {x: 0, y: 3, hightlighted: false,   playable: true,   operation: operation.MULTIPLY, },
    {x: 1, y: 3,  playable: false, },
  
    {x: 2, y: 3, hightlighted: false,   playable: true,   operation: operation.DIVIDE, },
    {x: 3, y: 3,  playable: false, },
  
    {x: 4, y: 3, hightlighted: false,   playable: true,   operation: operation.SUBTRACT, },
    {x: 5, y: 3,  playable: false, },
  
    {x: 6, y: 3, hightlighted: false,   playable: true,   operation: operation.ADD, },
    {x: 7, y: 3,  playable: false, },
  
    {x: 0, y: 2,  playable: false, },
    {x: 1, y: 2, hightlighted: false,   playable: true, piece: {type: 'z', king: false, movable: true, value: -9},  operation: operation.DIVIDE, },
  
    {x: 2, y: 2,  playable: false, },
    {x: 3, y: 2, hightlighted: false,  playable: true, piece: {type: 'z', king: false, movable: true, value: 6},  operation: operation.MULTIPLY, },
  
    {x: 4, y: 2,  playable: false, },
    {x: 5, y: 2, hightlighted: false,   playable: true, piece: {type: 'z', king: false, movable: true, value: -1},  operation: operation.ADD, },
  
    {x: 6, y: 2,  playable: false, },
    {x: 7, y: 2, hightlighted: false,  playable: true, piece: {type: 'z', king: false, movable: true, value: 4},  operation: operation.SUBTRACT, },
  
    {x: 0, y: 1, hightlighted: false,  playable: true, piece: {type: 'z', king: false, movable: false, value: 0},  operation: operation.SUBTRACT, },
    {x: 1, y: 1,  playable: false, },
  
    {x: 2, y: 1, hightlighted: false,  playable: true, piece: {type: 'z', king: false, movable: false, value: -3},  operation: operation.ADD, },
    {x: 3, y: 1,  playable: false, },
  
    {x: 4, y: 1, hightlighted: false,   playable: true, piece: {type: 'z', king: false, movable: false, value: 10},  operation: operation.MULTIPLY, },
    {x: 5, y: 1,  playable: false, },
  
    {x: 6, y: 1, hightlighted: false,  playable: true, piece: {type: 'z', king: false, movable: false, value: -7},  operation: operation.DIVIDE, },
    {x: 7, y: 1,  playable: false, },
  
    {x: 0, y: 0,  playable: false, },
    {x: 1, y: 0, hightlighted: false,   playable: true, piece: {type: 'z', king: false, movable: false, value: -11},   operation: operation.ADD, },
  
    {x: 2, y: 0,  playable: false, },
    {x: 3, y: 0, hightlighted: false,  playable: true, piece: {type: 'z', king: false, movable: false, value: 8},   operation: operation.SUBTRACT, },
  
    {x: 4, y: 0,  playable: false, },
    {x: 5, y: 0, hightlighted: false,  playable: true, piece: {type: 'z', king: false, movable: false, value: -5},   operation: operation.DIVIDE, },
  
    {x: 6, y: 0,  playable: false, },
    {x: 7, y: 0, hightlighted: false,  playable: true, piece: {type: 'z', king: false, movable: false, value: 2},  operation: operation.MULTIPLY, },
]

export const WHOLE = [
  {x: 0, y: 7, hightlighted: false,    playable: true, piece: {type: 'x', king: false, movable: false, value: 2},   operation: operation.MULTIPLY, },
    {x: 1, y: 7,  playable: false, },
  
    {x: 2, y: 7, hightlighted: false,   playable: true, piece: {type: 'x', king: false, movable: false, value: 5},   operation: operation.DIVIDE, },
    {x: 3, y: 7,  playable: false, },
  
    {x: 4, y: 7, hightlighted: false,   playable: true, piece: {type: 'x', king: false, movable: false, value: 8},   operation: operation.SUBTRACT, },
    {x: 5, y: 7 ,  playable: false, },
  
    {x: 6, y: 7, hightlighted: false,   playable: true, piece: {type: 'x', king: false, movable: false, value: 11},   operation: operation.ADD, },
    {x: 7, y: 7,  playable: false, },
  
    {x: 0, y: 6,  playable: false, },
    {x: 1, y: 6, hightlighted: false,  playable: true, piece: {type: 'x', king: false, movable: false, value: 7},  operation: operation.DIVIDE, },
  
    {x: 2, y: 6,  playable: false, },
    {x: 3, y: 6, hightlighted: false,    playable: true, piece: {type: 'x', king: false, movable: false, value: 10},  operation: operation.MULTIPLY, },
    
    {x: 4, y: 6,  playable: false, },
    {x: 5, y: 6, hightlighted: false,  playable: true, piece: {type: 'x', king: false, movable: false, value: 3},  operation: operation.ADD, },
  
    {x: 6, y: 6,  playable: false, },
    {x: 7, y: 6, hightlighted: false,  playable: true, piece: {type: 'x', king: false, movable: false, value: 0},  operation: operation.SUBTRACT, },
  
    {x: 0, y: 5, hightlighted: false,   playable: true, piece: {type: 'x', king: false, movable: false, value: 4},  operation: operation.SUBTRACT, },
    {x: 1, y: 5,  playable: false, },
  
    {x: 2, y: 5, hightlighted: false,  playable: true, piece: {type: 'x', king: false, movable: false, value: 1},  operation: operation.ADD, },
    {x: 3, y: 5,  playable: false, },
  
    {x: 4, y: 5, hightlighted: false,  playable: true, piece: {type: 'x', king: false, movable: false, value: 6},  operation: operation.MULTIPLY, },
    {x: 5, y: 5,  playable: false, },
  
    {x: 6, y: 5, hightlighted: false,   playable: true, piece: {type: 'x', king: false, movable: false, value: 9},  operation: operation.DIVIDE, },
    {x: 7, y: 5,  playable: false, },
  
    {x: 0, y: 4,  playable: false, },
    {x: 1, y: 4, hightlighted: false,   playable: true,   operation: operation.ADD, },
  
    {x: 2, y: 4,  playable: false, },
    {x: 3, y: 4, hightlighted: false,   playable: true,   operation: operation.SUBTRACT, },
  
    {x: 4, y: 4,  playable: false, },
    {x: 5, y: 4, hightlighted: false,   playable: true,   operation: operation.DIVIDE, },
  
    {x: 6, y: 4,  playable: false, },
    {x: 7, y: 4, hightlighted: false,   playable: true,   operation: operation.MULTIPLY, },
  
    {x: 0, y: 3, hightlighted: false,   playable: true,   operation: operation.MULTIPLY, },
    {x: 1, y: 3,  playable: false, },
  
    {x: 2, y: 3, hightlighted: false,   playable: true,   operation: operation.DIVIDE, },
    {x: 3, y: 3,  playable: false, },
  
    {x: 4, y: 3, hightlighted: false,   playable: true,   operation: operation.SUBTRACT, },
    {x: 5, y: 3,  playable: false, },
  
    {x: 6, y: 3, hightlighted: false,   playable: true,   operation: operation.ADD, },
    {x: 7, y: 3,  playable: false, },
  
    {x: 0, y: 2,  playable: false, },
    {x: 1, y: 2, hightlighted: false,   playable: true, piece: {type: 'z', king: false, movable: true, value: 9},  operation: operation.DIVIDE, },
  
    {x: 2, y: 2,  playable: false, },
    {x: 3, y: 2, hightlighted: false,  playable: true, piece: {type: 'z', king: false, movable: true, value: 6},  operation: operation.MULTIPLY, },
  
    {x: 4, y: 2,  playable: false, },
    {x: 5, y: 2, hightlighted: false,   playable: true, piece: {type: 'z', king: false, movable: true, value: 1},  operation: operation.ADD, },
  
    {x: 6, y: 2,  playable: false, },
    {x: 7, y: 2, hightlighted: false,  playable: true, piece: {type: 'z', king: false, movable: true, value: 4},  operation: operation.SUBTRACT, },
  
    {x: 0, y: 1, hightlighted: false,  playable: true, piece: {type: 'z', king: false, movable: false, value: 0},  operation: operation.SUBTRACT, },
    {x: 1, y: 1,  playable: false, },
  
    {x: 2, y: 1, hightlighted: false,  playable: true, piece: {type: 'z', king: false, movable: false, value: 3},  operation: operation.ADD, },
    {x: 3, y: 1,  playable: false, },
  
    {x: 4, y: 1, hightlighted: false,   playable: true, piece: {type: 'z', king: false, movable: false, value: 10},  operation: operation.MULTIPLY, },
    {x: 5, y: 1,  playable: false, },
  
    {x: 6, y: 1, hightlighted: false,  playable: true, piece: {type: 'z', king: false, movable: false, value: 7},  operation: operation.DIVIDE, },
    {x: 7, y: 1,  playable: false, },
  
    {x: 0, y: 0,  playable: false, },
    {x: 1, y: 0, hightlighted: false,   playable: true, piece: {type: 'z', king: false, movable: false, value: 11},   operation: operation.ADD, },
  
    {x: 2, y: 0,  playable: false, },
    {x: 3, y: 0, hightlighted: false,  playable: true, piece: {type: 'z', king: false, movable: false, value: 8},   operation: operation.SUBTRACT, },
  
    {x: 4, y: 0,  playable: false, },
    {x: 5, y: 0, hightlighted: false,  playable: true, piece: {type: 'z', king: false, movable: false, value: 5},   operation: operation.DIVIDE, },
  
    {x: 6, y: 0,  playable: false, },
    {x: 7, y: 0, hightlighted: false,  playable: true, piece: {type: 'z', king: false, movable: false, value: 2},  operation: operation.MULTIPLY, },
]

export type POSSIBLEJUMPSTYPE = number[][]

export const POSSIBLEJUMPS : POSSIBLEJUMPSTYPE = [
  [2, 9, 16],
  [4, 11, 18, 25, 32],
  [6, 13, 20, 27, 34, 41, 48],
  [15, 22, 29, 36, 43, 50, 57],
  [31, 38, 45, 52, 59],
  [47, 54, 61],
  [32, 41, 50, 59],
  [16, 25, 34, 43, 52, 61],
  [0, 9, 18, 27, 36, 45, 54, 63],
  [2, 11, 20, 29, 38, 47],
  [4, 13, 22, 31]
]