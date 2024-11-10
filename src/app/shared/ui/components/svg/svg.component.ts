import { Component, ElementRef, Input, Renderer2 } from "@angular/core";

@Component({
    selector: '[app-shared-svg]',
    templateUrl: './svg.component.html'
})

export class SvgComponent {

    constructor(
        private elementRef: ElementRef<SVGElement>,
        private renderer: Renderer2
    ) {}

    private _icon: string | null = null;
    @Input() get icon() {
        return this._icon;
    }

    @Input() title?: string;

    set icon(value: string | null) {
        this._icon = value;
        this.addSvg();
    }

    useElem: HTMLElement | null = null;

    addSvg() {
        const svgElement: SVGElement = this.elementRef?.nativeElement;
        const childElements: Element[] = Object.values(svgElement.children);

        this.useElem?.remove();
        this.useElem = null;

        childElements
			.filter(element => element?.tagName?.toLowerCase() !== 'title')
			.forEach(element => element?.remove());
        this.useElem = this.renderer.createElement('use');
        this.renderer.setAttribute(this.useElem, 'href', `assets/sprite/sprite.svg#${this.icon}`);
        if (this.useElem) {
            this.elementRef.nativeElement.append(this.useElem);
        }
    }
}
