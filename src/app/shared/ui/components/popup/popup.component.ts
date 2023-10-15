import { animate, state, style, transition, trigger } from '@angular/animations';
import {
    Component,
    ContentChild,
    HostBinding,
    TemplateRef,
    Input,
    OnChanges,
    HostListener,
    Output,
    EventEmitter
} from '@angular/core';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    animations: [
        trigger('modalAnimation', [
            state('open', style({ opacity: '1'})),
            state('close', style({ opacity: '0', display: 'none'})),
            transition('close <=> open', animate(300))
        ])
    ]
})
export class PopupComponent {
    @HostBinding('class') class = 'popup';
    @HostBinding('@modalAnimation') get getCondition(): string {
        return this.opened ? 'open' : 'close';
    };

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
