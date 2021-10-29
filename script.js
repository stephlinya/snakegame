const grid = document.querySelector(".grid");
const startBtn = document.getElementById("start");
const score = document.getElementById("score");
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let totalScore = 0;
let intervalTime = 1000;
let speed = 0.7;
let timerId = 0;

function createGrid(){
    for (let i = 0; i < width*width; i++){
        const square = document.createElement("div");
        square.classList.add("squareStyles");
        grid.appendChild(square);
        squares.push(square);
    }
}

createGrid();

startBtn.addEventListener("click", startGame);

function startGame(){
    timerId = setInterval(move, intervalTime);
    move();
    generateApple();
}

currentSnake.forEach(index => squares[index].classList.add("snake"));

function move(){
    if (
        (currentSnake[0]+ width >= width*width && direction === width) || 
        (currentSnake[0] % width === width-1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        (squares[currentSnake[0]+direction].classList.contains("snake"))
        )
    {
        return clearInterval(timerId);
    }
    
    const tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);
    squares[currentSnake[0]].classList.add("snake");

    if (squares[currentSnake[0]].classList.contains("apple")){
        //remove the class of apple
        squares[currentSnake[0]].classList.remove("apple");
        //grow our snake by adding class of snake to it
        squares[tail].classList.add("snake");
        //grow our snake array
        currentSnake.push(tail);
        //generate new apple
        generateApple();
        //add one to the score
        totalScore++;
        //display our score
        score.textContent = totalScore;
        //speed up our snake
        clearInterval(timerId);
        intervalTime = intervalTime * speed;
        timerId = setInterval(move,intervalTime);
    }
}

function generateApple() { 
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake"))
    squares[appleIndex].classList.add("apple");
}

function control(e) {
    if (e.keyCode === 39){
        direction = 1;
    } else if (e.keyCode === 38){
        direction = -width;
    } else if (e.keyCode === 37){
        direction = -1;
    } else if (e.keyCode === 40){
        direction = width;
    }
}

document.addEventListener("keyup", control);

