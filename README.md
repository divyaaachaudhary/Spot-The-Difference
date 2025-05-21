# Spot-The-Difference

This is an interactive "Spot the Difference" game built using React, where players are shown two side-by-side images and must click on visual differences between them.

![Image](https://github.com/user-attachments/assets/0d24cd27-5e33-4258-b5ba-f38eb180c044)

## Key Functionalities:
1) Dynamic JSON Configuration:
Game content (image paths and difference coordinates) is fully controlled through an external JSON file. Updating levels only requires modifying this file.

2) Interactive Gameplay:
Players click on areas where they spot differences. Correct clicks are highlighted with circles, while incorrect ones show red markers.

3) Real-Time Score Tracking:
The number of found differences is tracked and displayed live.

4) Level Progression:
After completing a level, players can retry or proceed to the next level using provided buttons.

5) Timer Feature:
A timer displays how long a player takes to complete each level.

6) Sound Effects:
Correct and incorrect clicks trigger different sound effects for enhanced feedback (click sound removed as per user preference).

7) Responsive Design:
Optimized for both desktop and mobile play.

https://github.com/user-attachments/assets/5da3e547-d302-47c0-9698-900599744d1e

## Instructions to Run the Game

1. **Clone the repository:**

   ```bash
   git clone https://github.com/divyaaachaudhary/Spot-The-Difference.git
   cd Spot-The-Difference
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the game:**

   ```bash
   npm start
   ```

4. **Open your browser:**

   * The game will automatically open in your default browser, or
   * Open [http://localhost:3000](http://localhost:3000) manually to play.



##  How the Game Uses the JSON File

* The game reads a **JSON file** (e.g., `levels.json`) to load different levels dynamically.
* Each entry in the JSON file contains:

  * The **image sources** for the left and right panels.
  * The **coordinates** of the differences to check if a user has clicked in the correct spot.
  * Optional metadata like level name, difficulty, or hints.

This approach makes it easy to:

* Add new levels without modifying the main code.
* Adjust difficulty by updating just the JSON file.

