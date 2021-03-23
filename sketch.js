var balloon;
var balloonImage;
var backgroundImage;

//Database
var database, position, balloonPosition;

function preload(){
  balloonImage = loadAnimation('images/Hot Air Ballon-02.png','images/Hot Air Ballon-03.png','images/Hot Air Ballon-04.png');
  backgroundImage = loadImage('images/background.png');
}
function setup() {
  createCanvas(500,500);

  database = firebase.database();
  
  balloon = createSprite(250,250,0,0);
  balloon.addAnimation('Animation',balloonImage);
  balloon.scale = 0.5;

  balloonPosition = database.ref("balloon/position");
  balloonPosition.on("value", readposition, showerror);
}

function draw() {
  background(backgroundImage);  

  text("Use arrow keys to move balloon.",0,20);
  
  if(keyDown(DOWN_ARROW)){
    writePosition(0,10);
    balloon.addAnimation("balloon",balloonImage);
    balloon.y = balloon.y + 10; 
    balloon.scale = balloon.scale + 0.03
  }
  
  else if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x +10; 
  }
  
  else if(keyDown(UP_ARROW)){
    writePosition(0,-10); 
    balloon.addAnimation("balloon",balloonImage);
    balloon.y = balloon.y - 10;  
    balloon.scale = balloon.scale - 0.03
  }
  
  else if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x -10;
  }  
  drawSprites();
}

function writePosition(x,y){
  database.ref("balloon/position").set({
    'x': balloon.x + x,
    'y': balloon.y + y
  });
}

function readposition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showerror(){
  console.log("Error in writing to the database");
}


