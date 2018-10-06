function makeQ2() {
        var game= new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser', { preload: preload, create: create, update: update});

    function preload() {
        game.load.image('arrow', "assets//arrow.png");    
        game.load.image('ball', "assets//rocket.png"); 
        game.load.image('moon', "assets//moon.png"); 
        game.load.image('background', "assets//background.png"); 
    }

    var arrow;
    var ball;
    var moon;
    var catchFlag = false;
    var launchVelocity = 0;

    function create(game) {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        // set global gravity
        game.physics.arcade.gravity.y = 200;
        game.add.tileSprite(0, 0, 800, 600, 'background');
        analog = game.add.sprite(400, 350, 'analog');

        game.physics.enable(analog, Phaser.Physics.ARCADE);

        analog.body.allowGravity = false;
        analog.width = 8;
        analog.rotation = 220;
        analog.alpha = 0;
        analog.anchor.setTo(0.5, 0.0);
        
        moon = game.add.sprite(600,100,'moon');

        arrow = game.add.sprite(400, 300, 'arrow');
        game.physics.enable(arrow, Phaser.Physics.ARCADE);
        arrow.anchor.setTo(0.1, 0.5);
        arrow.body.moves = false;
        arrow.body.allowGravity = false;
        arrow.alpha = 0;
    
        ball = game.add.sprite(130, 450, 'ball');
        //game.physics.enable(ball, Phaser.Physics.ARCADE);
        ball.anchor.setTo(0.5, 0.5);
    
        // Enable input.
        ball.inputEnabled = true;
        ball.input.start(0, true);
        ball.events.onInputDown.add(set);
        ball.events.onInputUp.add(launch);

        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.refresh();

    }

    function set(ball, pointer) {
        game.physics.enable(ball, Phaser.Physics.ARCADE);
        ball.body.collideWorldBounds = false;
        ball.body.bounce.setTo(0.9, 0.9);

        ball.body.moves = false;
        ball.body.velocity.setTo(0, 0);
        ball.body.allowGravity = false;
        catchFlag = true;
    }

    function launch() {
        catchFlag = false;
    
        ball.body.moves = true;
        arrow.alpha = 0;
        analog.alpha = 0;
        Xvector = (arrow.x - ball.x) * 1.5;
        Yvector = (arrow.y - ball.y) * 1.5;
        ball.body.allowGravity = true;  
        ball.body.velocity.setTo(Xvector, Yvector);
        ball.angle=45;

    }

    function update() {
        arrow.rotation = game.physics.arcade.angleBetween(arrow, ball);
    
        if (catchFlag == true)
        {
        //  Track the ball sprite to the mouse  
            ball.x = game.input.activePointer.worldX;   
            ball.y = game.input.activePointer.worldY;
            
            arrow.alpha = 1;    
            analog.alpha = 0.5;
            analog.rotation = arrow.rotation - 3.14 / 2;
            analog.height = game.physics.arcade.distanceToPointer(arrow);  
            launchVelocity = analog.height;

        }   
        if (moon.position.x-ball.position.x < 0 && moon.position.x-ball.position.x > -100 && moon.position.y-ball.position.y < 0 && moon.position.y-ball.position.y > -200){
         //   console.log("overlap");
            ball.body.enable = false;
            //game.world.removeAll();
        }
    }

    
}
