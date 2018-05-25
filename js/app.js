// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.speed * dt;

    //Restart position when ending canvas x axis
    if (this.x > 500) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y){
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(){

};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode){
    // Movement inside canvas
    if (keyCode === 'up' && this.y > 0){
        this.y -= 83;
    }
    if (keyCode === 'left' && this.x > 0){
        this.x -= 102;
    }
    if (keyCode === 'down' && this.y < 400){
        this.y += 83;
    }
    if (keyCode === 'right' && this.x < 400){
        this.x += 102;
    }
    //Reset when colission with enemies

    ///For enemy 1
    if (Math.abs(this.x - enemy1.x) < 15 && Math.abs(this.y - enemy1.y) < 15) {
        this.x = 202;
        this.y = 405;
    }

    ///For enemy 2
    if (Math.abs(this.x - enemy2.x) < 15 && Math.abs(this.y - enemy2.y) < 15) {
        this.x = 202;
        this.y = 405;
    }

    ///For enemy 3
    if (Math.abs(this.x - enemy3.x) < 15 && Math.abs(this.y - enemy3.y) < 15) {
        this.x = 202;
        this.y = 405;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(0, 63, 100);
const enemy2 = new Enemy(0, 147, 100);
const enemy3 = new Enemy(0, 230, 100);
const allEnemies = [enemy1, enemy2, enemy3];

const player = new Player(202, 405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
