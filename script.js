//Pour le code, il faut faire un eventListener sur document
//et ("keydown", (event) => {}) pour utiliser event.key
//pour les comparaisons if (event.key === "ArrowUp")
//Ne pas oublier de relancer la fonction dessin pour
//effacer le canva et tout réécrire avec .clearRect(x, y, width, height)
//Utiliser .beginPath() avant de faire une nouvelle forme 
//pour éviter un évènement bizarre entre les dessins

function draw () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();

    // if (balleX + rayonBalle >= canvas.width) {
    //     dx = -dx;
    // } else if (balleY + rayonBalle >= canvas.height || balleY - rayonBalle <= 0) {
    //     dy = -dy;
    // } else if (balleX - rayonBalle <= rect1Y + rectHeight && balleX - rayonBalle >= rect1Y) {
    //     dx = -dx;
    // } else if (balleX - rayonBalle <= 0) {
    //     alert("Game over !")
    //     document.location.reload();
    //     clearInterval(intervalId);
    // }

    if (balleY >= canvas.height - rayonBalle || balleY <= rayonBalle) {
        dy = -dy;
    } else if (balleX - rayonBalle <= rect1X + rectWidth && balleY > rect1Y && balleY < rect1Y + rectHeight) {
        balleX = rect1X + rectWidth + rayonBalle;
        dx = -dx;
        dx++;
        dy++;
    } else if (balleX + rayonBalle >= rect2X && balleY > rect2Y && balleY < rect2Y + rectHeight) {
        balleX = rect2X - rayonBalle;
        dx = - dx;
        dx--;
    } else if (balleX + rayonBalle <= 0){
        scoreP2++;
        if (scoreP1 === 5 || scoreP2 === 5) {
            drawWinner();
        } else {
            relance();
        }  
    } else if (balleX - rayonBalle >= canvas.width) {
        scoreP1++;
        if (scoreP1 === 5 || scoreP2 === 5) {
            drawWinner();
        } else {
            relance();
        }  
    }

    //Gestion des commandes pour la raquette droite
    if (upPressed) {
        rect2Y -= dr;
        if (rect2Y < 0) rect2Y = 0;
    } else if (downPressed) {
        rect2Y += dr;
        if (rect2Y + rectHeight > canvas.height) rect2Y = canvas.height - rectHeight;
    } 

    //Gestion des commandes pour la raquette gauche
    if (zPressed) {
        rect1Y -= dr;
        if (rect1Y < 0) rect1Y = 0;
    } else if (sPressed) {
        rect1Y += dr;
        if (rect1Y + rectHeight > canvas.height) rect1Y = canvas.height - rectHeight;   
    }

    balleX += dx;
    balleY += dy;
}

function drawBall () {
    context.beginPath();
    context.arc(balleX, balleY, rayonBalle, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
}

function drawPaddle () {
    context.fillStyle = "white";

    context.beginPath();
    context.fillRect(rect1X, rect1Y, rectWidth, rectHeight);
    context.closePath();

    context.beginPath();
    context.fillRect(rect2X, rect2Y, rectWidth, rectHeight);
    context.closePath();
}

function drawScore () {
    context.font = "30px Arial";
    context.fill();
    context.fillText(`Score : ${scoreP1} / ${scoreP2}`, canvas.width / 2 - 70, 30);
}

function drawWinner () {
    clearInterval(intervalId);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "50px Arial";
    context.fill();
    if(scoreP1 === 5) context.fillText("Gagnant : Joueur 1", canvas.width / 2 - 200, canvas.height / 2);
    if(scoreP2 === 5) context.fillText("Gagnant : Joueur 2", canvas.width / 2 - 200, canvas.height / 2);
}

function relance () {
    balleX = canvas.width / 2;
    balleY = canvas.height / 2;
    dx = -2;
    dy = 2;    
    clearInterval(intervalId);

    setTimeout(() => {
    intervalId = setInterval(draw, 10); 
    }, 1000);
}

function keyDownHandler (event) {
    if (event.key === "ArrowUp") {
        upPressed = true;
    } else if (event.key === "ArrowDown"){
        downPressed = true;
    } else if (event.key === "z") {
        zPressed = true;
    } else if (event.key === "s") {
        sPressed = true;
    }
}

function keyUpHandler (event) {
    if (event.key === "ArrowUp") {
        upPressed = false;
    } else if (event.key === "ArrowDown"){
        downPressed = false;
    } else if (event.key === "z") {
        zPressed = false;
    } else if (event.key === "s") {
        sPressed = false;
    }
}


let canvas = document.getElementById("pong");
//Permet l'auto-complétion sur notre .getContext (à placer juste avant)
/** @type {CanvasRenderingContext2D} */
let context = canvas.getContext("2d");

//Taille objet
const rectWidth = 15;
const rectHeight = 100;
const rayonBalle = 15;

//Position rectangle 1
let rect1X = 10;
let rect1Y = (canvas.height - rectHeight) / 2;

//Position rectangle 2
let rect2X = canvas.width - rectWidth - 10;
let rect2Y = (canvas.height - rectHeight) / 2;

//Position balle
let balleX = canvas.width / 2;
let balleY = canvas.height / 2;

//Direction raquette
let dr = 5;

//Direction balle
let dx = -2;
let dy = 2;

//Touche pressée
let upPressed = false;
let downPressed = false;
let zPressed = false;
let sPressed = false;

//Score
let scoreP1 = 0;
let scoreP2 = 0;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

let intervalId = setInterval(draw, 10);