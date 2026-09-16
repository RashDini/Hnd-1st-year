var runImageNumber = 1;
var runAnimationNumber = 0;
var moveBlock1WorkerId = 0;


var boy = document.getElementById("boy");

function runAnimation() {
    runImageNumber++;
    if (runImageNumber == 11) {
        runImageNumber = 1;
    }
    boy.src = "images/Run(" + runImageNumber + ").png";
}

function runAnimationStart() {
    runAnimationNumber = setInterval(runAnimation, 100);
}

var jumpImageNumber = 1;
var jumpAnimationNumber = 0;
var boyMarginTop = 356;

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
}

function jumpAnimationStart() {
    clearInterval(runAnimationNumber);
    jumpAnimationNumber = setInterval(jumpAnimation, 100);
}

function keyCheck(event) {
    var keyCode = event.which;

    if (keyCode == 13 && runAnimationNumber == 0) {
        runAnimationStart();
    }

    if (keyCode == 32 && jumpAnimationNumber == 0) {
        jumpAnimationStart();
    }

    if (moveBackgroundAnimationId == 0) {
        moveBackgroundAnimationId = setInterval(moveBackground, 100);

        // Start creating and moving blocks
        if (createBlockWorkerId == 0) {
            createBlockWorkerId = setInterval(createBlock, 2000); // Creates blocks every 2 seconds
        }
        if (moveBlockWorkerId == 0) {
            moveBlockWorkerId = setInterval(moveBlock, 100);
        }

        // Start creating and moving block1
        if (createBlock1WorkerId == 0) {
            createBlock1WorkerId = setInterval(createBlock1, 2500); // Creates block1 every 2.5 seconds
        }
        if (moveBlock1WorkerId == 0) {
            moveBlock1WorkerId = setInterval(moveBlock1, 100);
        }
    }
}

var backgroundImagePositionX = 0;
var moveBackgroundAnimationId = 0;
var score = 0;
var currentLevel = 1;
var levelScoreThreshold = 1000;
var playerscore = 0;

function moveBackground() {
    backgroundImagePositionX -= 20;
    document.getElementById("background").style.backgroundPositionX = backgroundImagePositionX + "px";
    score = score + 10;
    document.getElementById("score").innerHTML = score; 
    playerscore();

    if(score >= levelScoreThreshold ){
        clearInterval(moveBackgroundAnimationId);
        clearInterval(runAnimationNumber);
        showWinPage();
    }
}

function showWinPage(){
    document.getElementById("win").style.display = "block";
    document.getElementById("winScore").textContent = score;
}

function gotoNextLevel(){
    currentLevel++;
    levelScoreThreshold += 1000;

    document.getElementById("currentLevel").textContent = currentLevel;

    score = 0;

    document.getElementById("score").style.display = "score";
    document.getElementById("win").textContent = "none";

    backgroundImagePositionX = 0;
    runAnimationStart();
    moveBackgroundAnimationId = setInterval(moveBackground,100);
}


var blockMarginLeft = 500;
var createBlockWorkerId = 0;
var blockId = 1;
//Block flame
function createBlock() {
    var block = document.createElement("div");
    block.className = "block";
    block.id = "block" + blockId;
    blockId++;

    var gap = Math.random() * (1000 - 300) + 300;
    blockMarginLeft += gap;
    block.style.marginLeft = blockMarginLeft + "px";

    document.getElementById("background").appendChild(block);
}


var moveBlockWorkerId = 0;

function moveBlock() {
    for (var i = 1; i < blockId; i++) {
        var currentBlock = document.getElementById("block" + i);
        if (currentBlock) {
            var currentBlockMarginLeft = parseInt(currentBlock.style.marginLeft.replace("px", ""));
            var newBlockMarginLeft = currentBlockMarginLeft - 35; // Block speed
            currentBlock.style.marginLeft = newBlockMarginLeft + "px";

            // Remove block if it goes out of view
            if (newBlockMarginLeft < -50) {
                currentBlock.remove();
            }

            // Collision Detection for Block
            if (newBlockMarginLeft >= 110 && newBlockMarginLeft <= 160) {
                if(boyMarginTop > 300)
                {
                triggerGameOver();
                }
            }    
        }

    }
}


