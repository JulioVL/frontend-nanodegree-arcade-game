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
    this.x = this.x + this.speed * dt;

    //Restart position when ending canvas x axis
    if (this.x > 500) {
        this.x = -40;
        this.speed = 100 + Math.floor(Math.random()*200);
    }

    //Check colissions
    if (Math.abs(this.x - player.x) < 50 && Math.abs(this.y - player.y) < 50) {
        player.x = 202;
        player.y = 405;
        player.playerScore = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Gems our player must obtain
var Gem = function(y, color) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.gemColor = 'images/Gem '+color+'.png';
    //Code from: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    const gemX = Math.floor(Math.random() * 5);
    switch (gemX) {
        case 0:
            this.x = -2;
            break;
        case 1:
            this.x = 100;
            break;
        case 2:
            this.x = 202;
            break;
        case 3:
            this.x = 304;
            break;
        case 4:
            this.x = 406;
            break;
    }
    this.y = y;
};

// Update the gem's position, required method for game
// Parameter: dt, a time delta between ticks
Gem.prototype.update = function(dt) {
    //Check colissions
    if (Math.abs(this.x - player.x) < 50 && Math.abs(this.y - player.y) < 50) {
        this.x = 1000;
        this.y = 1000;
        player.playerScore += 50;
    }
};

// Draw the gem on the screen, required method for game
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.gemColor), this.x, this.y, 100, 130);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y){
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.playerScore = 0;
};

Player.prototype.update = function(){

};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillStyle = "white";
    ctx.font = "20px hoge, impact";
    ctx.fillText("Score: " + player.playerScore, 40, 90);
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
    //Execute reachWater when y position = -10
    if (this.y === -10) {
        this.reachWater();
    }
};

Player.prototype.reachWater = function(){
    this.playerScore += 10;
    this.x = 202;
    this.y = 405;
};

Player.prototype.win = function(){
    if (this.playerScore >= 200) {
        ctx.fillStyle = 'black';
        //ctx.fillRect(135,210, 250, 150);
        ctx.fillRect(0,210, 520, 150);
        ctx.fillStyle = "white";
        ctx.font = "50px hoge, impact";
        ctx.fillText("YOU WON!!", 160, 300);
    }    
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const enemy1 = new Enemy(0, 63, 1200);
const enemy2 = new Enemy(0, 147, 1200);
const enemy3 = new Enemy(0, 230, 1200);
const allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
const player = new Player(202, 405);

// Place the gem object in a variable called player
const gem1 = new Gem(73,'Blue');
const gem2 = new Gem(156,'Green');
const gem3 = new Gem(239, 'Orange');

const allGems = [gem1, gem2, gem3];

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
