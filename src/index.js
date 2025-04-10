function setUpAdjacencyList() {
    let up = 1;
    let down = -1;
    let left = -1;
    let right = 1;
    let rows = 8;
    let columns = 8;
    let adjacencyList = [];
    let board = [];

    let directions = [[left - 1, up], 
                        [left, up + 1], 
                        [right, up + 1], 
                        [right + 1, up], 
                        [left - 1, down], 
                        [left, down - 1], 
                        [right, down - 1], 
                        [right + 1, down]];

    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            board.push([row, column]);
            let possibleMoves = [];
            for (let direction in directions) {
                if ((row + directions[direction][0] >= 0 && row + directions[direction][0] < 8)
                    && (column + directions[direction][1] >= 0 && column + directions[direction][1] < 8)) {
                    possibleMoves.push([row + directions[direction][0], column + directions[direction][1]]);
                }
            }
            adjacencyList.push(possibleMoves);
        }
    }

    console.log(board);
    return adjacencyList;
}

function knightMoves(start, end) {
    return start;
}

console.log(setUpAdjacencyList());
console.log(knightMoves([0,0], [3,3]));