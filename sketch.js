var man, manImage,manSound;
var ground, groundImage1, invisibleGround;
var score = 0;
var coin, coinImage;
var cloud, cloudImage;
var powerup, powerupImage, powerupGroup;
var zombie,zombieImage1,zombieImage2,zombieGroup,stopImage,zombieSound;
var PLAY = 1;
var END = 0;
var FAST = 2;
var gameState = PLAY;
var sun,sunImage;

function preload() {
  manImage = loadAnimation("0.png", "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png", "11.png");
  groundImage1 = loadAnimation("background1.jpg");
  coinImage = loadImage("coin1.jpg");
  cloudImage = loadImage("cloud.png");
  powerupImage = loadImage("powerup.png");
  zombieImage1=loadImage("zombie.jpg");
  stopImage=loadAnimation("0.png");
  sunImage=loadImage("sun1.jpg");
  zombieSound=loadSound("zombie.mp3");
  manSound=loadSound("jump.mp3");
}

function setup() {
  man = createSprite(48, 300, 20, 20);
  man.addAnimation("run", manImage);
  man.scale = 0.065;
  ground = createSprite(180, 485, 20, 149);
  ground.addAnimation("grass", groundImage1);
  ground.velocityX = -6;
  invisibleGround = createSprite(28, 338.8, 900, 20);
  invisibleGround.velocityX = -4;
  invisibleGround.visible = false;
  coin = createSprite(600, 300, 20, 20);
  powerupGroup = new Group();
  zombieGroup=new Group();
  sun=createSprite(300,55,20,20);
  sun.addImage("red",sunImage);
  sun.scale=0.2   ;
}

function draw() {
  background("white");
  if (gameState === PLAY) {

    spawnCoins();
    spawnPowerup();
    spawnZombies();
    camera.position.x = man.x+155;
    camera.position.y = 220;
    if (keyDown("space") && man.y >= 290) {
      man.velocityY = -12;
          manSound.play();
    }
    spawnCoins();
    man.velocityY = man.velocityY + 0.8;
    if (man.isTouching(coin)) {
      coin.destroy();
      score = score + 10;
    }
    if (man.isTouching(powerupGroup)) {
      ground.velocityX = -20;
      powerupGroup.destroyEach();
      gameState = FAST;
    }
    if(man.isTouching(zombieGroup)){
      gameState=END;
      zombieSound.play();
    }
    score = score + Math.round(getFrameRate() / 60);
    if (ground.x < 170) {
      ground.x = ground.width / 2;
    }
    if (invisibleGround.x < 0) {
      invisibleGround.x = invisibleGround.width / 2;
    }
    man.collide(invisibleGround);
    spawnClouds();
    score = score + Math.round(getFrameRate() / 60);
    if (ground.x < 170) {
      ground.x = ground.width / 2;
    }
    if (invisibleGround.x < 0) {
      invisibleGround.x = invisibleGround.width / 2;
    }
    man.collide(invisibleGround);
    fill("black");
    stroke("black");
    textSize(15);
    text("Survival time: " + score, 20, 50);
  }
  if (gameState === FAST) {
    fill("red");
    stroke("red");
    text("press R to reduce your speed!!", 130, 150);
    if(man.isTouching(zombieGroup)){
      gameState=END;
    }
    if (keyDown("space") && man.y >= 290) {
      man.velocityY = -12;
    }
    spawnCoins();
    man.velocityY = man.velocityY + 0.8;
    if (ground.x < 170) {
      ground.x = ground.width / 2;
    }
    if (invisibleGround.x < 0) {
      invisibleGround.x = invisibleGround.width / 2;
    }
    man.collide(invisibleGround);
    score = score + Math.round(getFrameRate() / 60);
    fill("black");
    stroke("black");
    textSize(15);
    text("Survival time: " + score, 20, 50);
    if (keyDown("r")) {
      gameState = PLAY;
      ground.velocityX = -6;
      spawnCoins();
    }
  }
  if(gameState===END){
    ground.velocityX=0;
    coin.velocityX=0;
    score=score+0;
    zombie.velocityX=0;
    man.visible=false;
    man.velocityY=0;
    textSize(35);
    fill("red");
    stroke("red");
    text("WASTED!!",120,180);
    fill("black");
    stroke("black");
    textSize(15);
    text("Survival time: " + score, 20, 50);
    }
  
  drawSprites();
}


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600, 120, 40, 10);
    cloud.y = Math.round(random(80, 170));
    cloud.addImage(cloudImage);
    cloud.scale = 1;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    cloud.lifetime = 200;

    //adjust the depth
    cloud.depth = man.depth + 1;
  }
}

function spawnCoins() {
  if (frameCount % 60 === 0) {
    coin.addImage("coin", coinImage);
    coin.scale = 0.05;
    coin.velocityX = -(6 + score / 100);
  }
  /*switch(num){
    case 1:{
      coin.y=300;
    }
      break;
    case 2:{
      coin.y=220;
    }
      break;
      default:break;
    }*/
}

function spawnPowerup() {
  if (frameCount % 420 == 0) {
    powerup = createSprite(600, 220, 20, 20);
    powerup.addImage("speed", powerupImage);
    powerup.scale = 0.015;
    powerup.velocityX = -(6 + score / 100);
    powerupGroup.add(powerup);
  }
}
function spawnZombies() {
  if (frameCount % 140 === 0) {
    zombie=createSprite(600,300,20,20);
    zombie.addImage("brain",zombieImage1);
    zombie.scale=0.07;
    zombie.velocityX=-(6+score/100);
    zombie.depth=zombie.depth-3;
    zombieGroup.add(zombie);
  } 
}