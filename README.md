# Hnd 1st year

# 🎮 2D GAME – RUN AND JUMP BOY

An engaging, browser-based offline 2D side-scrolling running game developed as an individual web technology project. The game provides a lightweight and interactive entertainment platform featuring real-time physics mechanics, collision detection, and multi-level progressions.

---

## 💻 Tech Stack & Implementation Environment

### Core Technologies
* **Structure:** HTML5 (Defines game layout, main menus, and UI containers)
* **Aesthetics & Motion:** CSS3 (Handles layout styling, absolute positioning, and smooth element transitions)
* **Game Engine Logic:** Vanilla JavaScript (ES6) (Manages player input controls, character velocity physics, object movement loop, collision logic, and real-time score keeping)

### Development Environment
* **Code Editor:** Visual Studio Code
* **Debugging Tools:** Google Chrome Developer Tools (Console logs & runtime element monitoring)
* **Design Assets:** Pre-built visual sprite elements and retro audio tracks sourced via open platforms

---

## 🕹️ How the Game Works (Gameplay & Workflow)

The game runs inside a continuous scrolling framework to create the dynamic illusion of an endless running environment. It functions entirely offline via a desktop browser loop following these mechanics:

### 1. Game Initialization & Main Menu
* When a player launches the local project, they are presented with a clean **User Login portal** followed by the **Main Menu screen**.
* The player can view instructions, exit, or click **Play** to immediately spin up the physics loops.

### 2. Character Controls & Mechanics
* **Automated Runner:** The player character continuously charges forward across the scrolling landscape automatically.
* **Responsive Inputs:** The user interacts with the desktop keyboard or mouse to execute real-time actions:
  * **Jump / Crouch:** Evade incoming vertical hazards.
  * **Left / Right:** Micro-adjust positioning on the tracking axis.
* **Physics Integration:** Character movement integrates simulated gravity, friction, and vertical velocity to ensure clean jumps and realistic falling curves.

### 3. Level Progression & Obstacles
The game consists of two distinct level setups with scaled difficulty configurations:
* 🔥 **Level 01 (Stage 1 - 4):** The character runs forward and must jump to successfully scale over isolated **Fire hazards**.
* 🪨 **Level 02 (Stage 1 - 4):** The difficulty spikes by introducing grouped combinations of both **Stones and Fire hazards** requiring precise timing.

### 4. Scoring, Win, & Game Over Conditions
* **Real-Time Score:** A running scoring system increments points continuously based on the tracking distance covered by the player.
* **Collision Detection:** The script continuously audits pixel overlap bounds between the character sprite and obstacle elements.
* **Game Over:** If a collision is registered, the game loop freezes instantly and throws a **Game Over screen** displaying the final high score alongside a **Restart** button to re-initialize the stage.
* **Game Win:** Navigating cleanly through the hazards triggers a **Congratulations/Game Win screen**, unlocking passage to the next layer.


