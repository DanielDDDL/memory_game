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
  this.fontSize = Math.floor(18);

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

    var isSingleNumber = true;
    if (this.face.length > 1){
      isSingleNumber = false;
    }

    var xCarta = 0;
    var yCarta = 0;
    if (isSingleNumber){
      //se for apenas um numero
      xCarta = this.x + 18;
      yCarta = this.y + this.fontSize + 12;
    } else {
      xCarta = this.x + 4;
      yCarta = this.y + this.fontSize + 12;
    }

    textSize(this.fontSize);
    //carta encontrada
    if (!this.isAtiva){
      rect(this.x,this.y,this.width,this.height);
      text(this.face,xCarta,yCarta); //AQUI

    //carta não encontrada ainda
    } else {
      //carta selecionada pelo usuario
      if (this.isVirada){
        rect(this.x,this.y,this.width,this.height);
        text(this.face,xCarta,yCarta); //AQUI

      //carta não selecionada
      } else {
        rect(this.x,this.y,this.width,this.height);
        text("X",this.x + 18,this.y + this.fontSize + 12);
      }

    }
  }

}
