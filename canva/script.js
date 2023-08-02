const canvas = document.querySelector("#canvas"); // seleccionar lienzo
const ctx = canvas.getContext("2d");// ctx 2d o 3d 

// genero variables ancho, alto y pelotas arrays 
let w, h, balls = [];
//objecto raton con corrdenadas 
let mouse = {
	x: undefined,
	y: undefined
}

// array de colores
let rgb = [
	"rgb(26, 188, 156)",
	"rgb(46, 204, 113)",
	// "rgb(52, 152, 219)",
	// "rgb(155, 89, 182)",
	// "rgb(241, 196, 15)",
	// "rgb(230, 126, 34)",
	// "rgb(231, 76, 60)"
]
// inicializacion :  actualizar renderizado y anima
function init() {
	resizeReset();
	animationLoop();
}
   //   actualiza el tamaño del canvas para que coincida con el tamaño de la ventana del navegador.
function resizeReset() {
	w = canvas.width = window.innerWidth;
	h = canvas.height = window.innerHeight;
}
// Borra el canvas, dibuja las bolas llamando a drawBalls() y luego actualiza y filtra las bolas en función de su tiempo de vida (ttl). Luego, solicita una nueva animación al navegador llamando a requestAnimationFrame(animationLoop).
function animationLoop() {
	ctx.clearRect(0, 0, w, h);
	ctx.globalCompositeOperation = 'lighter';
	drawBalls();

	let temp = [];
	for (let i = 0; i < balls.length; i++) {
		if (balls[i].time <= balls[i].ttl) {
			temp.push(balls[i]);
		}
	}
	balls = temp;

	requestAnimationFrame(animationLoop);
}
//Dibuja todas las bolas llamando a los métodos update() y draw() de cada instancia de Ball.
function drawBalls() {
	for (let i = 0; i < balls.length; i++) {
		balls[i].update();
		balls[i].draw();
	}
}
//capturan las coordenadas del mouse cuando se mueve sobre el canvas (mousemove) y cuando sale del canvas (mouseout). Estas funciones también crean tres nuevas bolas (instancias de Ball) cerca de la posición actual del mouse.
function mousemove(e) {
	mouse.x = e.x;
	mouse.y = e.y;

	for (let i = 0; i < 3; i++) {
		balls.push(new Ball());
	}	
}

function mouseout() {
	mouse.x = undefined;
	mouse.y = undefined;
}
//devuelve un número entero aleatorio entre un mínimo (min) y un máximo (max) dados.
function getRandomInt(min, max) {
	return Math.round(Math.random() * (max - min)) + min;
}
// implementa una función de "easing" para suavizar la animación de crecimiento y disminución del tamaño de las bolas. Esta función se utiliza para controlar el tamaño de las bolas a medida que envejecen.
function easeOutQuart(x) {
	return 1 - Math.pow(1 - x, 4);
}
//cada bola  que se crea en la animación. Tiene un constructor que establece las propiedades iniciales de la bola, como su posición, tamaño, color, tiempo y tiempo de vida (ttl). También tiene dos métodos: draw() para dibujar la bola en el canvas y update() para actualizar su posición y tamaño a medida que envejece.
class Ball {
	constructor() {
		this.start = {
			// -20 es para generar alrededor puntero
			x: mouse.x + getRandomInt(-20, 20),
			y: mouse.y + getRandomInt(-20, 20),
			// medida como estamos html px por defecto
			size: getRandomInt(30, 40)
		}
		this.end = {
			x: this.start.x + getRandomInt(-300, 300),
			y: this.start.y + getRandomInt(-300, 300)
		}

		this.x = this.start.x;
		this.y = this.start.y;
		this.size = this.start.size;

		this.style = rgb[getRandomInt(0, rgb.length - 1)];

		this.time = 0;
		// vida maxima 120 frames 
		this.ttl = 120;
	}
	draw() {
		ctx.fillStyle = this.style;  // estableci this style para el relleno color
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);// genera circulo
		ctx.closePath();
		 ctx.fill();
	}
	update() {
		if (this.time <= this.ttl) {
			let progress = 1 - (this.ttl - this.time) / this.ttl;

			this.size = this.start.size * (1 - easeOutQuart(progress));
			this.x = this.x + (this.end.x - this.x) * 0.01;
			this.y = this.y + (this.end.y - this.y) * 0.01;
		}
		this.time++;
	}
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseout", mouseout);
