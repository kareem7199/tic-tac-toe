const cells = document.getElementsByClassName("cell");
const turn = document.getElementsByClassName("turn");
const gameBody = document.getElementsByClassName("game");
const result = document.getElementsByClassName("result");
const turnScreen = document.getElementsByClassName("turns");
let oTurn = false;
let turns = 0;
let rows = document.getElementsByClassName("row");
let game = [
    ["*", "*", "*"],
    ["*", "*", "*"],
    ["*", "*", "*"]
]
let row = 0;
let column = 0;
let winner = null;
turnScreen[0].innerHTML = `<span class="${turn[+oTurn].innerHTML.toLowerCase()}">${turn[+oTurn].innerHTML}</span>Turn`;

if (!localStorage.getItem("X"))
    localStorage.setItem("X", 0);

if (!localStorage.getItem("tie"))
    localStorage.setItem("tie", 0);

if (!localStorage.getItem("O"))
    localStorage.setItem("O", 0);
rows[3].children[0].children[1].innerHTML = localStorage.getItem("X");
rows[3].children[1].children[1].innerHTML = localStorage.getItem("tie");
rows[3].children[2].children[1].innerHTML = localStorage.getItem("O");
const playAgain = () => {
    if (!winner) {
        turn[0].style.display = "block";
        turn[1].style.display = "block";
        game = [
            ["*", "*", "*"],
            ["*", "*", "*"],
            ["*", "*", "*"]
        ];
        oTurn = false;
        turns = 0;
        winner = null;
        for (let i = 0; i < cells.length; i++) {
            cells[i].innerHTML = "";
            cells[i].style.backgroundColor = "#1E3640";
        }
        gameBody[0].style.display = "block";
        result[0].style.display = "none";
        turnScreen[0].innerHTML = `<span class="${turn[+oTurn].innerHTML.toLowerCase()}">${turn[+oTurn].innerHTML}</span>Turn`;
    }
}

const handleWinner = () => {
    if (winner === "draw") {
        let total = localStorage.getItem("tie");
        total = +total;
        total += 1;
        localStorage.setItem("tie", total);
        winner = null;
        gameBody[0].style.display = "none";
        result[0].style.display = "block";
        result[0].innerHTML = `
        <p style="font-size:160px"><span style="color:rgb(47, 195, 190);">X</span> <span style="color:#F2B237;">O</span></p>
        <p style="font-size:60px;color:white;">DRAW!</p>
        <div class="btn" onclick="playAgain()">
                <a>Play Again</a>
        </div>
        `
    }
    else {
        let total = localStorage.getItem(`${winner.player}`);
        total = +total;
        total += 1;
        localStorage.setItem(`${winner.player}`, total);
        let time = 0;
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                gameBody[0].children[winner.position[i][0] + 1].children[winner.position[i][1]].style.backgroundColor = "#19625E";
                gameBody[0].children[winner.position[i][0] + 1].children[winner.position[i][1]].style.color = "#0D1C23";
            }, time += 1000);
        }
        setTimeout(() => {
            gameBody[0].style.display = "none";
            result[0].style.display = "block";
            result[0].innerHTML = `
            <p class = "${winner.player.toLowerCase()}" style="font-size:160px;">${winner.player}</p>
            <p style="font-size:40px;color:white;">TAKES THE ROUND</p>
            <div class="btn" onclick="playAgain()">
            <a>Play Again</a>
            </div>
            `
            winner = null;
        }, 4000);
    }
    rows[3].children[0].children[1].innerHTML = localStorage.getItem("X");
    rows[3].children[1].children[1].innerHTML = localStorage.getItem("tie");
    rows[3].children[2].children[1].innerHTML = localStorage.getItem("O");
}

for (let i = 0; i < cells.length; i++) {
    let x = row;
    let y = column;
    cells[i].onclick = () => {
        if (!winner) {
            if (game[x][y] != "X" && game[x][y] != "O") {
                game[x][y] = turn[+oTurn].innerHTML
                turns % 2 == 0 ? cells[i].style.color = "#2FC3BE" : cells[i].style.color = "#F3B134";
                cells[i].innerHTML = game[x][y];
                oTurn = !oTurn;
                turnScreen[0].innerHTML = `<span class="${turn[+oTurn].innerHTML.toLowerCase()}">${turn[+oTurn].innerHTML}</span>Turn`;
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