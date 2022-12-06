//posicionamento na tela
let ball_x = window.innerWidth / 2;
let ball_y = window.innerHeight / 2;
let ball_d = 30;
let ball_rad = ball_d / 2;
//velocidade
let bal_x_vel = 12;
let bal_y_vel = 12;

//racket_p1
let racket_p1_x = 10;
let racket_p1_y = window.innerHeight / 2;
let rackets_h = 90;
let rackets_w = 10

let racket_p1_y_vel = 10;

let p1_points = 0;

//racket_p2
let racket_p2_x = window.innerWidth - 15;
let racket_p2_y = window.innerHeight / 2;

let racket_p2_y_vel = 10;

let p2_points = 0;

//colisao
let hit_p1 = false;
let hit_p2 = false;

let randomColor = Math.floor(Math.random() * 16777215).toString(16);


let point_sound = new Audio('sounds_fx/point.mp3');
let racket_sound = new Audio('sounds_fx/huh.mp3');

let winnerText_x = window.innerWidth/2 - 100;
let winnerText_y = window.innerHeight/2;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  //elementos
  background(000);
  show_ball();
  show_rackets();
  show_score();
  //movimentos
  ball_moviment();
  racket_p1_movement();
  racket_p2_movement();
  //condicoes
  collision_wScreen();
  collision_wRacket_p1();
  collision_wRacket_p2();
  verify_point();
  winner();
}

function show_ball() {
  circle(ball_x, ball_y, ball_d, fill('#' + randomColor));
}

function ball_moviment() {
  ball_x += bal_x_vel;
  ball_y += bal_y_vel;
}

function collision_wScreen() {
  if (ball_x + ball_rad >= width || ball_x - ball_rad <= 0) {
    bal_x_vel *= -1;
  }
  else if (ball_y + ball_rad >= height || ball_y - ball_rad <= 0) {
    bal_y_vel *= -1;
  }
}

function show_rackets() {
  fill(238)
  rect(racket_p1_x, racket_p1_y, rackets_w, rackets_h);

  rect(racket_p2_x, racket_p2_y, rackets_w, rackets_h);
}

function racket_p1_movement() {
  if (keyIsDown(87)) { //w key
    racket_p1_y -= racket_p1_y_vel;
  }
  else if (keyIsDown(83)) { //s key
    racket_p1_y += racket_p1_y_vel;
  }
}

function racket_p2_movement() {
  if (keyIsDown(38)) { //up arrow
    racket_p2_y -= racket_p2_y_vel;
  }
  else if (keyIsDown(40)) { //down arrow
    racket_p2_y += racket_p2_y_vel;
  }
}


function collision_wRacket_p1(){
  hit_p1 = collideRectCircle(racket_p1_x, racket_p1_y, rackets_w, rackets_h, ball_x, ball_y, ball_rad);
  if(hit_p1 == true){
    bal_x_vel *= -1;
    racket_sound.play();
  }
}

function collision_wRacket_p2(){
  hit_p2 = collideRectCircle(racket_p2_x, racket_p2_y, rackets_w, rackets_h, ball_x, ball_y, ball_rad);
  if(hit_p2 == true){
    bal_x_vel *= -1;
    racket_sound.play();
  }
}

function show_score(){
  fill(255);
  text(p1_points, window.innerWidth/2 - 100, 40);
  text(p2_points, window.innerWidth/2 + 100, 40);
  textSize(35);
}

function verify_point(){
  if(ball_x > window.innerWidth - 10){
    p1_points += 1;
    point_sound.play();
  }
  else if(ball_x < 10){
    p2_points += 1;
    point_sound.play();
  }
}

function winner(){
  if(p1_points == 5){
    fill(255);
    textSize(40);
    textStyle(BOLD);
    text('Left side wins!', winnerText_x, winnerText_y);
    text('Enter to restart', winnerText_x - 5, winnerText_y + 40);
    noLoop();
  }
  else if(p2_points == 5){
    fill(255);
    textStyle(BOLD);
    textSize(40);
    text('Right side wins!', winnerText_x, winnerText_y);
    text('F5 to restart', winnerText_x - 5, winnerText_y + 40);
    noLoop();
  }
}