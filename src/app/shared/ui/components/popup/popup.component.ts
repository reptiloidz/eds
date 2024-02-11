import { animate, style, transition, trigger } from '@angular/animations';
import {
    Component,
    ContentChild,
    TemplateRef,
    Input,
    HostListener,
    Output,
    EventEmitter,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    animations: [
        trigger('modalAnimation', [
            transition(':enter', [
                style({ opacity: 0}),
                animate(
                    "500ms ease-in-out",
                    style({ opacity: 1})
                )
            ]),
            transition(':leave', [
                style({ opacity: 1}),
                animate(
                    "500ms ease-in-out",
                    style({ opacity: 0})
                )
            ]),
        ])
    ],
    encapsulation: ViewEncapsulation.None
})
export class PopupComponent {
    @ContentChild('content') content: TemplateRef<any>;
    @ContentChild('controls') controls: TemplateRef<any>;

    @Input() opened = false;

    @Output('onClose') onClose = new EventEmitter;

    @HostListener('click', ['$event.target']) closePopup(target: HTMLElement) {
        if (target.className.includes('popup__overlay')) {
            this.onClose.emit(Event);
        }
    }
}
