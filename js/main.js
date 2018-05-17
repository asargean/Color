var game;
window.onload =  function() {
//Creates instance of game object and changes canvas size
game = new Phaser.Game(800, 600, Phaser.CANVAS);
game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');
}

//Declaring variables.
var MainMenu = function(game) {};
var player;
var platforms;
var helpText;
var greenGhost;
var healthBar;
var counter = 0;
var attacked;
var ver1;
var jump;
var wall;
var walk;
var hitObstacleEnemy;
var hitObstaclePlayer;
var hitPlatform;
var hitPlatformEnemy;
var wand;
var wandSound;
var oneWand = false;
var wandAttack = false;
//Decalares Mainmenu prototype
MainMenu.prototype = {
	//loads the mainmenu images
	preload: function(){
		console.log('MainMenu: preload');
	},
	//creates all of the assets
	create: function(){
		console.log("MainMenu: create'")
		//help text
		helpText = game.add.text(330, 110, 'Click spacebar to begin!', { fontSize: '16px', fill: '#EEE8AA' });

	},
	update: function() {
		//console.log("MainMenu: update");
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start('GamePlay')
		}
	}
}

//Defines actual gameplay
var GamePlay = function(game){};
//loads gameplay assets
GamePlay.prototype = {
	preload: function(){
		console.log("Gameplay: preload");
		game.load.image('greyBackground', 'assets/img/greyBackground.png');
		game.load.image('greyPlatform', 'assets/img/greyPlatform.png');
		game.load.image('obstacle1', 'assets/img/obstacle1.png');
		game.load.image('obstacle2', 'assets/img/obstacle2.png');
		game.load.image('obstacle3', 'assets/img/obstacle3.png');
		game.load.atlas('greenGhost', 'assets/img/greenGhost.png', 'assets/img/greenGhost.json');
		game.load.atlas('player', 'assets/img/player.png', 'assets/img/player.json');
		game.load.atlas('colorbar', 'assets/img/colorbar.png', 'assets/img/colorbar.json');
		game.load.atlas('wand', 'assets/img/wand.png', 'assets/img/wand.json');
		game.load.audio('ver1', 'assets/audio/Finding_Nouv_ver1.mp3');
		game.load.audio('ver2', 'assets/audio/Finding_Nouv_ver2.mp3');
		game.load.audio('walk', 'assets/audio/walk5.mp3');
		game.load.audio('wall', 'assets/audio/wall.mp3');
		game.load.audio('wandSound', 'assets/audio/wand.mp3');
	},
	//creates the assets
	create: function(){
		console.log("Gameplay: Create");
		 game.world.setBounds(0,0,20000,600);
		 //adds all audio and sound effects
		 ver1 = game.add.audio('ver1');
		 ver1.play('', 0, 0.25, true);
		 wall = game.add.audio('wall');
		 walk = game.add.audio('walk');
		 wandSound = game.add.audio('wandSound');
		 //enables physics 
		 game.physics.startSystem(Phaser.Physics.ARCADE);
		//adds color background(placeholder)
		 var greyBackground = game.add.sprite(0, 0, 'greyBackground');
		 //adds platforms to group
		 platforms = game.add.group();
		 //  enables body for that group
         platforms.enableBody = true;
    	 // creates the ground
    	 var greyPlatform = platforms.create(-60, game.world.height - 90 , 'greyPlatform');
    	 //  scales the ground so it can fit the game width
   		 // The ground doesnt fall or move when jumped on
   		 greyPlatform.body.setSize(20000, 80, 80, 80);
   		 greyPlatform.body.immovable = true;
   		 //adds obstacles to group
   		 obstacles = game.add.group();
   		 //enables body for that group
   		 obstacles.enableBody = true;
   		 //makes obstacles
   		 var obstacle1 = obstacles.create(200, game.world.height - 50, 'obstacle1');
   		 //makes obstacle immovable
   		 obstacle1.body.immovable = true;
   		 var obstacle1 = obstacles.create(300, game.world.height - 70, 'obstacle1');
   		 //makes obstacle immovable
   		 obstacle1.body.immovable = true;
   		 var obstacle1 = obstacles.create(400, game.world.height - 90, 'obstacle1');
   		 //makes obstacle immovable
   		 obstacle1.body.immovable = true;
   	     var obstacle1 = obstacles.create(500, game.world.height - 100, 'obstacle1');
   		 //makes obstacle immovable
   		 obstacle1.body.immovable = true;
   		 var obstacle1 = obstacles.create(2000, game.world.height - 60, 'obstacle1');
   		 //makes obstacle immovable
   		 obstacle1.body.immovable = true;
   		 var obstacle1 = obstacles.create(2100, game.world.height - 80, 'obstacle1');
   		 //makes obstacle immovable
   		 obstacle1.body.immovable = true;
   		  //makes obstacles
   		 var obstacle1 = obstacles.create(4000, game.world.height - 50, 'obstacle1');
   		 //makes obstacle immovable
   		 obstacle1.body.immovable = true;
   		 var obstacle1 = obstacles.create(4100, game.world.height - 70, 'obstacle1');
   		 //makes obstacle immovable
   		 obstacle1.body.immovable = true;
   		 var obstacle1 = obstacles.create(8000, game.world.height - 60, 'obstacle1');
   		 //makes obstacle immovable
   		 obstacle1.body.immovable = true;
   		 var obstacle1 = obstacles.create(8100, game.world.height - 80, 'obstacle1');
   		 //makes obstacle immovable
   		 obstacle1.body.immovable = true;
   		
   		 //helptext
   		 helpText = game.add.text(50, 50, 'Press Q to Leave', { fontSize: '16px', fill: '#EEE8AA' });
   		 //adds Health Bar
	     healthBar = game.add.sprite(9,9, 'colorbar')
		 healthBar.fixedToCamera = true;
		 //adds healthbar animations
		 healthBar.animations.add('one', Phaser.Animation.generateFrameNames('bar',1, 1, ''),30, false);
		 healthBar.animations.add('two', Phaser.Animation.generateFrameNames('bar',2, 2, ''),30, false);
		 healthBar.animations.add('three', Phaser.Animation.generateFrameNames('bar',3, 3, ''),30, false);
		 healthBar.animations.add('four', Phaser.Animation.generateFrameNames('bar',4, 4, ''),30, false);
		 healthBar.animations.add('five', Phaser.Animation.generateFrameNames('bar',5, 5, ''),30, false);
		 healthBar.animations.add('six', Phaser.Animation.generateFrameNames('bar',6, 7, ''),30, true);
		 healthBar.animations.add('seven', Phaser.Animation.generateFrameNames('bar',7, 7,''),30, false);
   		 //adds player
   		 player = new Player(game,'player');
   		 game.add.existing(player);
   		 //adds ghost to group
   		 ghost = game.add.group();
   		  //camera follows player
   		 game.camera.follow(player, null, 0.1, 0.1);
   		 //creates several ghost
		 for(var i = 0; i< 5; i++){	
   		 greenGhost = new Enemy(game,'greenGhost', '', game.rnd.integerInRange(300,1000));
   		 ghost.add(greenGhost);
   		 
   		}
   		//if player is near ghost every.5 seconds health goes down.
   		game.time.events.loop(Phaser.Timer.SECOND*.3, this.attackedCounter, this);

	},
	update: function (){
		//checks collision with platform for both enemy and player
		hitPlatform = game.physics.arcade.collide(player, platforms);
		hitPlatformEnemy = game.physics.arcade.collide(ghost, platforms);
		//checks collision between Enemy and Player
	    attacked = game.physics.arcade.collide(ghost, player);
	    //checks obstacle collision with enemy and ghost
	    hitObstacleEnemy = game.physics.arcade.collide(ghost, obstacles);
	  	//checks obstacke collision with player
	    //console.log("got here", hitObstacleEnemy);
	    hitObstaclePlayer = game.physics.arcade.collide(player, obstacles);
	    //checks overlap with player and wand, and collects wand if player overlaps
	    game.physics.arcade.overlap(player, wand, getWand, null, this);
	    function getWand(player, wand){
	    	wand.kill();
	    	wandSound.play('', 0, 0.25, false);
	    	wandAttack = true;
	    }
		//console.log("Gameplay: update");
		//console.log(hitPlatform);
		//if player presses q game over
	 	if(game.input.keyboard.isDown(Phaser.Keyboard.Q)){
			game.state.start('GameOver');
		}
		//if player reaches certain point, wand spawns.
		if(player.x > 200 && player.x < 500){
		if(!oneWand){
		this.makewand();
		wand.play('wand');
	}
}
	//debug
	},
	render: function(){
		game.debug.body(greenGhost);
		game.debug.body(player);
		game.debug.body(obstacles);

	},
	//if player is attacked deplete health
	attackedCounter: function(){
			if(attacked){
				wall.play('', 0, 0.25, false);
				counter++;
				if(counter == 1){
					//console.log("1 health")
					healthBar.animations.play("one");
				}else if(counter ==2){
					//console.log("2 health");
					healthBar.animations.play("two");		
				}else if(counter ==3){
					//console.log("3 health");
					healthBar.animations.play("three");	
				}else if(counter ==4){
					//console.log("4 health");
					healthBar.animations.play("four");	
				}else if(counter ==5){
					//console.log("5 health");
					healthBar.animations.play("five");	
				}else if(counter ==6){
					//console.log("6 health");
					healthBar.animations.play("six");	
				}else if(counter ==7){
					//console.log("7 health");
					healthBar.animations.play("seven");	
					game.state.start('GameOver');
				}
				
			}
	},
	//to prevent multiple wands being spammed
	makewand: function(){
	if(!oneWand){
		wand = game.add.sprite(200,0, 'wand');
		wand.scale.setTo(.5,.5);	
		//enables physics on player
		game.physics.arcade.enable(wand);
		//defines how much gravity and bounce player has.
		wand.body.bounce.y = 0.2;
        wand.body.gravity.y = 800;
        //enables player to collide against world
        wand.body.collideWorldBounds = true;
		//gives the player animations
		wand.animations.add('wand',[0, 1, 2],10, true);
		
	}
	oneWand = true;
	},
}

//Defines gameover function
var GameOver = function(game){};
GameOver.prototype = {
	//preloads assets
	preload: function(){
		console.log("Gameover:Preload");
		
	},
	//creates assets
	create: function(){
		console.log("Gameover: create");
		//help text
		helpText = game.add.text(320, 380, '(Press Spacebar to startover.)', { fontSize: '16px', fill: '#FF0000' });
		ver1.stop();
	},
	update: function(){
		//console.log("Gameover: Update");
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start('MainMenu');
			counter = 0;
			oneWand = false;
			wandAttack = false;
		}

	}
}

