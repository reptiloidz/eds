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

    set icon(value: string | null) {
        this._icon = value;
        this.addSvg();
    }

    useElem: HTMLElement | null = null;

    addSvg() {
        this.useElem?.remove();
        this.useElem = null;
        this.useElem = this.renderer.createElement('use');
        this.renderer.setAttribute(this.useElem, 'xlink:href', `assets/sprite/sprite.svg#${this.icon}`);
        if (this.useElem) {
            this.elementRef.nativeElement.append(this.useElem);
        }
    }
}
