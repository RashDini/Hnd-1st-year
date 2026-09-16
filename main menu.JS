document.getElementById('play-btn').addEventListener('click' , () => {
    alert('Starting Game ....');

    setTimeout(()=>{
        window.location.href="level1.html";
        }, 1500);
})

/*document.getElementById('instructions-btn').addEventListener('click' , () => {
    alert('Use Enter Button to Game Start!');

   
})*/

const instructionsBtn = document.getElementById('instructions-btn');
const messageBox = document.getElementById('message-box');
const closeBtn = document.getElementById('close-btn');

instructionsBtn.addEventListener('click', () => {
    messageBox.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
    messageBox.classList.add('hidden');
});



document.getElementById('exit-btn').addEventListener('click' , () => {
    alert('Exit from the game');

setTimeout(()=>{
        window.location.href="User Login.html";
      }, 1500);
})

