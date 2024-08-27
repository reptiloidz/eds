import { AfterViewInit, Component, ElementRef, HostBinding, ViewChild } from '@angular/core';

@Component({
    selector: 'app-about-page',
    templateUrl: './about-page.component.html'
})
export class AboutPageComponent implements AfterViewInit {

    @HostBinding('class') class = 'h-100p';

    @ViewChild('aboutCanvas') aboutCanvas: ElementRef<HTMLCanvasElement>;

    context: CanvasRenderingContext2D;

    ngAfterViewInit() {
        this.aboutCanvas.nativeElement.width = this.aboutCanvas.nativeElement.offsetWidth;
        this.aboutCanvas.nativeElement.height = this.aboutCanvas.nativeElement.offsetHeight;
        this.context = this.aboutCanvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;

        const maxX = this.aboutCanvas.nativeElement.offsetWidth;
        const maxY = this.aboutCanvas.nativeElement.offsetHeight;

        setInterval(() => {
            const coordX = Math.floor(Math.random() * maxX);
            const coordY = Math.floor(Math.random() * maxY);
            const ellipseRadius = Math.floor(Math.random() * 30);
            this.context.fillStyle = `rgba(
                ${Math.floor(Math.random() * 255)},
                ${Math.floor(Math.random() * 255)},
                ${Math.floor(Math.random() * 255)},
                .8
            )`;
            this.context.beginPath();
            this.context.ellipse(
                Math.floor(Math.random() * 1363),
                Math.floor(Math.random() * 685),
                ellipseRadius,
                ellipseRadius,
                Math.PI / 4, 0, 2 * Math.PI
            );
            this.context.fill();

            console.log(coordX, coordY);
        }, 300);

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
}
