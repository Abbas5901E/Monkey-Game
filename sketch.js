
var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 600); 
  
  monkey = createSprite(85, 315, 20, 20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 1200, 10);
  ground.velocityX = -4;

  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  console.log(monkey.y)
 
}


function draw() {
  
  background("white");
  
  fill("black");
  textSize(20);
  
  if (gameState === PLAY){
    
    spawnBanana();
    spawnObstacle();
    
    survivalTime = Math.ceil(frameCount/frameRate());
    text("Survival Time : " + survivalTime, 100, 50);
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if(keyDown("space")&& monkey.y >= 310) {
        monkey.velocityY = -17;
    
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(ground);
    
    if (obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
    
  } else if (gameState === END){
    
    ground.velocityX = 0;
    
    monkey.velocityY = 0;
    
    obstacleGroup.setVelocityXEach(0);
    
    foodGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    
    foodGroup.setLifetimeEach(-1);
    
    foodGroup.destroyEach();
    
    text("Survival Time : 0", 100, 50);
  }
    
    drawSprites(); 
}

function spawnBanana(){
   
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.09;
    banana.velocityX = -8;
    banana.setLifetime = 200;
    
    foodGroup.add(banana);

  }
}

function spawnObstacle(){
  
  if (frameCount % 110 === 0) {
    var obstacle = createSprite(400,316,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -6;
    obstacle.setLifetime = 200;
    
    obstacleGroup.add(obstacle);

  }
}
  


