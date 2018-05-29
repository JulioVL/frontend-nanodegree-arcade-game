// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    //Restart enemies position when reaching the end of the canvas
    if (this.x > 500) {
        this.x = -40;
        this.speed = 100 + Math.floor(Math.random()*200);
    }

    //Check colissions with player
    if (Math.abs(this.x - player.x) < 50 && Math.abs(this.y - player.y) < 50) {
        player.x = 202;
        player.y = 405;
        player.playerScore = 0;
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Gems our player must obtain to get more points
var Gem = function(y, color) {
    this.gemColor = 'images/Gem '+color+'.png';
    //Code from: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    const gemX = Math.floor(Math.random() * 5);
    //The gem has only 5 possible options for locations
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
    //save the original y value for reset
    this.originY = y;
    this.y = y;
};

// Update the gem's position
Gem.prototype.update = function(dt) {
    //Check colissions: put the gem out of canvas
    if (Math.abs(this.x - player.x) < 50 && Math.abs(this.y - player.y) < 50) {
        this.x = 1000;
        this.y = 1000;
        player.playerScore += 50;
    }
};

// Draw the gem on the screen
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.gemColor), this.x, this.y, 100, 130);
};

//Reset game for Gems
Gem.prototype.reset = function(){
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
    this.y = this.originY;;
}


// Player class
var Player = function(x,y){
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.playerScore = 0;
    this.pause = false;
};

Player.prototype.update = function(){

};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //Set player score
    ctx.fillStyle = "white";
    ctx.font = "20px hoge, impact";
    ctx.fillText("Score: " + this.playerScore, 40, 90);
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

//when score reaches 200 points, show message and pause the game
Player.prototype.win = function(){
    if (this.playerScore >= 200) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0,210, 520, 150);
        ctx.fillStyle = "white";
        ctx.font = "50px hoge, impact";
        ctx.fillText("YOU WON!!", 160, 300);
        this.pause = true;
    }    
}

Player.prototype.reset = function(){
    this.x = 202;
    this.y = 405;
    this.playerScore = 0;
}

//Instantiate all objects
// Place all enemy objects in an array called allEnemies
const enemy1 = new Enemy(0, 63, 1200);
const enemy2 = new Enemy(0, 147, 1200);
const enemy3 = new Enemy(0, 230, 1200);
const allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
const player = new Player(202, 405);

// Place all gem objects in an array called allGems
const gem1 = new Gem(73,'Blue');
const gem2 = new Gem(156,'Green');
const gem3 = new Gem(239, 'Orange');

const allGems = [gem1, gem2, gem3];

// This listens for key presses and sends the keys to the
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    //This prevents the user to move the player when winning the game
    if (!player.pause) {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});
