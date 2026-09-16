var runImageNumber = 1;
var runAnimationNumber = 0;
var jumpImageNumber = 1;
var jumpAnimationNumber = 0;
var boyMarginTop = 356;
var backgroundImagePositionX = 0;
var moveBackgroundAnimationId = 0;
var blockMarginLeft = 500;
var createBlockWorkerId = 0;
var blockId = 1;
var moveBlockWorkerId = 0;
var block1MarginLeft = 500;
var createBlock1WorkerId = 0;
var block1Id = 1;
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

function jumpAnimation() {
    jumpImageNumber++;

    if (jumpImageNumber <= 6) {
        boyMarginTop -= 20;
    } else if (jumpImageNumber >= 7) {
        boyMarginTop += 20;
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

function moveBackground() {
    backgroundImagePositionX -= 20;
    document.getElementById("background").style.backgroundPositionX = backgroundImagePositionX + "px";
}

function createBlock() {
    var block = document.createElement("div");
    block.className = "block";
    block.id = "block" + blockId;
    blockId++;

    var gap = Math.random() * (1000 - 400) + 400;
    blockMarginLeft += gap;
    block.style.marginLeft = blockMarginLeft + "px";

    document.getElementById("background").appendChild(block);
}

function moveBlock() {
    for (var i = 1; i < blockId; i++) {
        var currentBlock = document.getElementById("block" + i);
        if (currentBlock) {
            var currentBlockMarginLeft = parseInt(currentBlock.style.marginLeft.replace("px", ""));
            var newBlockMarginLeft = currentBlockMarginLeft - 30;
            currentBlock.style.marginLeft = newBlockMarginLeft + "px";

            // Remove block if it goes out of view
            if (newBlockMarginLeft < -50) {
                currentBlock.remove();
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
    var gap = Math.random() * (800 - 300) + 300; // Smaller gap
    blockMarginLeft += gap;
    block.style.marginLeft = blockMarginLeft + "px";

    document.getElementById("background").appendChild(block);
}

function moveBlock() {
    for (var i = 1; i < blockId; i++) {
        var currentBlock = document.getElementById("block" + i);
        if (currentBlock) {
            var currentBlockMarginLeft = parseInt(currentBlock.style.marginLeft.replace("px", ""));
            var newBlockMarginLeft = currentBlockMarginLeft - 50; // Slower speed for block
            currentBlock.style.marginLeft = newBlockMarginLeft + "px";

            // Remove block if it goes out of view
            if (newBlockMarginLeft < -50) {
                currentBlock.remove();
            }
        }
    }
}


// Attach keyCheck to keydown event
document.addEventListener("keydown", keyCheck);