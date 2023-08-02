const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let w, h, particulas;
let particulasAmont = 300;
let particulasColor = "rgba(255,255,255,.2)";
let mouse={
    x:undefined,
    y:undefined,
    radius:(canvas.width * 0.3)
}
function init() {
  resizeReset();
  particulas = [];
  for (let i = 0; i < particulasAmont; i++) {
    particulas.push(new Particula());
  }

  requestAnimationFrame(animationLoop);
}

function resizeReset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function animationLoop() {
  ctx.clearRect(0, 0, w, h);
  drawScene();
  requestAnimationFrame(animationLoop)
}

function drawScene() {
  for (let i = 0; i < particulas.length; i++) {
    particulas[i].update();
    particulas[i].draw();
  }
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function mousemove(e){
  mouse.x =e.x;
  mouse.y =e.y;
}
function mouseout(e){
  mouse.x = undefined;
  mouse.y = undefined;
}



document.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset)
window.addEventListener("mousemove", mousemove)
window.addEventListener("mouseout", mouseout)

class Particula {
  constructor() {
    this.radius = getRandomNumber(10, 30);
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.color = particulasColor;
    this.directionAngle = getRandomNumber(1, 360);
    this.speed = getRandomNumber(7, 10)/4;
    this.vector = {
      x: Math.cos(this.directionAngle) * this.speed,
      y: Math.sin(this.directionAngle) * this.speed,
    };
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    // check border
    if (this.x > w || this.x < 0) {
      this.vector.x *= -1;
    }
    if (this.y > h || this.y < 0) {
      this.vector.y *= -1;
    }
    if (this.x > w) this.x = w;
    if (this.y > h) this.y = h;
    if (this.x < 0) this.x = 0;
    if (this.x < 0) this.y = 0;

    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx *dx +dy*dy);
    if(distance < mouse.radius +this.radius){
        if(mouse.x < this.x && this.x < canvas.width -this.radius *5){
            this.x += this.speed
        }
        if(mouse.x > this.x && this.x > this.radius *5){
            this.x -= this.speed
        }
        if(mouse.y < this.y && this.y < canvas.height -this.radius *5){
            this.y += this.speed
        }
        if(mouse.y > this.y && this.y > this.radius *5){
            this.y -= this.speed
        }
    }

    this.x += this.vector.x;
    this.y += this.vector.y;
  }
}