function createBlock() {
    var block = document.createElement("div");
    block.className = "block";
    block.id = "block" + blockId;
    blockId++;

    // Random gap for block
    var gap = Math.random() * (2000 - 400) + 400; // Smaller gap
    blockMarginLeft += gap;
    block.style.marginLeft = blockMarginLeft + "px";

    document.getElementById("background").appendChild(block);
}

function moveBlock(){           
    for (var i = 1; i < blockId; i++){
        var currentBlock = document.getElementById("block" + i);
        if(currentBlock){
            var currentBlockMarginLeft = parseInt(currentBlock.style.marginLeft.replace("px", ""));
            var newBlockMarginLeft = currentBlockMarginLeft - 35;
            currentBlock.style.marginLeft = newBlockMarginLeft + "px";

            // Remove block if it goes out of view
            if (newBlockMarginLeft < -50) {
                currentBlock.remove();
             }
             
            //Collision Detection
        if (newBlockMarginLeft >= 110 && newBlockMarginLeft <= 160){
                if (boyMarginTop > 300){
                 clearInterval(runAnimationNumber);
                 runAnimationNumber = -1;
                 clearInterval(jumpAnimationNumber);
                 jumpAnimationNumber = -1
                 clearInterval(moveBackgroundAnimationId);
                 moveBackgroundAnimationId = -1;
                 deadAnimationNumber = setInterval(boyDeadAnimation,100);
                 clearInterval(moveBlockWorkerId);
                 moveBlockWorkerId = -1;
                }
            }
        } 
    }   
        
}





const profileButton=document.getElementById("profile-button");
const profileDropdown=document.getElementById("profile-dropdown");

// Correct Profile Dropdown Toggle
profileButton.addEventListener("click", () => {
    profileDropdown.style.display = profileDropdown.style.display === "block" ? "none" : "block";
});

window.addEventListener("click", (event) => {
    if (!profileButton.contains(event.target) && !profileDropdown.contains(event.target)) {
        profileDropdown.style.display = "none";
    }
});

        
//Trigger Game Over
function triggerGameOver(){
                 clearInterval(runAnimationNumber);
                 runAnimationNumber = -1;
                 clearInterval(jumpAnimationNumber);  
                 jumpAnimationNumber = -1
                 clearInterval(moveBackgroundAnimationId);
                 moveBackgroundAnimationId = -1;
                 deadAnimationNumber = setInterval(boyDeadAnimation,100);
                 clearInterval(moveBlockWorkerId);
                 moveBlockWorkerId = -1;
                 clearInterval(moveBlock1WorkerId);
                 moveBlock1WorkerId = -1;
}

var score = 0;
var deadImageNumber = 1;
var deadAnimationNumber = 0;

function boyDeadAnimation(){
    deadImageNumber++;

    if(deadImageNumber == 11){
        deadImageNumber = 10;

        document.getElementById("end").style.visibility= "visible";
        document.getElementById("endScore").innerHTML= score;
    }

    boy.src = "images/Dead(" + deadImageNumber + ").png";
}

function reload() {
    location.reload(); // Reload the page to restart the game
}

var currentLevel = 1;
var levelScoreThreshold = 1000; // Corrected typo in variable name

document.getElementById("currentLevel").textContent = currentLevel;
// Display Win Page
function showWinPage() {
    document.getElementById("win").style.display = "block";
}

// Go to the Next Level
function gotoNextLevel() {
    currentLevel++;
    levelScoreThreshold += 1000;

    document.getElementById("currentLevel").textContent = currentLevel;
    document.getElementById("win").style.display = "none";

    // Reset Game State
    score = 0;
    document.getElementById("score").innerHTML = score;
    backgroundImagePositionX = 0;

    // Restart Animations
    runAnimationStart();
    moveBackgroundAnimationId = setInterval(moveBackground, 100);
}

showStartScreen();



// Attach keyCheck to keydown event
document.addEventListener("keydown", keyCheck);