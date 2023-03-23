const cells = document.getElementsByClassName("cell");
const turn = document.getElementsByClassName("turn");
const gameBody = document.getElementsByClassName("game");
const result = document.getElementsByClassName("result");
let oTurn = false;
let turns = 0;
let game = [
    ["*", "*", "*"],
    ["*", "*", "*"],
    ["*", "*", "*"]
]
let row = 0;
let column = 0;
let winner = null;
turn[+oTurn].style.backgroundColor = "#F9D459";

const playAgain = ()=>{
    game = [
        ["*", "*", "*"],
        ["*", "*", "*"],
        ["*", "*", "*"]
    ];
    oTurn = false;
    turns = 0;
    winner = null;
    turn[0].style.backgroundColor = "#F9D459";
    turn[1].style.backgroundColor = "#D10757";
    for(let i = 0 ; i < cells.length ; i++){
        cells[i].innerHTML="";
        cells[i].style.backgroundColor = "#D10757";
    }
    gameBody[0].style.display = "block";
    result[0].style.display = "none";
}
const handleWinner = () => {
    if (winner === "draw") {
        gameBody[0].style.display = "none";
        result[0].style.display = "block";
        result[0].innerHTML = `
        <p style="font-size:160px"><span style="color:rgb(249, 212, 89);">X</span> <span style="color:#D10757;">O</span></p>
        <p style="font-size:60px;color:white;">DRAW!</p>
        <div class="btn">
                <a>Play Again</a>
        </div>
        `
    }
    else {
        let time = 0;
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                gameBody[0].children[winner.position[i][0] + 1].children[winner.position[i][1]].style.backgroundColor = "#F9D459";
            }, time += 1000);
        }
        setTimeout(() => {
            gameBody[0].style.display = "none";
            result[0].style.display = "block";
            result[0].innerHTML = `
            <p style="font-size:160px;color:#D10757;">${winner.player}</p>
            <p style="font-size:60px;color:white;">WINNER!</p>
            <div class="btn" onclick="playAgain()">
                <a>Play Again</a>
            </div>
            `
        }, 4000);
    }
}

for (let i = 0; i < cells.length; i++) {
    let x = row;
    let y = column;
    cells[i].onclick = () => {
        if (!winner) {
            if (game[x][y] != "X" && game[x][y] != "O") {
                game[x][y] = turn[+oTurn].innerHTML
                cells[i].innerHTML = game[x][y];
                turn[+oTurn].style.backgroundColor = "#D10757";
                oTurn = !oTurn;
                turn[+oTurn].style.backgroundColor = "#F9D459";
                turns++;
            }
            for (let j = 0; j < 3; j++) {
                let check = true;
                let player = game[j][0];
                for (let k = 1; k < 3; k++) {
                    if (game[j][k] != game[j][k - 1]) check = false;
                    if (game[j][k] === "*") check = false;
                }
                if (check) {
                    winner = {
                        player: player,
                        position: [[j, 0], [j, 1], [j, 2]]
                    }
                    break;
                }
            }
            if (!winner) {
                for (let j = 0; j < 3; j++) {
                    let check = true;
                    let player = game[0][j];
                    for (let k = 1; k < 3; k++) {
                        if (game[k][j] != game[k - 1][j]) check = false;
                        if (game[k][j] === "*") check = false;
                    }
                    if (check) {
                        winner = {
                            player: player,
                            position: [[0, j], [1, j], [2, j]],
                        }
                        break;
                    }
                }
            }
            if (!winner) {
                if (game[0][0] == game[1][1] && game[0][0] == game[2][2] && game[0][0] !== "*")
                    winner = {
                        player: game[0][0],
                        position: [[0, 0], [1, 1], [2, 2]]
                    }
                else if (game[0][2] == game[1][1] && game[1][1] == game[2][0] && game[1][1] !== "*")
                    winner = {
                        player: game[1][1],
                        position: [[0, 2], [1, 1], [2, 0]]
                    }
            }
            if (!winner && turns === 9) {
                winner = "draw";
            }
            if (winner) {
                handleWinner();
            }
        }
    }
    column++;
    if (column == 3) column = 0;
    if ((i + 1) % 3 == 0) row++;
}   