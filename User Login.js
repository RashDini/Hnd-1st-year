document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve input values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const messageElement = document.getElementById("message");

    // Define valid credentials
    const validUsername = "Player1";
    const validPassword = "password123";

    // Check if the entered credentials match the valid ones
    if (username === validUsername && password === validPassword) {
        messageElement.style.color = "green";
        messageElement.textContent = "Login successful! Redirecting to game...";

        // Redirect to the game page after a short delay
        setTimeout(()=>{
        window.location.href="main menu.html";
        }, 1400);
        } else {
        messageElement.style.color = "red";
        messageElement.textContent = "Invalid username or password. Try again!";
        }
    });
            

        


