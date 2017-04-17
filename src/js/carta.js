function Carta(x,y,width,height,valor,face){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.valor = valor;
  this.face = face;
  this.isAtiva = true;
  this.isVirada = false;

  //tamanho da fonte baseado no tamanho do quadrado
  this.fontSize = Math.floor(this.width/2);

  this.virarCarta = function(){
    this.isVirada = true;
  }

  // this.sleep = function(delay) {
  //   var start = new Date().getTime();
  //   while (new Date().getTime() < start + delay);
  // }

  this.desvirarCarta = function(){
    this.isVirada = false;
  }

  this.resolverCarta = function(){
    this.isAtiva = false;
  }

  this.show = function (){
    textSize(this.fontSize);
    //carta encontrada
    if (!this.isAtiva){
      rect(this.x,this.y,this.width,this.height);
      text(this.face,this.x,this.y + this.fontSize);

    //carta não encontrada ainda
    } else {
      //carta selecionada pelo usuario
      if (this.isVirada){
        rect(this.x,this.y,this.width,this.height);
        text(this.face,this.x,this.y + this.fontSize);

      //carta não selecionada
      } else {
        rect(this.x,this.y,this.width,this.height);
        text("X",this.x,this.y + this.fontSize);
      }

    }
  }

}
