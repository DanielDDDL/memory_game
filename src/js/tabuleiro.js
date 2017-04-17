function Tabuleiro (qntX, qntY){

  this.qntX = qntX;
  this.qntY = qntY;
  this.coordPrimeiraCarta = [];
  this.isPrimeiraCartaVirada = false;

  //limites do tabuleiro
  this.tamanhoCarta = 50;
  this.xInicial = 25;
  this.yInicial = 25;
  this.xDif = 75;
  this.yDif = 75;
  this.xFinal = this.qntX * this.tamanhoCarta + (this.qntX - 1) * this.tamanhoCarta;
  this.yFinal = this.qntY * this.tamanhoCarta + (this.qntY - 1) * this.tamanhoCarta;

  this.inicializarCartas = function (){
    //valores a serem inseridos nas cartas
    var qntValores = (qntX * qntY)/2;
    var valoresNaoInseridos = [];
    for (i = 1; i <= qntValores; i++){
      valoresNaoInseridos.push(i);
      valoresNaoInseridos.push(i);
    }

    //cartas que vao estar no jogo
    //e suas posicoes no tabuleiro
    var xAtual = this.xInicial;
    var yAtual = this.yInicial;

    for (i = 0; i < qntX; i++){
      var coluna = [];
      for (j = 0; j < qntY; j++){
        //inserido valor aleatorio no vetor
        var ind = Math.floor(Math.random() * valoresNaoInseridos.length); //valor de indice aleatorio
        coluna[j] = new Carta(xAtual, yAtual,this.tamanhoCarta,this.tamanhoCarta,valoresNaoInseridos[ind]);
        valoresNaoInseridos.splice(ind,1);//removendo valor colocado na carta do vetor

        yAtual += this.yDif;
      }
      xAtual += this.xDif;
      yAtual = this.yInicial;

      this.cartas[i] = coluna;
    }

  }

  this.cartas = [];
  this.inicializarCartas();

  //retorna o x e o y da carta clicada
  //retorna -1 e -1 como coordenadas se o clique foi fora de uma carta
  //PENSAR EM EXECUTAR ESSE MÉTODO NA HORA DE CRIAR A CLASSE.
  //DESSA FORMA A GENTE SETA ESSES VALORES NA CLASSE EM UMA ÚNICA VEZ
  this.coordenadasCarta = function (x,y){
    //registrando todos os intervalos válidos de x
    var intervalosValX = [];
    var xAtual = this.xInicial;
    for (i = 0; i < this.qntX; i++){
      var intervaloAtual = [];
      intervaloAtual.push(xAtual);
      intervaloAtual.push(xAtual + this.tamanhoCarta);
      intervalosValX.push(intervaloAtual);

      //dif = tamanho carta + real diferenca entre as cartas
      xAtual += this.tamanhoCarta + (this.xDif - this.tamanhoCarta);
    }

    //registrando todos os intervalos válidos de y
    var intervalosValY = [];
    var yAtual = this.yInicial;
    for (i = 0; i < this.qntY; i++){
      var intervaloAtual = [];
      intervaloAtual.push(yAtual);
      intervaloAtual.push(yAtual + this.tamanhoCarta);
      intervalosValY.push(intervaloAtual);

      //dif = tamanho carta + real diferenca entre as cartas
      yAtual += this.tamanhoCarta + (this.xDif - this.tamanhoCarta);
    }

    //coordenadas das cartas clicadas
    //-1 como valor inicial pois é o inválido
    var coordenadaXClique = -1;
    var coordenadaYClique = -1;
    //verificacao intervalo x
    for (i = 0; i < intervalosValX.length; i++){
      if (x >= intervalosValX[i][0] && x <= intervalosValX[i][1]){
        coordenadaXClique = i;
        break;
      }
    }
    //verificacao intervalo y
    for (i = 0; i < intervalosValY.length; i++){
      if (y >= intervalosValY[i][0] && y <= intervalosValY[i][1]){
        coordenadaYClique = i;
        break;
      }
    }

    //-----TESTES------
    // console.log("INTERVALOS VÁLIDOS DE X");
    // for (i = 0; i < intervalosValX.length; i++){
    //   console.log(intervalosValX[i]);
    // }
    // console.log("INTERVALOS VÁLIDOS DE Y");
    // for (i = 0; i < intervalosValY.length; i++){
    //   console.log(intervalosValY[i]);
    // }

    //retornando coordenadas da carta clicada
    return [coordenadaXClique, coordenadaYClique];

  }

  this.cliqueMouse = function (x,y){

    //------TESTE------
    // console.log("--------------------------------------------------------");
    // console.log("Coordenadas do clique: " + mouseX + " : " + mouseY);
    // console.log("xInicial: " + this.xInicial + "; xFinal: " + this.xFinal);
    // console.log("yInicial: " + this.yInicial + "; yFinal: " + this.yFinal);
    // console.log("--------------------------------------------------------");

    //dentro do tabuleiro
    if (x <= this.xFinal && x >= this.xInicial &&
        y <= this.yFinal && y >= this.yInicial){
      var coordenadas = this.coordenadasCarta(x,y);
      //carta encontrada
      if (coordenadas[0] != -1 && coordenadas[1] != -1){

        //se a carta clicada nao tiver sido resolvida
        if (this.cartas[coordenadas[0]][coordenadas[1]].isAtiva){

          //primeira carta a ser clicada
          if (!this.isPrimeiraCartaVirada){
            this.coordPrimeiraCarta[0] = coordenadas[0];
            this.coordPrimeiraCarta[1] = coordenadas[1];
            this.isPrimeiraCartaVirada = true;

            this.cartas[coordenadas[0]][coordenadas[1]].virarCarta();

          //segunda carta a ser clicada
          } else {

            this.cartas[coordenadas[0]][coordenadas[1]].virarCarta();
            //se o segundo chute for igual ao primeiro
            if (this.cartas[coordenadas[0]][coordenadas[1]].valor ==
                this.cartas[this.coordPrimeiraCarta[0]][this.coordPrimeiraCarta[1]].valor){
                  //desativando as duas cartas
                  this.cartas[coordenadas[0]][coordenadas[1]].resolverCarta();
                  this.cartas[this.coordPrimeiraCarta[0]][this.coordPrimeiraCarta[1]].resolverCarta();

                  if (this.areTodasAsCartasReveladas()){
                    console.log("Acabou! Você venceu :D");
                  }

            //segundo chute diferente do primeiro
            } else {
              this.cartas[coordenadas[0]][coordenadas[1]].desvirarCarta();
              this.cartas[this.coordPrimeiraCarta[0]][this.coordPrimeiraCarta[1]].desvirarCarta();
            }

            //resetando variaveis
            this.isPrimeiraCartaVirada = false;
            this.coordPrimeiraCarta = [];
          }

        }
        //carta ja resolvida
        //nada acontece
      }
      //clique feito fora de uma carta
      //nada acontece
    }
    //fora do tabuleiro
    //nada acontece
  }

  //retorna true quando todas as cartas forem encontradas
  //ao contrario, retorna false
  this.areTodasAsCartasReveladas = function (){
    for (i = 0; i < qntY; i++){
      for (j = 0; j < qntX; j++){
        if (this.cartas[i][j].isAtiva == true){
          return false;
        }
      }
    }

    return true;
  }

  this.show = function (){
    for (i = 0; i < qntY; i++){
      for (j = 0; j < qntX; j++){
        this.cartas[i][j].show();
      }
    }
  }

}
