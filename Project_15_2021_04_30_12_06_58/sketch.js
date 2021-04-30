//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife;
var knifeImage ;


function preload(){
  
  knifeImage = loadImage("knife.png");
  f1Image=loadImage("fruit1.png");
  f2Image=loadImage("fruit2.png");
  f3Image=loadImage("fruit3.png");
  f4Image=loadImage("fruit4.png");
  
  alienAnimation=loadAnimation("alien1.png","alien2.png");
  
  gameoverrImage=loadImage("gameover.png");
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  //create fruit and monster Group variable here
  fGroup=createGroup();
  mgroup=createGroup();
  gameover=createSprite(300,300);
  gameover.addImage(gameoverrImage);
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //calling fruit and monster function
    
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if knife touching fruit
   
    // Go to end state if knife touching enemy
    gameover.visible=false;
    
    Monster();
    fruits();
    if(knife.isTouching(fGroup)){
       fGroup.destroyEach()
      score=score+1;
       }
      if(knife.isTouching(mgroup)){
        gameState=END
      }
  }
  if(gameState===END){
    mgroup.destroyEach();
    fGroup.destroyEach();
    knife.destroy();
    
     gameover.visible=true;
    
    
    
  }
  
  drawSprites();
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}
function fruits(){
  if(frameCount%200===0){
    var f=createSprite(600,300);
    f.y=random(50,550);
    f.lifetime=200;
    f.velocityX=-3;
    
    var r=Math.round(random(1,4))
    switch(r){
      case 1:f.addImage(f1Image);
        break;
        case 2:f.addImage(f2Image);
        break;
        case 3:f.addImage(f3Image);
        break;
           case 4:f.addImage(f4Image);
        break;
        default:break;
           }
    f.scale=0.3;
    fGroup.add(f);
  }
}
function Monster(){
  if(frameCount%100===0){
  var alien=createSprite(600,random(0,600))
  alien.addAnimation("r",alienAnimation);
  alien.velocityX=-3;
    alien.lifetime=200;
    mgroup.add(alien);
  }
  
  
}