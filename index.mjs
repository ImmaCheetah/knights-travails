function Node(x = null, y = null, movesAvailable = []) {
    return { x, y, movesAvailable }
}

function getPossibleMoves(node) {
    let possibleXMoves = [1, 2, 1, 2, -1, -2, -1, -2];
    let possibleYMoves = [2, 1, -2, -1, 2, 1, -2, -1];
    let currentNode = node;
    
    for (let i = 0; i < possibleXMoves.length; i++) {
        let xMove = currentNode.x + possibleXMoves[i];
        let yMove = currentNode.y + possibleYMoves[i];

        let newNode = Node(xMove, yMove);

        if (xMove < 0 || xMove > 7 || yMove < 0 || yMove > 7) {
            continue;
        } else {
            currentNode.movesAvailable.push(newNode);
        }
    }
    return currentNode.movesAvailable;
}

function knightMoves(start, end) {
    let startNode = Node(start[0], start[1])
    let queue = [];
    let visitedNodesArray = [];
    
    queue.push(startNode);
    
    while (queue.length != 0) {
        let visitedNode = queue.shift();

        console.log(visitedNodesArray);
        
        if (containsMove(visitedNodesArray, [visitedNode.x, visitedNode.y])) {
            console.log('exists');
        } else {
            visitedNodesArray.push([visitedNode.x, visitedNode.y]);

            if (visitedNode.x === end[0] && visitedNode.y === end[1]) {
                return visitedNode + "reached!";
            }   
            
            let currentNodeMoves = getPossibleMoves(visitedNode);
            
            currentNodeMoves.forEach(element => {
                queue.push(element);
            });
        }
    } 
}

function containsMove(arrayToSearch, arrayToFind) {
    let output = false;

    for (let i = 0; i < arrayToSearch.length; i++) {
        for (let j = 0; j < 1; j++) {
            if (arrayToSearch[i][j] === arrayToFind[0] && arrayToSearch[i][j + 1] === arrayToFind[1]) {
                output = true;
            }
        }

    }

    return output;
}
let testNode = Node(3, 3);
let arr = [
    [4, 7],
    [8, 3],
    [2, 10],
    [6, 9],
    [1, 5],
    [10, 2],
    [7, 8],
    [3, 6],
    [9, 4],
    [5, 1]
]
// console.log(containsMove(arr, [10, 2]));
// console.log(getPossibleMoves(testNode));
console.log(knightMoves([0, 0], [6, 3]));


/* 
Define how a knight can move 
Get start and end
Create a queue
Create array to keep track of visited nodes
Add start node to queue
Check if node exists in visited nodes
Pop the start node and check if its the same as end coordinate
    - If it is, end and return
Else
    - Find all possible moves/nodes from that coordinate
    - Add all of them to queue

*/