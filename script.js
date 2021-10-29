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
const speed = 0.7;
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

currentSnake.forEach(index => squares[index].classList.add("snake"));

function startGame(){
    squares[appleIndex].classList.remove("apple");
    currentSnake.forEach(index => squares[index].classList.remove("snake"));
    currentSnake = [2, 1, 0];
    totalScore = 0;
    score.textContent = totalScore;
    intervalTime = 1000;
    direction = 1; 
    clearInterval(timerId);
    timerId = setInterval(move, intervalTime);
    move();
    generateApple();
    currentSnake.forEach(index => squares[index].classList.add("snake"));
}

function move(){
    if (
        (currentSnake[0]+ width >= width*width && direction === width) || 
        (currentSnake[0] % width === width-1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        (squares[currentSnake[0]+direction].classList.contains("snake"))
        )
    {
        console.log("you lose");
        return clearInterval(timerId);
    }
    
    const tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);
    squares[currentSnake[0]].classList.add("snake");

    if (squares[currentSnake[0]].classList.contains("apple")){
        squares[currentSnake[0]].classList.remove("apple");
        squares[tail].classList.add("snake");
        currentSnake.push(tail);
        generateApple();
        totalScore++;
        score.textContent = totalScore;
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
startBtn.classList.remove("blinking");
startBtn.addEventListener("click", startGame);
startBtn.addEventListener("mouseover", function(){
    startBtn.classList.add("blinking");
})

startBtn.addEventListener("mouseout", function(){
    startBtn.classList.remove("blinking");
})

