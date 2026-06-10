import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    inject,
    Input,
    ViewChild,
} from '@angular/core';

@Component({
    selector: 'b-shared-hidden-content',
    templateUrl: './hidden-content.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HiddenContentComponent implements AfterViewInit {
    @Input('width') width = 0;
    @Input('height') height = 0;
    @Input('animSpeed') animSpeed = 1000;
    @Input('autoDots') autoDots = true;
    @Input('dots') dots = 0;
    @Input('svgClass') svgClass: string | null = null;

    @ViewChild('svgRef', { static: false })
    svgRef!: ElementRef<SVGElement>;

    private _viewBoxWidth = 0;
    private _viewBoxHeight = 0;
    private _step = 20;

    points = [[{ x: 0, y: 0 }]];
    loading = true;

    private _cdr = inject(ChangeDetectorRef);

    get viewBoxWidth(): number {
        return this._viewBoxWidth;
    }

    get viewBoxHeight(): number {
        return this._viewBoxHeight;
    }

    get cubicBezier(): number {
        return +Math.random().toFixed(2);
    }

    get opacity(): number {
        return +Math.round(Math.random());
    }

    ngAfterViewInit(): void {
        if (!this.width && this.svgRef?.nativeElement) {
            this.svgRef.nativeElement.style.width = '100%';
            const width =
                this.svgRef.nativeElement.getBoundingClientRect().width;
            this._viewBoxWidth = Math.round(width);
        } else {
            this._viewBoxWidth = this.width;
        }

        if (!this.height && this.svgRef?.nativeElement) {
            this.svgRef.nativeElement.style.height = '100%';
            const height =
                this.svgRef.nativeElement.getBoundingClientRect().height;
            this._viewBoxHeight = Math.round(height);
        } else {
            this._viewBoxHeight = this.height;
        }

        this.svgRef.nativeElement.setAttribute(
            'viewBox',
            `0 0 ${this.viewBoxWidth} ${this.viewBoxHeight}`,
        );
        this.generateDots();
        this.generateChords();
        this._cdr.detectChanges();
    }

    generateDots(): void {
        if (!this.autoDots) return;

        this.dots = Math.round((this.viewBoxWidth + this.viewBoxHeight) / 2);
    }

    generateChords() {
        const xSteps = Math.ceil(this.viewBoxWidth / this._step);
        const ySteps = Math.ceil(this.viewBoxHeight / this._step);
        const pointsPerStep = Math.floor(this.dots / (xSteps * ySteps));
        let counter = 0;

        console.log(xSteps, ySteps, pointsPerStep);

        for (let xStep = 0; xStep < xSteps; xStep++) {
            const minX = xStep * this._step;
            const maxX = (xStep + 1) * this._step;

            for (let yStep = 0; yStep < ySteps; yStep++) {
                const minY = yStep * this._step;
                const maxY = (yStep + 1) * this._step;

                for (
                    let pointIndex = 0;
                    pointIndex < pointsPerStep;
                    pointIndex++
                ) {
                    this.points[counter] = [];
                    for (let i = 0; i < 5; i++) {
                        const pointX = (
                            Math.random() * (maxX - minX) +
                            minX
                        ).toFixed(2);
                        const pointY = (
                            Math.random() * (maxY - minY) +
                            minY
                        ).toFixed(2);

                        this.points[counter][i] = { x: +pointX, y: +pointY };
                    }
                    counter++;
                }
            }
        }
        console.log(this.points);
        this.loading = false;
    }
}
