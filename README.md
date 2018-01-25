# Banana-Uni-Xtreme

[Play here](www.michaelberman.io/Banana-Uni-Xtreme/)

![](https://i.imgur.com/lcAgEHY.png)

## Background
Banana Uni Xtreme is a game that consists of a banana living dangerously
in the jungle where hungry monkeys are lurking. You play as the banana
on a unicycle, where the objective is to avoid the monkeys to get to the
safe haven of the fruit bowl. This game was written in JavaScript and
rendered with HTML5 Canvas.

## How to play
The banana can accelerate or decelerate by pressing the right and left
arrow keys, and there is a speedometer that is shown at the bottom of
the gameplay screen. The space key is used to jump, primarily to jump
over the ground monkeys. Press r to restart the game when the game is
over or won and press q to toggle all game sounds. Lastly, press the p
key at any time during gameplay to pause the game.

## Features and Implementations
There were no external libraries used except for Canvas to render the
game board and the sprites. JavaScript was used to create the physics
features as well as the logic for the collision detections.

### Collision Detection

![](https://i.imgur.com/sa9tjcZ.png)
In order to implement collision detections, there were certain obstacles
to check for as the unicycle rides through the field. Helper methods were
utilized to have an organized structure of invoking collision detectors
for the three main detectors: ramps, monkeys and the fruit bowl.

### Acceleration and physics of the unicycle

![](https://i.imgur.com/RN3EC3E.png)
Simulation of the physics features were done by storing the velocity of
the unicycle, and utilizing that velocity to offset the game screen.
The velocity was normalized depending on the when the right or left arrow
key was being pressed, and logic was implemented to simulate gravity when
the bike is jumping.

## Future Features
* Adding a high score database to host high scores
* A more creative game won scene with bananas flying around, similar to
  solitaire
* Add different difficulties, where the variations in distances between
  all obstacles are changing, as well as the acceleration and the jumping
  ability
