
var runImageNumber = 1,jumpImageNumber = 1,deadImageNumber = 1;
var runAnimationNumber = 0,jumpAnimationNumber = 0, deadAnimationNumber = 0;
var boyMarginTop = 356;
var blockMarginLeft = 500, block1MarginLeft = 500;
var blockId = 1, block1Id = 1, score = 0;
var moveBackgroundAnimationId = 0, createBlockWorkerId = 0, createBlock1WorkerId = 0;
var moveBlockWorkerId = 0, moveBlock1WorkerId = 0;
var levelScoreThreshold = 1500;

//boy element
var boy = document.getElementById("boy");

//run animation
function runAnimation() {
    runImageNumber = (runImageNumber % 10)+1;
    boy.src = `images/Run(${runImageNumber}).png`;
  }
  
  function runAnimationStart() {
    runAnimationNumber = setInterval(runAnimation, 100);
  }

//jump animation
function jumpAnimation() {
    jumpImageNumber++;
    if (jumpImageNumber <= 6) boyMarginTop -= 35; // Ascend
    else if (jumpImageNumber >= 7) boyMarginTop += 35; // Descend
  
    if (jumpImageNumber == 11) {
      jumpImageNumber = 1;
      clearInterval(jumpAnimationNumber);
      jumpAnimationNumber = 0;
      runAnimationStart();
    }

    boy.style.marginTop = boyMarginTop + "px";
    boy.src = `images/Jump(${jumpImageNumber}).png`;
  }
  
  function jumpAnimationStart() {
    clearInterval(runAnimationNumber);
    jumpAnimationNumber = setInterval(jumpAnimation, 100);
  }

  //key controls
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && runAnimationNumber === 0) runAnimationStart();
    if (event.key === " " && jumpAnimationNumber === 0) jumpAnimationStart();
  

      if (moveBackgroundAnimationId === 0) {
        moveBackgroundAnimationId = setInterval(moveBackground, 100);
        createBlockWorkerId = setInterval(createBlock, 2000);
        moveBlockWorkerId = setInterval(moveBlock, 100);
        createBlock1WorkerId = setInterval(createBlock1, 3000);
        moveBlock1WorkerId = setInterval(moveBlock1, 100);
      }
});

//background movement
function moveBackground() {
    var background = document.getElementById("background");
    background.style.backgroundPositionX = `${(parseInt(getComputedStyle(background).backgroundPositionX) || 0) - 20}px`;
    score += 10;
    document.getElementById("score").textContent = ` ${score}`;

      if (score >= levelScoreThreshold) {
        clearInterval(moveBackgroundAnimationId);
        clearInterval(moveBlockWorkerId);
        clearInterval(moveBlock1WorkerId);
        clearInterval(runAnimationNumber);
        clearInterval(runImageNumber);
        showWinPage();
      }
}

  
// Create block1(Stone)
function createBlock1() {
    var block1 = document.createElement("div");
    block1.className = "block1";
    block1.id = `block1_${block1Id}`;
    block1.style.marginLeft = `${(block1MarginLeft += Math.random() * 1000 + 100)}px`;
    document.getElementById("background").appendChild(block1);
    block1Id++;
  }
  
  // Move block1
  function moveBlock1() {
    for (let i = 1; i < block1Id; i++) {
      let block1 = document.getElementById(`block1_${i}`);
      if (block1) {
        let marginLeft = parseInt(block1.style.marginLeft) - 35;
        block1.style.marginLeft = `${marginLeft}px`;
        if (marginLeft < -50) block1.remove();
  
        // Collision detection
        if (marginLeft > 110 && marginLeft < 160 && boyMarginTop > 300) triggerGameOver("Dead");
      }
    }
}
  
  // Create block(Fire Flame)
  function createBlock() {
    var block = document.createElement("div");
    block.className = "block";
    block.id = `block${blockId}`;
    block.style.marginLeft = `${(blockMarginLeft += Math.random() * 1000 + 300)}px`;
    document.getElementById("background").appendChild(block);
    blockId++;
  }
  
  // Move block
  function moveBlock() {
    for (let i = 1; i < blockId; i++) {
      let block = document.getElementById(`block${i}`);
      if (block) {
        let marginLeft = parseInt(block.style.marginLeft) - 35;
        block.style.marginLeft = `${marginLeft}px`;
        if (marginLeft < -50) block.remove();
  
        // Collision detection
        if (marginLeft > 110 && marginLeft < 160 && boyMarginTop > 300) triggerGameOver("Dead");
      }
    }
  }
  
  

//trigger game over
function triggerGameOver(animationType) {
    clearInterval(runAnimationNumber);
    clearInterval(jumpAnimationNumber);
    clearInterval(moveBackgroundAnimationId);
    clearInterval(moveBlockWorkerId);
    clearInterval(moveBlock1WorkerId);
  
    deadAnimationNumber = setInterval(() => boyDeadAnimation(animationType), 100);
  }
  

//dead animation
function boyDeadAnimation(type) {
    deadImageNumber++;
    if (deadImageNumber === 11) {
      clearInterval(deadAnimationNumber);
      document.getElementById("end").style.visibility = "visible";
      document.getElementById("endScore").textContent = `${score}`;
    }
    boy.src = `images/${type}(${deadImageNumber}).png`;
  }

  function showWinPage() {
    clearInterval(runAnimationNumber);
    runAnimationNumber=0;
    clearInterval(moveBackgroundAnimationId);
    moveBackgroundAnimationId=0;
    clearInterval(moveBlockWorkerId);
    moveBlockWorkerId = 0;
    clearInterval(moveBlock1WorkerId);
    moveBlock1WorkerId = 0;
    clearInterval(runImageNumber);
    runImageNumber=0;
    document.getElementById("win").style.display = "block";
    document.getElementById("winScore").textContent = score;
  }

function gotoMainMenu() {
    window.location.href="main menu.html";
   // currentLevel++;
    /*levelScoreThreshold += 1000;
    document.getElementById("currentLevel").textContent = currentLevel;
    document.getElementById("win").style.display = "none";
    score = 0;
    document.getElementById("score").textContent = score;
    backgroundImagePositionX = 0;
    runAnimationStart();
    moveBackgroundAnimationId = setInterval(moveBackground, 100);*/ 
  }

  // Reload game
function reload() {
    location.reload();
}

//document.addEventListener("keydown", keyCheck);
