/* 
Define how a knight can move 
Given a coordinate find all possible moves from that coordinate
Visit one coordinate
    - check if destination
        - if it is, finish
        - if not, add all possible moves from that coordinate to queue
            - move to next coordinate  
*/
function Node(x = null, y = null, movesAvailable = []) {
    return { x, y, movesAvailable }
}


function chessBoard() {
    let boardArray = [];

    for (let i = 0; i < 8; i++) {

    }
}

function moveLeftUp(node) {
    node.x -= 1;
    node.y += 2;

    return node;
}

function possibleMoves(node) {
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

    return currentNode;
}

let testNode = Node(6, 7);
console.log(possibleMoves(testNode));


function knightMoves(start, end) {

}