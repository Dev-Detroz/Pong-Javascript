// Variáveis da Bolinha
let xBolinha = 400;
let yBolinha = 200;
let dBolinha = 20;
let raio = dBolinha/2;

// Velocidade da Bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// Variáveis raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

// Variáveis raquete do oponente
let xRaqueteOponente = 785;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

// Placar do jogo
let meusPontos = 0;
let pontosOponente = 0

// Sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
    trilha = loadSound("trilha.mp3");
    ponto  = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}

function setup() {
    createCanvas(800, 400);
    trilha.loop();
}

function draw() {
    background(0);
    mostraBolinha();
    movimentaBolinha();
    verificaColisaoBorda();
    mostraRaquete(xRaquete, yRaquete);
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaRaquete();
    movimentaRaqueteOponente();
    verificaColisaoRaquete(xRaquete, yRaquete);
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
    incluirPlacar();
    marcaPonto();
}

function mostraBolinha() {
    circle(xBolinha, yBolinha, dBolinha);
}

function movimentaBolinha() {
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;

}

function verificaColisaoBorda(){
    if (xBolinha+raio > width || xBolinha-raio < 0) {
        velocidadeXBolinha *= -1;

    }

    if (yBolinha+raio > height || yBolinha-raio < 0) {
        velocidadeYBolinha *= -1;

    }
}

function mostraRaquete(x,y){
    rect(x, y, comprimentoRaquete, alturaRaquete);
}

function mostraRaqueteOponente(){
    rect(xRaqueteOponente, yRaqueteOponente, comprimentoRaquete, alturaRaquete);
}

function movimentaRaquete() {
    if (keyIsDown(UP_ARROW)) {
        yRaquete -= 5;
    }

    if (keyIsDown(DOWN_ARROW)) {
        yRaquete += 5;
    }
}

function movimentaRaqueteOponente() {
    if (keyIsDown(87)) {
        yRaqueteOponente -= 5;
    }

    if (keyIsDown(83)) {
        yRaqueteOponente += 5;
    }
}

function verificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio)
    if (colidiu) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}

function incluirPlacar() {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(230, 10, 40, 20);
    fill(255);
    text(meusPontos, 250, 26);
    fill(color(255, 140, 0));
    rect(530, 10, 40, 20);
    fill(255);
    text(pontosOponente, 550, 26);
}

function marcaPonto() {
    if (xBolinha > 790) {
        meusPontos += 1;
        ponto.play();
        xBolinha = 400;
    }
    if (xBolinha < 10) {
        pontosOponente += 1;
        ponto.play();
        xBolinha = 400;
    }
}

