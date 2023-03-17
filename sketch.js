var rocket, rocketImg, rocketGroup;
var meteor, meteorImg, meteorGroup;
var star, starImg, starGroup;
var space, spaceImg;
var score;
var gameState = "play";
var coincollectsound, gameoversound;
var gameover, restart;




function preload(){
   
    rocketImg = loadImage ("Rocket Img.png");
    meteorImg = loadImage ("Meteor Img.png");
    starImg = loadImage ("Star Img.png");
    spaceImg = loadImage ("Space Img.jpg");
    restartImg = loadImage("restartImg.png");
    gameoverImg = loadImage("Game Over Img.jpg");
}

function setup() {
 createCanvas(600,600);

 space = createSprite(300,300);
 space.addImage("space",spaceImg);

 rocket = createSprite (200,200);
 rocket.addImage("rocket", rocketImg);
 rocket.scale = 0.05

 restart = createSprite(275,350,75,75)
 restart.addImage("restart", restartImg );
 restart.scale=0.5
 restart.visible=false;

 gameover = createSprite(275,250,50,50);
 gameover.addImage("gameover", gameoverImg);
 gameover.visible=false
 gameover.scale=0.2


 starGroup = new Group;
 meteorGroup = new Group;
 
 score = 0
 gameState = "play";
}

function draw() {
    background(0);  
     
    
    
     if (gameState == "play"){
     space.velocityY = 1;
         // making the infinite background
    if(space.y > 400){
        space.y = 300
        }
        
        // making the rocket move
        if(keyDown("UP_ARROW")){
        rocket.y -= 5
        }
        
        if(keyDown("DOWN_ARROW")){
            rocket.y += 5
            }
        
        if(keyDown("RIGHT_ARROW")){
            rocket.x += 5
             }
        
        if(keyDown("LEFT_ARROW")){
             rocket.x -= 5
             }
        if(starGroup.isTouching(rocket)){
            starGroup.destroyEach();
            score += 1
        }
        restart.visible=false;
        gameover.visible=false;
    }
    if (meteorGroup.isTouching(rocket)){
        gameState = "end"
    }
    if(gameState =="end"){
        
        restart.visible=true;
        gameover.visible=true;
        
        // making the meteor and star immovable 
        meteorGroup.setVelocityYEach(0);
        starGroup.setVelocityYEach(0);
                
        // giving a negative lifetime so the the object is never destroyed
        meteorGroup.destroyEach();
        starGroup.destroyEach();

        //making the background stop
        space.velocityY=0

        // making the rocket immovable
        rocket.x+=0;
        rocket.y+=0
    }

    if(mousePressedOver(restart)){
        reset();
    }

    spawnStars();
    spawnMeteors();
    drawSprites();

    textSize(20);
    fill("red")
    text("Score: "+ score,30,50);
}

function spawnStars(){
    if (frameCount%250 == 0 ){
        var star = createSprite(300,-20);
        star.addImage(starImg);
        star.scale = 0.2
        starGroup.add(star)
        star.velocityY = 4
        star.lifeTime = 200
        star.x = Math.round(random(10,590))
}
}

function spawnMeteors(){
    if (frameCount%300 == 0 ){
        var meteor = createSprite(300,-20);
        meteor.addImage(meteorImg);
        meteor.scale = 0.3
        meteorGroup.add(meteor)
        meteor.velocityY = 5
        meteor.lifeTime = 150
        meteor.x = Math.round(random(10,590))
        meteor.setCollider('circle',0,0,100);
        //meteor.debug = true
    }
    }

    function reset(){
    score=0
    gameState ="play"
    }

