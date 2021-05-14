var PLAY=1;
var END=0;
var gameState=PLAY;
var score=0;
var trexcollided;
var gameover,gameoverimage;
var restart,restartimage;
var trexrunning,trex
var ground,groundimage
var additionalground
var cloudimage
var ob1,ob2,ob3,ob4,ob5,ob6
var obstaclegroup,cloudgroup
function preload(){
  trexrunning=loadAnimation("trex1.png","trex3.png","trex4.png")
  groundimage=loadImage("ground2.png")
  cloudimage=loadImage("cloud.png")
  ob1=loadImage("obstacle1.png")
   ob1=loadImage("obstacle1.png")
   ob2=loadImage("obstacle2.png")
   ob3=loadImage("obstacle3.png")
   ob4=loadImage("obstacle4.png")
   ob5=loadImage("obstacle5.png")
   ob6=loadImage("obstacle6.png")
  gameoverimage=loadImage("gameOver.png")
  restartimage=loadImage("restart.png")
  trexcollided=loadAnimation("trex_collided.png")
}



function setup() {
  createCanvas(600, 200);
  trex=createSprite(50,180,10,10)
  trex.addAnimation("trexrun",trexrunning)
  trex.addAnimation("collided",trexcollided)
 trex.scale=0.8
  ground=createSprite(300,190,600,5)
  ground.addImage(groundimage)
  ground.velocityX=-4
  additionalground=createSprite(300,195,600,5)
  additionalground.visible=false
  gameover=createSprite(300,100)
  gameover.addImage(gameoverimage)
  restart=createSprite(300,40)
  restart.addImage(restartimage)
  restart.visible=false;
  gameover.visible=false;
  obstaclegroup=new Group();
  cloudgroup=new Group();
}

function draw() {
  background("white");
  text("SCORE :"+score,400,40)
drawSprites();
  if (gameState==PLAY){
    score=score+Math.round(getFrameRate()/60)
  trex.collide(additionalground)
  if (ground.x<0){
      ground.x=ground.width/2
      }
    console.log(trex.y);
  createcloud();
  cactus();
  if(keyDown("space")&&trex.y>155){
    trex.velocityY=-14
  }
  trex.velocityY=trex.velocityY+0.7
    if (obstaclegroup.isTouching(trex)){
        gameState=END;
      
        }
}
  
  

else if(gameState==END){
        restart.visible=true;
        gameover.visible=true;
  ground.velocityX=0;
  trex.velocityY=0;
  obstaclegroup.setVelocityXEach(0);
   cloudgroup.setVelocityXEach(0);
  trex.changeAnimation("collided",trexcollided)
        
if(mousePressedOver(restart)){
       reset();
   }
   }
}


function createcloud(){
  if (World.frameCount%90==0){
    
      var cloud=createSprite(580,60,10,10)
      cloud.addImage(cloudimage)
      cloud.velocityX=-4
    cloud.y=Math.round(random(50,150))
    cloud.lifetime=120
    cloud.depth=trex.depth
    trex.depth=trex.depth+1
  cloudgroup.add(cloud);    
  }

}

function cactus(){
  if(World.frameCount%80==0){
     var obstacle=createSprite(580,160,10,10)
     obstacle.scale=0.7
     obstacle.velocityX=-4
    var ran=Math.round(random(1,6))
    switch(ran){
      case 1:obstacle.addImage(ob1)
        break;
        case 2:obstacle.addImage(ob2)
        break;
        case 3:obstacle.addImage(ob3)
        break;
        case 4:obstacle.addImage(ob4)
        break;
        case 5:obstacle.addImage(ob5)
        break;
        case 6:obstacle.addImage(ob6)
        break;
        default:break
    }
    obstaclegroup.add(obstacle);
    }
    
}
  
  function reset(){
    gameState=PLAY;
    gameover.visible=false;
    restart.visible=false;
    score=0;
    obstaclegroup.destroyEach();
    cloudgroup.destroyEach();
trex.changeAnimation("trexrun",trexrunning)
  }