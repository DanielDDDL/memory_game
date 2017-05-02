var tabuleiro;

function setup(){

  createCanvas(325,500);
  tabuleiro = new Tabuleiro(4,4);
}

function draw(){
  background(225);
  textSize(25);
  text("JOGO DA MEMÓRIA", 42,410);
  tabuleiro.show();
}

function mousePressed(){
  tabuleiro.cliqueMouse(mouseX, mouseY);

}
