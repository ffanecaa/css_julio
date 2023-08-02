const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")


let w,h,particulas
let particulasAmont=100
let particulasColor= "rgba(255,255,255,.2)"


function init(){
    resizeReset()
particulas=[];
for(let i=0; i<particulasAmont;i++){
  particulas.push(new Particula())
}





}

function resizeReset(){
 w=canvas.width = window.innerWidth
 h=canvas.height = window.innerHeight

}
function getRandomNumber(max,min){
    return Math.random()* (max-min)+min
}
document.addEventListener("DOMContentLoaded",init)

class Particula {
    constructor(){
      this.radius = getRandomNumber(18,36);
      this.x= Math.random()*w;
      this.y= Math.random()*h;
      this.color=particulasColor;
      this.directionAngle = getRandomNumber(1,368);
      this.speed = getRandomNumber(1,2);
      this.vector ={
        x: Math.cos(this.directionAngle)*this.speed,
        y: Math.sin(this.directionAngle)*this.speed
      }



    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.closePath();
        ctx.fillStyle= this.color;
        k

    }

    update(){

    }
}