function Node(x = null, y = null, movesAvailable = [], parentNode = null) {
    return { x, y, movesAvailable, parentNode }
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
    let parentPath = [];
    let distance = 0;
    queue.push(startNode);
    
    while (queue.length != 0) {
        let visitedNode = queue.shift();

        if (containsMove(visitedNodesArray, [visitedNode.x, visitedNode.y])) {
            continue;
        } else if (visitedNode.x === end[0] && visitedNode.y === end[1]){
            visitedNodesArray.push([visitedNode]);
            console.log(visitedNodesArray);
            console.log(parentPath);
            let resultPath = displayMovesArray(parentPath);
            return `You made it in ${distance} move(s)! Here is the path: \n${resultPath}`;           
        } else {
            visitedNodesArray.push([visitedNode]);

            let currentNodeMoves = getPossibleMoves(visitedNode);

            currentNodeMoves.forEach(element => {
                element.parentNode = visitedNode;
                queue.push(element);
            });
            if (visitedNode.parentNode == null) {
                continue;
            } else {
                if (!containsMove(parentPath, [visitedNode.parentNode.x, visitedNode.parentNode.y])) {
                    parentPath.push([visitedNode.parentNode.x, visitedNode.parentNode.y]);
                    distance += 1;
                }
            }
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

function displayMovesArray(array) {
    let resultString = '';
    array.forEach((element) => {
        resultString += `[${element}]\n`;
    })

    return resultString;
}
console.log(knightMoves([3, 3], [0, 0]));
// console.log(getPossibleMoves(Node(3, 3)));


// Shouldn't balloon really. You're finding the shortest path to every cell anyway. Yes, when you look at each adjacency, you want to check if it has been visited yet, and if not if it's the end point - and before adding it to the queue, tell it where it came from (its predecessor).

/*
For the starting position, we know it has a predecessor of null (as it's the first), and a distance from the start of 0. Then add it to the BFS list. 

Now, we keep removing a thing from that BFS list, and perhaps check each of its adjacent cells and:
has it been visited (does it have a distance yet)? If so, skip it.
is it the ending point? Build the predecessor list into a path, and return that.
otherwise,  give it a predecessor reference, and a distance of one more than its predecessor's, then add it to the BFS list.
 
We stop when the BFS list is empty (when no more cells can be pushed on, meaning they've all been visited) or when we have a valid path.*/



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