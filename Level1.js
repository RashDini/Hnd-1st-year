        
var runImageNumber = 1, jumpImageNumber=1,deadImageNumber=1;
var runAnimationNumber = 0,jumpAnimationNumber = 0,deadAnimationNumber=0;
var boyMarginTop = 356;
var blockMarginLeft=0;
var blockId = 1,score = 0;
var moveBackgroundAnimationId=0,createBlockWorkerId = 0;
var backgroundImagePositionX =0;
var moveBlockWorkerId = 0;
var currentLevel = 1;
var levelScoreThreshold = 1000;

//boy element
var boy = document.getElementById("boy");


//const boy = document.getElementById("boy");    

function runAnimation() {
    runImageNumber = (runImageNumber % 10)+1;
    boy.src = `images/Run(${runImageNumber}).png`;
  }


function runAnimationStart() {
    runAnimationNumber = setInterval(runAnimation, 100);
}


function jumpAnimation() {
    jumpImageNumber++;
    if (jumpImageNumber <= 6) boyMarginTop -= 35;
    else if (jumpImageNumber >= 7) boyMarginTop += 35;

    if (jumpImageNumber === 11) {
        jumpImageNumber = 1;
        clearInterval(jumpAnimationNumber);
        jumpAnimationNumber = 0;
        runAnimationStart();
    }

    boy.style.marginTop = `${boyMarginTop}px`;
    boy.src = `images/Jump(${jumpImageNumber}).png`;
}
/*
function jumpAnimation() {
    jumpImageNumber++;

    if (jumpImageNumber <= 6) {
        boyMarginTop -= 35;
    } else if (jumpImageNumber >= 7) {
        boyMarginTop += 35;
    }

    if (jumpImageNumber == 11) {
        jumpImageNumber = 1;
        clearInterval(jumpAnimationNumber);
        jumpAnimationNumber = 0;
        runAnimationStart();
    }

    boy.style.marginTop = boyMarginTop + "px";
    boy.src = "images/Jump(" + jumpImageNumber + ").png";
}*/


function jumpAnimationStart() {
    clearInterval(runAnimationNumber);
    jumpAnimationNumber = setInterval(jumpAnimation, 100);
}


function keyCheck(event) {
    var keyCode = event.which;
    if (keyCode === 13 && runAnimationNumber === 0) runAnimationStart();
    if (keyCode === 32 && jumpAnimationNumber === 0) jumpAnimationStart();
    if (moveBackgroundAnimationId === 0) startGame();
}
function startGame() {
    moveBackgroundAnimationId = setInterval(moveBackground, 100);
    if (createBlockWorkerId === 0) createBlockWorkerId = setInterval(createBlock, 2000);
    if (moveBlockWorkerId === 0) moveBlockWorkerId = setInterval(moveBlock, 100);
}

function moveBackground() {
    backgroundImagePositionX -= 20;
    document.getElementById("background").style.backgroundPositionX = `${backgroundImagePositionX}px`;
    score += 10;
    document.getElementById("score").textContent = score;

    if (score >= levelScoreThreshold) {
        clearInterval(moveBackgroundAnimationId);
        clearInterval(moveBlockWorkerId);
        clearInterval(runAnimationNumber);
        clearInterval(runImageNumber);
        showWinPage(); 
    }
}

function createBlock() {
    const block = document.createElement("div");
    block.className = "block";
    block.id = `block${blockId}`;
    blockId++;
    const gap = Math.random() * (1000 - 300) + 300;
    blockMarginLeft += gap;
    block.style.marginLeft = `${blockMarginLeft}px`;
    document.getElementById("background").appendChild(block);
}

function moveBlock() {
    for (let i = 1; i < blockId; i++) {
        const currentBlock = document.getElementById(`block${i}`);
        if (currentBlock) {
            let currentBlockMarginLeft = parseInt(currentBlock.style.marginLeft.replace("px", ""));
            currentBlockMarginLeft -= 35;
            currentBlock.style.marginLeft = `${currentBlockMarginLeft}px`;
            if (currentBlockMarginLeft < -50) currentBlock.remove();
            if (currentBlockMarginLeft >= 110 && currentBlockMarginLeft <= 160 && boyMarginTop > 300) triggerGameOver();
        }
    }
}

function showWinPage() {
    clearInterval(runAnimationNumber);
    runAnimationNumber=0;
    clearInterval(moveBackgroundAnimationId);
    moveBackgroundAnimationId=0;
    clearInterval(moveBlockWorkerId);
    moveBlockWorkerId = 0;
    clearInterval(runImageNumber);
    runImageNumber=0;
    document.getElementById("win").style.display = "block";
    document.getElementById("winScore").textContent = score;
}


function triggerGameOver() {
    clearInterval(runAnimationNumber);
    clearInterval(jumpAnimationNumber);
    clearInterval(moveBackgroundAnimationId);
    clearInterval(moveBlockWorkerId);
    deadAnimationNumber = setInterval(boyDeadAnimation, 100);
}

function boyDeadAnimation() {
    deadImageNumber++;
    if (deadImageNumber === 11) {
        deadImageNumber = 10;
        document.getElementById("end").style.visibility = "visible";
        document.getElementById("endScore").textContent = score;
    }
    boy.src = `images/Dead(${deadImageNumber}).png`;
}

function reload() {
    location.reload();
}

function gotoNextLevel() {
    currentLevel++;
    setTimeout(()=>{
        window.location.href="Level2.html";
    }, 1400);
    levelScoreThreshold += 1000;
    document.getElementById("currentLevel").textContent = currentLevel;
    document.getElementById("win").style.display = "none";
    score = 0;
    document.getElementById("score").textContent = score;
    backgroundImagePositionX = 0;
    runAnimationStart();
    moveBackgroundAnimationId = setInterval(moveBackground, 100);
}

// Attach keyCheck to keydown event
document.addEventListener("keydown", keyCheck);