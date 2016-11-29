var user = 0;
var userString = '';

var userInfo = {};


var game = new Phaser.Game(
    800,
    600,
    Phaser.AUTO,
    'asteroids',
    { preload: preload, create: create, update: update, render: render, init: init}
);

    function init() {

        var text = "Welcome to asteroids user !" + user;
        var style = { font: "12px Arial", fill: "#0f0", align: "center" };
        var t = game.add.text(this.world.centerX, this.world.centerY, text, style);
        t.anchor.setTo(0.5, 0.5);

    }

    function preload() {

        game.load.image('bullet', '/static/img/shmup-bullet.png');
        game.load.image('ship', '/static/img/thrust_ship.png');
        game.load.image('bot', '/static/img/thrust_ship2.png');
        game.load.image('pineapple', '/static/img/bombs.png');
        game.load.image('starfield', '/static/img/starfield.png');
        game.load.image('enemyBullets1', '/static/img/bullet111.png');
        game.load.image('enemyBullets2', '/static/img/bullet111.png');
        game.load.image('enemyBullets3', '/static/img/bullet111.png');
        game.load.image('enemyBullets4', '/static/img/bullet111.png');
        game.load.spritesheet('kaboom', '/static/img/explode.png', 128, 128);
        game.load.image('menu', '/static/img/menu-button-green.png', 393, 206);

    }

    var scoreString = '';
    var scoreText;
    var lives;
    var score = 0;
    var explosions;
    var cursors;
    var fireButton;
    var setupInvader;
    var explosions;
    var bot1;
    var bot2;
    var bot3;
    var bot4;
    var sprite;
    var bullets;
    var bulletTime = 0;
    var enemyBullets1;
    var enemyBullets2;
    var enemyBullets3;
    var enemyBullets4;
    var enemyBulletTime1 = 0;
    var enemyBulletTime2 = 0;
    var enemyBulletTime3 = 0;
    var enemyBulletTime4 = 0;
    var w = 800, h = 600;

    function create(){

        game.physics.startSystem(Phaser.Physics.ARCADE);

        //background
        starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

        //your bullets
        bullets();

        //enemy bullets
		enemybullet();

	    //you're ship
        sprite = this.add.sprite(400, 300, 'ship');
        sprite.anchor.set(0.5);
        game.physics.enable(sprite, Phaser.Physics.ARCADE);
        sprite.body.drag.set(70);
        sprite.body.maxVelocity.set(200);

        //enemy ship(s)
        bot1 = this.add.sprite(900, 700, 'bot');
        bot1.anchor.set(0.5);
        game.physics.enable(bot1, Phaser.Physics.ARCADE);
        bot1.body.drag.set(70);
        bot1.body.maxVelocity.set(200);

        bot2 = this.add.sprite(900, 700, 'bot');
        bot2.anchor.set(0.5);
        game.physics.enable(bot2, Phaser.Physics.ARCADE);
        bot2.body.drag.set(70);
        bot2.body.maxVelocity.set(200);

        bot3 = this.add.sprite(900, 700, 'bot');
        bot3.anchor.set(0.5);
        game.physics.enable(bot3, Phaser.Physics.ARCADE);
        bot3.body.drag.set(70);
        bot3.body.maxVelocity.set(200);

        bot4 = this.add.sprite(900, 700, 'bot');
        bot4.anchor.set(0.5);
        game.physics.enable(bot4, Phaser.Physics.ARCADE);
        bot4.body.drag.set(70);
        bot4.body.maxVelocity.set(200);

        //bombs
        bombs();

        //scores
        scores();

        //keyboard inputs
        cursors = this.input.keyboard.createCursorKeys();
        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

        //explosion
        explosion();

        // Create a label to use as a button
    	pause_label = game.add.text(400, 20, 'Pause', { font: '24px Arial', fill: '#0f0' });
    	pause_label.inputEnabled = true;

	    	pause_label.events.onInputUp.add(function () {
	        // When the pause button is pressed, we pause the game
	        game.paused = true;

	        // Then add the menu
	        menu = game.add.sprite(w/2, h/2, 'menu');
	        menu.anchor.setTo(0.5, 0.5);

	        // And a label to illustrate which menu item was chosen.
	        choiceLabel = game.add.text(w/2, h-150, 'Click outside menu to continue', { font: '30px Arial', fill: '#0f0' });
	        choiceLabel.anchor.setTo(0.5, 0.5);

	    	});

    	// Add a input listener that can help us return from being paused
    	game.input.onDown.add(unpause, self);

	    //method that handels the pause menu
	    function unpause(event){
	        // Only act if paused
	        if(game.paused){
	            // Calculate the corners of the menu
	            var x1 = w/2 - 393/2, x2 = w/2 + 393/2,
	                y1 = h/2 - 206/2, y2 = h/2 + 206/2;

	            // Check if the click was inside the menu
	            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){

	                // The choicemap is an array that will help us see which item was clicked
	                var choicemap = ['restart', 'leaderboard'];

	                // Get menu local coordinates for the click
	                var x = event.x - x1,
	                    y = event.y - y1;

	                // Calculate the choice 
	                var choice = Math.floor(x / 90) + 3*Math.floor(y / 90);

	                // Display the choice
	                choiceLabel.text = 'You chose menu item: ' + choicemap[choice];

	                //restart
	                if(choicemap[choice] == 'restart'){
	                	restart();
	                }

	                //leaderboard
	                if(choicemap[choice] == 'leaderboard'){
	                	/*

	                	scoreboard!!!!!!!!!!!!!!!!!!							for you to add your stuffs Mark

	                	*/
                        coolioImage();
	                }

	                //coolio image
                    /*
	                if(choicemap[choice] == 'coolioimage'){
	                	coolioImage();
	                }
                    */

	                //refreshpage
                    /*
	                if(choicemap[choice] == 'refreshpage'){
	                	refresh();
	                }
                    */

	            }
	            else{
	                // Remove the menu and the label
	                menu.destroy();
	                choiceLabel.destroy();
	                //legend1.destroy();
	                //legend2.destroy();
	                //legend3.destroy();
	                //legend4.destroy();
                    //restartText.destroy();
                    //leaderboardText.destroy();

	                // Unpause the game
	                game.paused = false;
	            }
	        }
	    };
    }

    //disply dank image
    function coolioImage(){
    	window.location.href = "https://ih1.redbubble.net/image.24694638.0052/flat,800x800,070,f.u1.jpg";
    }

    function refresh(){
    	location.reload(true);
    }

    //get score from killing enemies
    function scores(){
    	//score
        scoreString = 'Score : ';
        scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#0f0' });

        //lives
        lives = game.add.group();
        game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#0f0' });

        //text
        stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#0f0' });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;

        for (var i = 0; i < 3; i++) 
        {
            var ship = lives.create(game.world.width - 100 + (30 * i), 60, 'ship');
            ship.anchor.setTo(0.5, 0.5);
            ship.angle = 90;
            ship.alpha = 0.4;
        }
    }

    function bullets(){
        bullets = game.add.group();
	    bullets.enableBody = true;
	    bullets.physicsBodyType = Phaser.Physics.ARCADE;
	    bullets.createMultiple(30, 'bullet');
	    bullets.setAll('anchor.x', 0.5);
	    bullets.setAll('anchor.y', 1);
	    bullets.setAll('outOfBoundsKill', true);
	    bullets.setAll('checkWorldBounds', true); 
	}

    //create enemy bullets
    function enemybullet(){
    	enemyBullets1 = game.add.group();
	    enemyBullets1.enableBody = true;
	    enemyBullets1.physicsBodyType = Phaser.Physics.ARCADE;
	    enemyBullets1.createMultiple(30, 'enemyBullets1');
	    enemyBullets1.setAll('anchor.x', 0.5);
	    enemyBullets1.setAll('anchor.y', 1);
	    enemyBullets1.setAll('outOfBoundsKill', true);
	    enemyBullets1.setAll('checkWorldBounds', true);

    	enemyBullets2 = game.add.group();
	    enemyBullets2.enableBody = true;
	    enemyBullets2.physicsBodyType = Phaser.Physics.ARCADE;
	    enemyBullets2.createMultiple(30, 'enemyBullets2');
	    enemyBullets2.setAll('anchor.x', 0.5);
	    enemyBullets2.setAll('anchor.y', 1);
	    enemyBullets2.setAll('outOfBoundsKill', true);
	    enemyBullets2.setAll('checkWorldBounds', true);

    	enemyBullets3 = game.add.group();
	    enemyBullets3.enableBody = true;
	    enemyBullets3.physicsBodyType = Phaser.Physics.ARCADE;
	    enemyBullets3.createMultiple(30, 'enemyBullets3');
	    enemyBullets3.setAll('anchor.x', 0.5);
	    enemyBullets3.setAll('anchor.y', 1);
	    enemyBullets3.setAll('outOfBoundsKill', true);
	    enemyBullets3.setAll('checkWorldBounds', true);

    	enemyBullets4 = game.add.group();
	    enemyBullets4.enableBody = true;
	    enemyBullets4.physicsBodyType = Phaser.Physics.ARCADE;
	    enemyBullets4.createMultiple(30, 'enemyBullets4');
	    enemyBullets4.setAll('anchor.x', 0.5);
	    enemyBullets4.setAll('anchor.y', 1);
	    enemyBullets4.setAll('outOfBoundsKill', true);
	    enemyBullets4.setAll('checkWorldBounds', true);

    }

    //explosion stuff
    function explosion(){
    	explosions = game.add.group();
        explosions.createMultiple(30, 'kaboom');
        explosions.forEach(setupInvader, this);
    }

    function setupInvader (invader) {

        invader.anchor.x = 0.5;
        invader.anchor.y = 0.5;
        invader.animations.add('kaboom');
    }
    //end of explosion stuff

    //create bombs
    function bombs(){
    	pineapples = game.add.group();
        pineapples.enableBody = true;
        pineapples.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i = 0; i < 10; i++)
        {
            var pineapple = pineapples.create(200 + i * 48,50, 'pineapple');

            //This allows your sprite to collide with the world bounds like they were rigid objects
            pineapple.body.collideWorldBounds=true;
            pineapple.body.gravity.x = game.rnd.integerInRange(-50, 50);
            pineapple.body.gravity.y = 100 + Math.random() * 100;
            pineapple.body.bounce.setTo(1.1, 1.1);
        } 
    }

    function update(){

    	//start of player movement 
    	if (cursors.up.isDown)
        {
            game.physics.arcade.accelerationFromRotation(sprite.rotation, 300, sprite.body.acceleration);
        }
        else
        {
            sprite.body.acceleration.set(0);
        }
        if (cursors.left.isDown)
        {
            sprite.body.angularVelocity = -300;
        }
        else if (cursors.right.isDown)
        {
            sprite.body.angularVelocity = 300;
        }
        else
        {
            sprite.body.angularVelocity = 0;
        }

        //enables friendly firing if buttons pressed
     	if (fireButton.isDown)
        {
            fireBullet();
        }

        //enables bots firing
        if (bot1)
        {
            fireEnemyBullet1();
        }

        if (bot2)
        {
        	fireEnemyBullet2();
        }

        if (bot3)
        {
        	fireEnemyBullet3();
        }

        if (bot4)
        {
        	fireEnemyBullet4();
        }

       	game.world.wrap(sprite, 16);
        //end of player movement 

        //rotation of enemy bots around center point
        bot1.position.rotate(400, 300, 2, true, 100);
        bot2.position.rotate(400, 300, 2, true, 175);
        bot3.position.rotate(400, 300, 1.5, true, 250);
        bot4.position.rotate(400, 300, 1, true, 325);

        //collision handler
        game.physics.arcade.collide(sprite, pineapples, playerHitByBombs, null, this);
        game.physics.arcade.collide(pineapples, bullets, bombsHitByPlayer, null, this);
        game.physics.arcade.collide(sprite, enemyBullets1, playerHitByBullets1, null, this);
        game.physics.arcade.collide(sprite, enemyBullets2, playerHitByBullets2, null, this);
        game.physics.arcade.collide(sprite, enemyBullets3, playerHitByBullets3, null, this);
        game.physics.arcade.collide(sprite, enemyBullets4, playerHitByBullets4, null, this);
        game.physics.arcade.collide(bot1, bullets, bot1HitByPlayer, null, this);
        game.physics.arcade.collide(bot2, bullets, bot2HitByPlayer, null, this);
		game.physics.arcade.collide(bot3, bullets, bot3HitByPlayer, null, this);
		game.physics.arcade.collide(bot4, bullets, bot4HitByPlayer, null, this);
    }

    function playerHitByBombs(player, bullet){
        
        bullet.kill();

        live = lives.getFirstAlive();

        if (live)
        {
            live.kill();
        }

        //  And create an explosion :)
        var explosion = explosions.getFirstExists(false);
        explosion.reset(sprite.body.x, sprite.body.y);
        explosion.play('kaboom', 30, false, true);

        // When the player dies
        if (lives.countLiving() < 1)
        {
            player.kill();
            pineapples.callAll('kill');

            stateText.text=" GAME OVER \n" + "   Astronaut " + user + "\nClick to restart";
            stateText.visible = true;

            //the "click to restart" handler
            game.input.onTap.addOnce(restart,this);
        }    	
    }


    function playerHitByBullets1(player, bullet){
        
        bullet.kill();

        live = lives.getFirstAlive();

        if (live)
        {
            live.kill();
        }

        //  And create an explosion :)
        var explosion = explosions.getFirstExists(false);
        explosion.reset(sprite.body.x, sprite.body.y);
        explosion.play('kaboom', 30, false, true);

        // When the player dies
        if (lives.countLiving() < 1)
        {
            player.kill();
            enemyBullets1.callAll('kill');

            stateText.text=" GAME OVER \n" + "   Astronaut " + user + "\nClick to restart";
            stateText.visible = true;

            //the "click to restart" handler
            game.input.onTap.addOnce(restart,this);
        }    	
    }

    function playerHitByBullets2(player, bullet){
        
        bullet.kill();

        live = lives.getFirstAlive();

        if (live)
        {
            live.kill();
        }

        //  And create an explosion :)
        var explosion = explosions.getFirstExists(false);
        explosion.reset(sprite.body.x, sprite.body.y);
        explosion.play('kaboom', 30, false, true);

        // When the player dies
        if (lives.countLiving() < 1)
        {
            player.kill();
            enemyBullets2.callAll('kill');

            stateText.text=" GAME OVER \n" + "   Astronaut " + user + "\nClick to restart";
            stateText.visible = true;

            //the "click to restart" handler
            game.input.onTap.addOnce(restart,this);
        }    	
    }

    function playerHitByBullets3(player, bullet){
        
        bullet.kill();

        live = lives.getFirstAlive();

        if (live)
        {
            live.kill();
        }

        //  And create an explosion :)
        var explosion = explosions.getFirstExists(false);
        explosion.reset(sprite.body.x, sprite.body.y);
        explosion.play('kaboom', 30, false, true);

        // When the player dies
        if (lives.countLiving() < 1)
        {
            player.kill();
            enemyBullets3.callAll('kill');

            stateText.text=" GAME OVER \n" + "   Astronaut " + user + "\nClick to restart";
            stateText.visible = true;

            //the "click to restart" handler
            game.input.onTap.addOnce(restart,this);
        }    	
    }

    function playerHitByBullets4(player, bullet){
        
        bullet.kill();

        live = lives.getFirstAlive();

        if (live)
        {
            live.kill();
        }

        //  And create an explosion :)
        var explosion = explosions.getFirstExists(false);
        explosion.reset(sprite.body.x, sprite.body.y);
        explosion.play('kaboom', 30, false, true);

        // When the player dies
        if (lives.countLiving() < 1)
        {
            player.kill();
            enemyBullets4.callAll('kill');

            stateText.text=" GAME OVER \n" + "   Astronaut " + user + "\nClick to restart";
            stateText.visible = true;

            //the "click to restart" handler
            game.input.onTap.addOnce(restart,this);
        }    	
    }

    function bot1HitByPlayer(bot, bullet){

    	bot.kill();
    	bullet.kill();
    	enemyBullets1.removeAll();

    	//  Increase the score
	    score += 20;
	    scoreText.text = scoreString + score;

	    //  And create an explosion :)
	    var explosion = explosions.getFirstExists(false);
	    explosion.reset(bot.body.x, bot.body.y);
	    explosion.play('kaboom', 30, false, true);

	    if (pineapples.countLiving() == 0 && bot1.alive == 0 && bot2.alive == 0 && bot3.alive == 0 && bot4.alive == 0)
	    {
	        score += 1000;
	        scoreText.text = scoreString + score;

	        stateText.text = " You Won, \n Click to restart";
	        stateText.visible = true;

	        //the "click to restart" handler
	        game.input.onTap.addOnce(reset,this);
	    }
    }

    function bot2HitByPlayer(bot, bullet){

    	bot.kill();
    	bullet.kill();
    	enemyBullets2.removeAll();

    	//  Increase the score
	    score += 20;
	    scoreText.text = scoreString + score;

	    //  And create an explosion :)
	    var explosion = explosions.getFirstExists(false);
	    explosion.reset(bot.body.x, bot.body.y);
	    explosion.play('kaboom', 30, false, true);

	    if (pineapples.countLiving() == 0 && bot1.alive == 0 && bot2.alive == 0 && bot3.alive == 0 && bot4.alive == 0)
	    {
	        score += 1000;
	        scoreText.text = scoreString + score;

	        stateText.text = " You Won, \n Click to restart";
	        stateText.visible = true;

	        //the "click to restart" handler
	        game.input.onTap.addOnce(reset,this);
	    }
    }

    function bot3HitByPlayer(bot, bullet){

    	bot.kill();
    	bullet.kill();
    	enemyBullets3.removeAll();

    	//  Increase the score
	    score += 20;
	    scoreText.text = scoreString + score;

	    //  And create an explosion :)
	    var explosion = explosions.getFirstExists(false);
	    explosion.reset(bot.body.x, bot.body.y);
	    explosion.play('kaboom', 30, false, true);

	    if (pineapples.countLiving() == 0 && bot1.alive == 0 && bot2.alive == 0 && bot3.alive == 0 && bot4.alive == 0)
	    {
	        score += 1000;
	        scoreText.text = scoreString + score;

	        stateText.text = " You Won, \n Click to restart";
	        stateText.visible = true;

	        //the "click to restart" handler
	        game.input.onTap.addOnce(reset,this);
	    }
    }

    function bot4HitByPlayer(bot, bullet){

    	bot.kill();
    	bullet.kill();
    	enemyBullets4.removeAll();

    	//  Increase the score
	    score += 20;
	    scoreText.text = scoreString + score;

	    //  And create an explosion :)
	    var explosion = explosions.getFirstExists(false);
	    explosion.reset(bot.body.x, bot.body.y);
	    explosion.play('kaboom', 30, false, true);

	    if (pineapples.countLiving() == 0 && bot1.alive == 0 && bot2.alive == 0 && bot3.alive == 0 && bot4.alive == 0)
	    {
	        score += 1000;
	        scoreText.text = scoreString + score;

	        stateText.text = " You Won, \n Click to restart";
	        stateText.visible = true;

	        //the "click to restart" handler
	        game.input.onTap.addOnce(reset,this);
	    }
    }


    function bombsHitByPlayer(bombs, bullet){

    	bombs.kill();
    	bullet.kill();

    	//  Increase the score
	    score += 20;
	    scoreText.text = scoreString + score;

	    //  And create an explosion :)
	    var explosion = explosions.getFirstExists(false);
	    explosion.reset(bombs.body.x, bombs.body.y);
	    explosion.play('kaboom', 30, false, true);

	    if (pineapples.countLiving() == 0 && bot1.alive == 0 && bot2.alive == 0 && bot3.alive == 0 && bot4.alive == 0)
	    {
	        score += 1000;
	        scoreText.text = scoreString + score;

	        stateText.text = " You Won, \n Click to restart";
	        stateText.visible = true;

	        //the "click to restart" handler
	        game.input.onTap.addOnce(reset,this);
	    }
    }

    function restart () {
        //  A new level starts
        
        //resets the life count
        lives.callAll('revive');

        //  And brings the aliens back from the dead :)
        pineapples.removeAll();
        bombs();

        //reset score
	    score = 0;
	    scoreText.text = scoreString + score;

        //remove all bullets
        enemyBullets1.removeAll();
        enemyBullets2.removeAll();
        enemyBullets3.removeAll();
        enemyBullets4.removeAll();

        //revives the player
        sprite.reset(400, 300);
        bot1.revive();
        bot1.reset(800, 600);
        bot2.revive();
        bot2.reset(800, 600);
        bot3.revive();
        bot3.reset(800, 600);
        bot4.revive();
        bot4.reset(800, 600);
        
        //bring back enemy bullets
        enemybullet();

        //hides the text
        stateText.visible = false;
    }

    function reset () {
        //  A new level starts
        
        //resets the life count
        lives.callAll('revive');

        //  And brings the aliens back from the dead :)
        pineapples.removeAll();
        bombs();

        //reset score
	    score = 0;
	    scoreText.text = scoreString + score;

        //remove all bullets
        enemyBullets1.removeAll();
        enemyBullets2.removeAll();
        enemyBullets3.removeAll();
        enemyBullets4.removeAll();

        //revives the player
        sprite.reset(400, 300);
        bot1.revive();
        bot1.reset(800, 600);
        bot2.revive();
        bot2.reset(800, 600);
        bot3.revive();
        bot3.reset(800, 600);
        bot4.revive();
        bot4.reset(800, 600);
        
        //bring back enemy bullets
		enemybullet();

        //hides the text
        stateText.visible = false;
    }

    //you firing bullets
	function fireBullet () {
		var BULLET_SPEED = 400;
	    //  To avoid them being allowed to fire too fast we set a time limit
	    if (game.time.now > bulletTime)
	    {
	        //  Grab the first bullet we can from the pool
	        bullet = bullets.getFirstExists(false);

	        if (bullet)
	        {
	            //  And fire it
	            bullet.reset(sprite.x, sprite.y);
	            bullet.body.velocity.y = -400;
	            bulletTime = game.time.now + 400;
	            //Make bullet come out of tip of ship with right angle
		        bullet.reset(sprite.x, sprite.y);
		        bullet.angle = sprite.angle;
		        game.physics.arcade.velocityFromAngle(bullet.angle, BULLET_SPEED, bullet.body.velocity);
		        bullet.body.velocity.x += sprite.body.velocity.x;
	        }
	    }
	}

	//bots firing bullets
	function fireEnemyBullet1 () {
		var BULLET_SPEED = 100;
	    //  To avoid them being allowed to fire too fast we set a time limit
	    if (game.time.now > enemyBulletTime1)
	    {
	        //  Grab the first bullet we can from the pool
	        bullet = enemyBullets1.getFirstExists(false);

	        if (bullet)
	        {
	            //  And fire it
	            //bullet.delay = 1000;
	            bullet.reset(bot1.x, bot1.y);
	            bullet.body.velocity.y = -100;
	            enemyBulletTime1 = game.time.now + 1000;
	            //  Make bullet come out of tip of ship with right angle
		        bullet.reset(bot1.x, bot1.y);
		        bullet.angle = bot1.angle;
		        game.physics.arcade.velocityFromAngle(bullet.angle - 90, BULLET_SPEED, bullet.body.velocity);
		        bullet.body.velocity.x += bot1.body.velocity.x;
		        var angle = game.physics.arcade.moveToObject(bullet, sprite, BULLET_SPEED);
	        }
	    }
	}

	function fireEnemyBullet2 () {
		var BULLET_SPEED = 100;
	    //  To avoid them being allowed to fire too fast we set a time limit
	    if (game.time.now > enemyBulletTime2)
	    {
	        //  Grab the first bullet we can from the pool
	        bullet = enemyBullets2.getFirstExists(false);

	        if (bullet)
	        {
	            //  And fire it
	            bullet.reset(bot2.x, bot2.y);
	            bullet.body.velocity.y = -100;
	            enemyBulletTime2 = game.time.now + 1000;
	            //  Make bullet come out of tip of ship with right angle
		        bullet.reset(bot2.x, bot2.y);
		        bullet.angle = bot2.angle;
		        game.physics.arcade.velocityFromAngle(bullet.angle, BULLET_SPEED, bullet.body.velocity);
		        bullet.body.velocity.x += bot2.body.velocity.x;
		        var angle = game.physics.arcade.moveToObject(bullet, sprite, BULLET_SPEED);
	        }
	    }
	}

	function fireEnemyBullet3 () {
		var BULLET_SPEED = 100;
	    //  To avoid them being allowed to fire too fast we set a time limit
	    if (game.time.now > enemyBulletTime3)
	    {
	        //  Grab the first bullet we can from the pool
	        bullet = enemyBullets3.getFirstExists(false);

	        if (bullet)
	        {
	            //  And fire it
	            bullet.reset(bot3.x, bot3.y);
	            bullet.body.velocity.y = -100;
	            enemyBulletTime3 = game.time.now + 1000;
	            //  Make bullet come out of tip of ship with right angle
		        bullet.reset(bot3.x, bot3.y);
		        bullet.angle = bot3.angle;
		        game.physics.arcade.velocityFromAngle(bullet.angle, BULLET_SPEED, bullet.body.velocity);
		        bullet.body.velocity.x += bot3.body.velocity.x;
		        var angle = game.physics.arcade.moveToObject(bullet, sprite, BULLET_SPEED);
	        }
	    }
	}

	function fireEnemyBullet4 () {
		var BULLET_SPEED = 100;
	    //  To avoid them being allowed to fire too fast we set a time limit
	    if (game.time.now > enemyBulletTime4)
	    {
	        //  Grab the first bullet we can from the pool
	        bullet = enemyBullets4.getFirstExists(false);

	        if (bullet)
	        {
	            //  And fire it
	            bullet.reset(bot4.x, bot4.y);
	            bullet.body.velocity.y = -100;
	            enemyBulletTime4 = game.time.now + 1000;
	            //  Make bullet come out of tip of ship with right angle
		        bullet.reset(bot4.x, bot4.y);
		        bullet.angle = bot4.angle;
		        game.physics.arcade.velocityFromAngle(bullet.angle, BULLET_SPEED, bullet.body.velocity);
		        bullet.body.velocity.x += bot4.body.velocity.x;
		        var angle = game.physics.arcade.moveToObject(bullet, sprite, BULLET_SPEED);
	        }
	    }
	}

    function render(){

    }


function getTopScores () {
    var msg = {id : 0}
    socket.emit('gettopscores', msg);
    // scoreText.text = scoreString + score;
    // background.visible =! background.visible;

}

socket.on('inituserinfo', function(msg){
   userInfo = msg;
   user = msg.user_number;
//    userText.text = userString + userInfo.user_count;
});

socket.on('gettopscores', function(msg){
//    userTExt.text = scoreString + score;
});