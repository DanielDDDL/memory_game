var tabuleiro;

function setup(){
  createCanvas(325,500);
  tabuleiro = new Tabuleiro(4,4);
}

function draw(){
  background(100);
  tabuleiro.show();
}

function mousePressed(){
  tabuleiro.cliqueMouse(mouseX, mouseY);
  
}
