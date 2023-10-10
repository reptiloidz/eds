import { Component, ContentChild, HostBinding, TemplateRef } from '@angular/core';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html'
})
export class PopupComponent {
    @HostBinding('class') class = 'popup';

    @ContentChild('content') content: TemplateRef<any>;
    @ContentChild('controls') controls: TemplateRef<any>;

}
