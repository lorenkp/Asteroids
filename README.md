# Asteroids

[Live!](http://lorenkp.github.io/Asteroids/)

Thar be sounds--turn up (or down) as you see fit



<img src="http://res.cloudinary.com/loren/image/upload/v1444161554/Compose_oiwkih.gif">

The trusty Asteroids game created with JavaScript and HTML5 Canvas. Uses `requestAnimationFrame()`
to render smooth 60FPS, which is more efficient than `setTimeOut()`/`setInterval()`.

*That's a GIF ... I promise the actual FPS is higher than 8*

## Controls

* Thrust: <kbd>up</kbd><br>
* Pivot ship left: <kbd>left</kbd><br>
* Pivot ship right: <kbd>right</kbd><br>
* Fire: <kbd>space</kbd><br>

## Game Features
* Spawning player/ship is invincible for 3 seconds (indicated by flashing ship)
* Three asteroid sizes: large asteroids break into two medium asteroids, which break into three small asteroids
* Distinct collision sound for each asteroid size
* Asteroid pieces split in random directions
* Asteroids have random velocity, but within tiers, e.g. largest moves slowest, etc.
* Real time score in upper right corner; smaller asteroids worth more points
* Game gets harder: game starts with four large asteroids, and each level adds two more asteroids to the mix
* Respects Newton's First Law: you best believe you're going to keep moving unless you thrust in the opposite direction


