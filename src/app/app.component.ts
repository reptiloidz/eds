import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    title = 'eds';

    @HostBinding('class') class = 'd-flex flex-column h-100p';
}
