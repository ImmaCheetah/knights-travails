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
    
    queue.push(startNode);
    
    while (queue.length != 0) {
        let visitedNode = queue.shift();
        
        if (visitedNode.x === end[0] && visitedNode.y === end[1]) {
            return visitedNode + "reached!";
        }   
        
        let currentNodeMoves = getPossibleMoves(visitedNode);
        
        currentNodeMoves.forEach(element => {
            queue.push(element);
        });
    } 
}
let testNode = Node(3, 3);

// console.log(getPossibleMoves(testNode));
console.log(knightMoves([0, 0], [1, 2]));


/* 
Define how a knight can move 

Given a coordinate find all possible moves from that coordinate
Create a queue
Add first node to queue
Visit one coordinate
    - check if destination
        - if it is, finish
        - if not, add all possible moves from that coordinate to queue
            - move to next coordinate  
*/