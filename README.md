# Dirt-Bike-Xtreme

## MVP & Features 
A game based on riding on a motor bike, where the goal is to get through every obstacle as fast as possible.
* Controls:
    * Up/Down arrows for gas/brake
    * Left/Right arrows to balance the dirt bike
    * Spacebar to start the game
    * P to pause the game during gameplay
* Background changes randomly every few levels (or a specific time period)
* Links to github repo, LinkedIn and portfolio website
* Obstacles consisting of shapes that the user will need to get over
* Bike is able to lean left and right depending on whether the user presses the left or right arroy key
* A modal that pops up for instructions
* A production README

## Technologies, Libraries, APIs
* Canvas to draw obstacles and ground on the screen
* Crafty.JS to work with Canvas and for collision detection on the obstacles
* Matter.js for the physics engine to have gravity in the game
* Vanilla JS for game logic and rendering instruction modal
* OR Melon.js for physics and collision detection

## Wireframe

![](https://i.imgur.com/6bDQ1P7.png)

## Backend
No backend is needed for this project

## Implementation Timeline
Day 1:
* Setup up environment
* Get accustomed to libraries
* Have an overall structure organized 

Day 2:
* Create background and figure out how to render each object on the game window
* Have a module for the bike, and have it go forward and back
* Design logic for gravity

Day 3:
* Render obstacles on the game window
* Design collision detection for a bounce off effect

Day 4:
* Create instructions modal
* Style nice looking format
