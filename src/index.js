function setUpAdjacencyMap() {
    const up = 1;
    const down = -1;
    const left = -1;
    const right = 1;
    const rows = 8;
    const columns = 8;
    const adjacencyMap = new Map();
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
            adjacencyMap.set([`${row}`, `${column}`].join("::"), possibleMoves);
        }
    }

    return adjacencyMap;
}

function keyToString(key) {
    return [`${key[0]}`, `${key[1]}`].join("::");
}

function breadthFirstSearch(root, end, map) {
    let queue = [];
    let visited = [];
    let previous = new Map();

    queue.push(root);
    visited.push(root);
    while (queue.length != 0) {
        let currentKey = queue.shift();
        let stringKey = keyToString(currentKey);
        let neighbors = map.get(stringKey);
        for (let i = 0; i < neighbors.length; i++) {
            if (neighbors[i].join() === end.join()) {
                visited.push(keyToString(neighbors[i]));
                previous.set(keyToString(neighbors[i]), currentKey);
                return previous;
            } else if (!visited.includes(keyToString(neighbors[i]))) {
                queue.push(neighbors[i]);
                visited.push(keyToString(neighbors[i]));
                previous.set(keyToString(neighbors[i]), currentKey);
            }
        }
    }

    return previous;
}

function findShortestPath(start, end) {
    let adjacencyMap = setUpAdjacencyMap();
    let search = breadthFirstSearch(start, end, adjacencyMap);
    let path = [];
    let key = keyToString(end);
    path.unshift(end);
    while (key !== keyToString(start)) {
        let value = search.get(key);
        path.unshift(value);
        key = keyToString(value);
    }

    return path;
}

function knightMoves(start, end) {
    let path = findShortestPath(start, end);
    let message = `You made it in ${path.length - 1} moves!  Here's your path: \n`;
    for (let i = 0; i < path.length; i++) {
        message += `[${path[i]}] \n`;
    }

    return message;
}

console.log(knightMoves([0,0], [3,3]));
console.log(knightMoves([3,3], [0,0]));
console.log(knightMoves([3,3], [4,3]));
console.log(knightMoves([0,0], [7,7]));