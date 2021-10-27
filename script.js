const grid = document.querySelector(".grid");
const startBtn = document.getElementById("start");
const score = document.getElementById("score");
let squares = [];


function createGrid(){
    for (let i = 0; i < 100; i++){
        const square = document.createElement("div");
        square.classList.add("squareStyles");
        grid.appendChild(square);
        squares.push(square);
        console.log(squares);
    }
}

createGrid();