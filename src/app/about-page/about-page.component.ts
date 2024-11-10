import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, ViewChild } from '@angular/core';

@Component({
	selector: 'app-about-page',
	templateUrl: './about-page.component.html'
})
export class AboutPageComponent {

	@HostBinding('class') class = 'h-100p';

	// @ViewChild('aboutCanvas') aboutCanvas: ElementRef<HTMLCanvasElement>;
	// @ViewChild('vertexShader2d') vertexShader2d: ElementRef<HTMLScriptElement>;
	// @ViewChild('fragmentShader2d') fragmentShader2d: ElementRef<HTMLScriptElement>;

	// context: WebGL2RenderingContext;

	// ngAfterViewInit() {
	// 	this.aboutCanvas.nativeElement.width = this.aboutCanvas.nativeElement.offsetWidth;
	// 	this.aboutCanvas.nativeElement.height = this.aboutCanvas.nativeElement.offsetHeight;
	// 	this.context = this.aboutCanvas.nativeElement.getContext('webgl') as WebGL2RenderingContext;

	// 	this.draw();
	// }

	// draw() {
	// 	const vertexShaderSource = `
	// 		attribute vec2 a_position;

	// 		uniform vec2 u_resolution;

	// 		void main() {
	// 			vec2 zeroToOne = a_position / u_resolution;
	// 			vec2 zeroToTwo = zeroToOne * 2.0;
	// 			vec2 clipSpace = zeroToTwo - 1.0;

	// 			gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
	// 		}
	// 	`;
	// 	const fragmentShaderSource = `
	// 		precision mediump float;

	// 		void main() {
	// 			gl_FragColor = vec4(1, 0, 0.5, 1);
	// 		}
	// 	`;
	// 	const vertexShader = this.createShader(this.context, this.context.VERTEX_SHADER, vertexShaderSource);
	// 	const fragmentShader = this.createShader(this.context, this.context.FRAGMENT_SHADER, fragmentShaderSource);

	// 	const program = this.createProgram(this.context, vertexShader, fragmentShader);
	// 	const positionAttributeLocation = this.context.getAttribLocation(program, "a_position");
	// 	const resolutionUniformLocation = this.context.getUniformLocation(program, "u_resolution");
	// 	const positionBuffer = this.context.createBuffer();
	// 	this.context.bindBuffer(this.context.ARRAY_BUFFER, positionBuffer);



	// 	const positions = [
	// 		10, 20,
	// 		80, 20,
	// 		10, 30,
	// 		10, 30,
	// 		80, 20,
	// 		80, 30,
	// 	];
	// 	this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(positions), this.context.STATIC_DRAW);

	// 	this.context.viewport(0, 0, this.context.canvas.width, this.context.canvas.height);
	// 	this.context.clearColor(0, 0, 0, 0);
	// 	this.context.clear(this.context.COLOR_BUFFER_BIT);
	// 	this.context.useProgram(program);
	// 	this.context.enableVertexAttribArray(positionAttributeLocation);
	// 	// Указываем атрибуту, как получать данные от positionBuffer (ARRAY_BUFFER)
	// 	const size = 2;          // 2 компоненты на итерацию
	// 	const type = this.context.FLOAT;   // наши данные - 32-битные числа с плавающей точкой
	// 	const normalize = false; // не нормализовать данные
	// 	const stride = 0;        // 0 = перемещаться на size * sizeof(type) каждую итерацию для получения следующего положения
	// 	const offset = 0;        // начинать с начала буфера
	// 	this.context.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
	// 	this.context.uniform2f(resolutionUniformLocation, this.aboutCanvas.nativeElement.width, this.aboutCanvas.nativeElement.height);
	// 	const primitiveType = this.context.TRIANGLES;
	// 	const offset2 = 0;
	// 	const count = 6;
	// 	this.context.drawArrays(primitiveType, offset2, count);
	// }

	// createShader(gl: WebGL2RenderingContext, type: number, source: string) {
	// 	const shader = gl.createShader(type) as WebGLShader;   // создание шейдера
	// 	gl.shaderSource(shader, source);      // устанавливаем шейдеру его программный код
	// 	gl.compileShader(shader);             // компилируем шейдер
	// 	console.log(gl.getShaderInfoLog(shader));
	// 	return shader;
	// 	// gl.deleteShader(shader);
	// }

	// createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
	// 	const program = gl.createProgram() as WebGLProgram;
	// 	gl.attachShader(program, vertexShader);
	// 	gl.attachShader(program, fragmentShader);
	// 	gl.linkProgram(program);
	// 	// const success = gl.getProgramParameter(program, gl.LINK_STATUS);
	// 	console.log(gl.getProgramInfoLog(program));
	// 	return program;
	// 	// gl.deleteProgram(program);
	// }

	// resizeCanvasToDisplaySize(canvas: ElementRef<HTMLCanvasElement>, multiplier?: number) {
	// 	multiplier = multiplier || 1;
	// 	const width  = canvas.nativeElement.clientWidth  * multiplier | 0;
	// 	const height = canvas.nativeElement.clientHeight * multiplier | 0;
	// 	if (canvas.nativeElement.width !== width ||  canvas.nativeElement.height !== height) {
	// 		canvas.nativeElement.width  = width;
	// 		canvas.nativeElement.height = height;
	// 		return true;
	// 	}
	// 	return false;
	// }

	// resize(canvas: ElementRef<HTMLCanvasElement>) {
	// 	// получаем размер HTML-элемента canvas
	// 	const displayWidth  = canvas.nativeElement.clientWidth;
	// 	const displayHeight = canvas.nativeElement.clientHeight;

	// 	// проверяем, отличается ли размер canvas
	// 	if (canvas.nativeElement.width  != displayWidth ||
	// 		canvas.nativeElement.height != displayHeight) {

	// 		// подгоняем размер буфера отрисовки под размер HTML-элемента
	// 		canvas.nativeElement.width  = displayWidth;
	// 		canvas.nativeElement.height = displayHeight;
	// 	}
	// }

	// @HostListener('window:resize', ['$event'])
	// onResize() {
	// 	this.resize(this.aboutCanvas);
	// 	this.draw();
	// }
}
