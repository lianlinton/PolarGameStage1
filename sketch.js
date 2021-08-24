var waitImage, backgroundImage, helpPage;
var startButtonImage, helpButtonImage, exitButtonImage, titleImage;
var bg, startButton, helpButton, exitButton, title;
var gameState = "START";

var bear, bearWalkImage;
var obstacle, penguinImage, sealImage;
var Group;
var obstaclesGroup;
var ground, score, didLose;

function preload(){
  waitImage = loadImage("wait.png");
  backgroundImage = loadImage("background.jpeg");
  startButtonImage = loadImage("playButton.png");
  helpButtonImage = loadImage("helpButton.png");
  exitButtonImage = loadImage("exitButton.png");
  titleImage = loadImage("gameTitle.png");
  helpPage = loadImage("helpBackground.png");
  bearWalkImage = loadImage("bear.gif");
  penguinImage = loadImage("penguin.gif");
  sealImage = loadImage("seal.gif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bg = createSprite(windowWidth/2, windowHeight/2);
  bg.addImage(waitImage);
  bg.scale = 4.95;

  startButton = createSprite(windowWidth/2,  windowHeight - 125);
  startButton.addImage(startButtonImage);
  startButton.scale = 1;

  helpButton = createSprite(windowWidth/2 - windowHeight/2, windowHeight - 125);
  helpButton.addImage(helpButtonImage);
  helpButton.scale = 1;

  exitButton = createSprite(windowWidth/2 + windowHeight/2,  windowHeight - 125);
  exitButton.addImage(exitButtonImage);
  exitButton.scale = 1;

  title = createSprite(windowWidth/2, windowHeight/6);
  title.addImage(titleImage);
  title.scale = 0.5;

  bear = createSprite(200, windowHeight - 300);
  bear.addImage(bearWalkImage);
  bear.scale = 1.75;
  bear.visible = false;
  bear.debug=true
  bear.setCollider("rectangle",0,50,150,80)

  /*ground = createSprite(windowWidth/2, windowHeight/2, windowWidth,20);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;*/

  obstaclesGroup = new Group();
  score = 0;
}

function draw() {
  background(173, 216, 230);
  if (gameState == "PLAY"){
    text 
    score = Math.round(frameCount/4);

    if(bg.x<windowWidth/2 - 200){
      bg.x=windowWidth/2;
    }
    console.log(bg.x);

    if(keyDown("up") ) {
      bear.y = bear.y - 10;
    }

    if(keyDown("down") ) {
      bear.y = bear.y + 10;
    }

    if (bear.y > windowHeight){
      bear.y = windowHeight - 300;
    }
    
    spawnObstacles();

    if (score > 200 || bear.isTouching(obstaclesGroup)){
      //didLose = bear.isTouching(obstaclesGroup);
      obstaclesGroup.setVelocityXEach(0);
      //count = true;
      obstaclesGroup.destroyEach()
      bg.velocityX = 0;
      bear.velocityX = 0;
      gamestate = "END";
    }

  }
  /*if (gameState === "END"){
    obstaclesGroup.setVelocityXEach(0);
   //count = true;
    obstaclesGroup.destroyEach()
    
    bg.velocityX = 0;
    bear.velocityX = 0;
    //bear.addImage("player_stop", player_stopping)
    //if (did)
  }*/
  if (mousePressedOver(startButton)){
    bear.visible = true;
    if (gameState === "START"){
      startButton.scale = 0.75;
      helpButton.scale = 0.75;
      exitButton.scale = 0.75;
      startButton.y = windowHeight -75;
      helpButton.y = windowHeight -75;
      exitButton.y = windowHeight -75;
      bg.addImage(backgroundImage);
      bg.scale = 1.5;
      title.visible = false;
      bg.x=windowWidth/2;
      bg.velocityX=-4;
      gameState = "PLAY";
      score = 0;
      obstaclesGroup = new Group();

    } 
  } else if (mousePressedOver(helpButton)){
    startButton.scale = 1;
    helpButton.scale = 1;
    exitButton.scale = 1;
    bear.visible = false;
    bg.velocityX = 0;
    startButton.y = windowHeight - 125;
    helpButton.y = windowHeight - 125;
    exitButton.y = windowHeight - 125;
    bg.addImage(helpPage);
    bg.x = windowWidth/2;
    bg.y = windowHeight/2;
    title.visible = false;
    gameState = "HELP";
    bg.scale = 1.1;

  } else if (mousePressedOver(exitButton)){
    startButton.scale = 1;
    helpButton.scale = 1;
    exitButton.scale = 1;
    bear.visible = false;
    title.visible = true;
    startButton.y = windowHeight - 125;
    helpButton.y = windowHeight - 125;
    exitButton.y = windowHeight - 125;
    bg.velocityX = 0;
    bear.velocityX = 0;
    bg.addImage(waitImage);
    gameState = "START";
    bg.scale=5;
    obstaclesGroup.setVelocityXEach(0);
  }
  drawSprites();

  if (gameState === "PLAY"){
    textSize(40);
    stroke("blue");
    fill("blue");
    text("Score: "+ score, windowWidth - 300, 100);
  }
}

function spawnObstacles() {
  if(frameCount % 180 === 0) {
    var obstacle = createSprite(windowWidth + 200, windowHeight - 300,10,40);
    obstacle.scale = 0.2;
    obstacle.debug=true
    obstacle.y=Math.round(random((windowHeight-windowHeight/3),windowHeight-100))
    //obstacle.setCollider("rectangle",0,0,400,440)  
    obstacle.velocityX = -8;
    obstacle.visible = true;
    
    var rand = Math.round(random(1,2));
    //obstacle.y = obstacle.y+ (rand*15);
    switch(rand) {
      case 1: obstacle.addImage(sealImage);
              obstacle.scale = 0.5;
              obstacle.setCollider("rectangle",0,0,400,100)  
              break;
      case 2: obstacle.addImage(penguinImage);
              obstacle.scale = 0.4;
              obstacle.setCollider("rectangle",0,0,400,440)  
              break;
      default: break;
    }
     
    obstacle.lifetime = windowWidth/obstacle.x;
     
    obstaclesGroup.add(obstacle);
  }
}
