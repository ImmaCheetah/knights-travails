function Node(x = null, y = null, movesAvailable = [], parentNode = null) {
    return { x, y, movesAvailable, parentNode }
}

// Go through the first index of 2 array to generate all possible moves
function getPossibleMoves(node) {
    let possibleXMoves = [1, 2, 1, 2, -1, -2, -1, -2];
    let possibleYMoves = [2, 1, -2, -1, 2, 1, -2, -1];
    let currentNode = node;
    
    for (let i = 0; i < possibleXMoves.length; i++) {
        let xMove = currentNode.x + possibleXMoves[i];
        let yMove = currentNode.y + possibleYMoves[i];

        let newNode = Node(xMove, yMove);

        if (xMove < 0 || xMove > 7 || yMove < 0 || yMove > 7) {
            console.log("No such coordinate exists");
            return;
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
    let shortestPath = [];
    let distance = 0;
    // Insert first node in array so it's not empty
    queue.push(startNode);
    
    while (queue.length != 0) {
        // Take first node in queue
        let currentNode = queue.shift();

        // Check if it has been visited yet
        if (containsMove(visitedNodesArray, [currentNode.x, currentNode.y])) {
            continue;
        // Compare the coordinates of current node with argument given and print result if it matches
        } else if (currentNode.x === end[0] && currentNode.y === end[1]){
            visitedNodesArray.push([currentNode]);

            let thisNode = currentNode.parentNode;
            // Use parentNode as a linked list and traverse up until it reaches the start which gives the shortest path
            while (thisNode != null) {
                shortestPath.unshift([thisNode.x, thisNode.y]);
                distance += 1;
                thisNode = thisNode.parentNode;
            }
            // Add end coordinate to array
            shortestPath.push(end);
            return `You made it in ${distance} move(s)! Here is the path: \n${displayMovesArray(shortestPath)}`; 

        } else {
            // Add current node to visited array
            visitedNodesArray.push([currentNode]);
            // Get all the possible moves of current node
            let currentNodeMoves = getPossibleMoves(currentNode);
            
            // Loop through the moves 
            // Assign the current node to be parent of the current moves being looped over
            // Add to queue
            currentNodeMoves.forEach(element => {
                element.parentNode = currentNode;
                queue.push(element);
            });
        }
    } 
}

// Checks a 2D array if an array exists inside it
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

// Formats the shortest path to print each element on a new line
function displayMovesArray(array) {
    let resultString = '';
    array.forEach((element) => {
        resultString += `[${element}]\n`;
    })

    return resultString;
}
console.log(knightMoves([3, 3], [8, 9]));
// console.log(knightMoves([4, 4], [1, 1]));

