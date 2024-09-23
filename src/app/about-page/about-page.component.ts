import { AfterViewInit, Component, ElementRef, HostBinding, ViewChild } from '@angular/core';

@Component({
	selector: 'app-about-page',
	templateUrl: './about-page.component.html'
})
export class AboutPageComponent implements AfterViewInit {

	@HostBinding('class') class = 'h-100p';

	@ViewChild('aboutCanvas') aboutCanvas: ElementRef<HTMLCanvasElement>;
	@ViewChild('vertexShader2d') vertexShader2d: ElementRef<HTMLScriptElement>;
	@ViewChild('fragmentShader2d') fragmentShader2d: ElementRef<HTMLScriptElement>;

	context: WebGL2RenderingContext;

	ngAfterViewInit() {
		this.aboutCanvas.nativeElement.width = this.aboutCanvas.nativeElement.offsetWidth;
		this.aboutCanvas.nativeElement.height = this.aboutCanvas.nativeElement.offsetHeight;
		this.context = this.aboutCanvas.nativeElement.getContext('webgl') as WebGL2RenderingContext;

		const vertexShaderSource = `
			attribute vec4 a_position;

			void main() {
			gl_Position = a_position;
    	}`;
		const fragmentShaderSource = `
			precision mediump float;

			void main() {
				gl_FragColor = vec4(1, 0, 0.5, 1);
			}
		`;

		const vertexShader = this.createShader(this.context, this.context.VERTEX_SHADER, vertexShaderSource);
		const fragmentShader = this.createShader(this.context, this.context.FRAGMENT_SHADER, fragmentShaderSource);

		const program = this.createProgram(this.context, vertexShader, fragmentShader);
		const positionAttributeLocation = this.context.getAttribLocation(program, "a_position");
		const positionBuffer = this.context.createBuffer();
		this.context.bindBuffer(this.context.ARRAY_BUFFER, positionBuffer);

		const positions = [
			0, 0,
			0, 0.5,
			0.7, 0,
			0, 0,
			0, -0.5,
			-0.7, 0,
		];
		this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(positions), this.context.STATIC_DRAW);

		this.context.viewport(0, 0, this.context.canvas.width, this.context.canvas.height);
		this.context.clearColor(0, 0, 0, 0);
		this.context.clear(this.context.COLOR_BUFFER_BIT);
		this.context.useProgram(program);
		this.context.enableVertexAttribArray(positionAttributeLocation);
		// Привязываем буфер положений
		this.context.bindBuffer(this.context.ARRAY_BUFFER, positionBuffer);

		// Указываем атрибуту, как получать данные от positionBuffer (ARRAY_BUFFER)
		const size = 2;          // 2 компоненты на итерацию
		const type = this.context.FLOAT;   // наши данные - 32-битные числа с плавающей точкой
		const normalize = false; // не нормализовать данные
		const stride = 0;        // 0 = перемещаться на size * sizeof(type) каждую итерацию для получения следующего положения
		const offset = 0;        // начинать с начала буфера
		this.context.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

		const primitiveType = this.context.TRIANGLES;
		const offset2 = 0;
		const count = 6;
		this.context.drawArrays(primitiveType, offset2, count);


		// const maxX = this.aboutCanvas.nativeElement.offsetWidth;
		// const maxY = this.aboutCanvas.nativeElement.offsetHeight;

		// setInterval(() => {
		//     const coordX = Math.floor(Math.random() * maxX);
		//     const coordY = Math.floor(Math.random() * maxY);
		//     const ellipseRadius = Math.floor(Math.random() * 30);
		//     this.context.fillStyle = `rgba(
		//         ${Math.floor(Math.random() * 255)},
		//         ${Math.floor(Math.random() * 255)},
		//         ${Math.floor(Math.random() * 255)},
		//         .8
		//     )`;
		//     this.context.beginPath();
		//     this.context.ellipse(
		//         Math.floor(Math.random() * maxX),
		//         Math.floor(Math.random() * maxY),
		//         ellipseRadius,
		//         ellipseRadius,
		//         Math.PI / 4, 0, 2 * Math.PI
		//     );
		//     this.context.fill();

		//     console.log(coordX, coordY);
		// }, 300);

		// this.context.fillStyle = `rgba(
		//     ${Math.floor(Math.random() * 255)},
		//     ${Math.floor(Math.random() * 255)},
		//     ${Math.floor(Math.random() * 255)},
		//     .8
		// )`;
		// this.context.beginPath();
		// this.context.ellipse(
		//     100,
		//     100,
		//     100,
		//     100,
		//     Math.PI / 4, 0, 2 * Math.PI
		// );
		// this.context.fill();
	}

	createShader(gl: WebGL2RenderingContext, type: number, source: string) {
		const shader = gl.createShader(type) as WebGLShader;   // создание шейдера
		gl.shaderSource(shader, source);      // устанавливаем шейдеру его программный код
		gl.compileShader(shader);             // компилируем шейдер
		console.log(gl.getShaderInfoLog(shader));
		return shader;
		// gl.deleteShader(shader);
	}

	createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
		const program = gl.createProgram() as WebGLProgram;
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);
		// const success = gl.getProgramParameter(program, gl.LINK_STATUS);
		console.log(gl.getProgramInfoLog(program));
		return program;
		// gl.deleteProgram(program);
	}
}
