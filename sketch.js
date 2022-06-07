var vidaimg, vidas = [] , vida 
var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var PLAY=1;
var END=0;
var gameState=1;
var pocaimg, pocagrup, poca;
var diamanteimg, diamante;
var v = 10
function preload(){
  vidaimg = loadImage("coração.png")
  pocaimg = loadImage("poca.png")
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("fimdeJogo.png");
  diamanteimg = loadImage("diamante.png")
}

function setup(){
  
//crie uma tela

 createCanvas(windowWidth,windowHeight);



path = createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;

diamante = createSprite(width/2,-height*20)
diamante.addImage(diamanteimg)

for(var i = 0; i < 3; i++){
 vida = createSprite(50+i*75, 40);
 vida.addImage(vidaimg);
 vida.scale=0.08;
 vidas.push(vida)
}

boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;

cashG=new Group();
pocagrup=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}



function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
 if(boy.isTouching(diamante)){
   venceu()
 }

  edges= createEdgeSprites();
  boy.collide(edges);
  

   if(path.y > height ){
     path.y = height/2;
   }
    createpoca()
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    diamante.velocityY = v
    path.velocityY = v

    if (pocagrup.isTouching(boy)){
      v = 5
      pocagrup.destroyEach();
      vidas[vidas.length -1].destroy()
      vidas.pop()
      pocagrup.setVelocityYEach(v);
      cashG.setVelocityYEach(v);
      diamondsG.setVelocityYEach(v);
      jwelleryG.setVelocityYEach(v);
      swordGroup.setVelocityYEach(v);
    }

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection + 50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection + 100;
      v*=2
      pocagrup.setVelocityYEach(v);
      cashG.setVelocityYEach(v);
      diamondsG.setVelocityYEach(v);
      jwelleryG.setVelocityYEach(v);
      swordGroup.setVelocityYEach(v);
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        vidas[vidas.length -1].destroy()
        vidas.pop()
    }

    if(vidas.length == 0){
      gameState=END;
        
      boy.addAnimation("SahilRunning",endImg);
      boy.x=width/2;
      boy.y=height/2;
      boy.scale=0.6;
      
      cashG.destroyEach();
      diamondsG.destroyEach();
      jwelleryG.destroyEach();
      swordGroup.destroyEach();
      
      cashG.setVelocityYEach(0);
      diamondsG.setVelocityYEach(0);
      jwelleryG.setVelocityYEach(0);
      swordGroup.setVelocityYEach(0);
   
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Tesouro: "+ treasureCollection,width-150,30);
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = v;
  cash.lifetime = v/height;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = v;
  diamonds.lifetime = v/height;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = v;
  jwellery.lifetime = v/height;
  jwelleryG.add(jwellery);
  }
}

function createpoca() {
  if (World.frameCount % 110 == 0) {
  var poca = createSprite(Math.round(random(50, width-50),40, 10, 10));
  poca.addImage(pocaimg);
  poca.scale=0.3
  poca.velocityY = v;
  poca.lifetime = v/height;
  pocagrup.add(poca);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = v;
  sword.lifetime = v/height;
  swordGroup.add(sword);
  }
}

function venceu(){
  
  swal({
    title: `incrivel`,
    text: "parabens, você encontrou o diamante!",
    imageUrl:
      "https://i.postimg.cc/TPjY5mq9/diamante.png",
    imageSize: "100x100",
    confirmButtonText: "Ok"
  });
}

