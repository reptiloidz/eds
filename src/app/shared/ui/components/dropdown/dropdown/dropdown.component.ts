import { style, transition, trigger, animate } from '@angular/animations';
import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    animations: [
        trigger('toggleDrop', [
            transition('void => *', [
                style({ opacity: 0, transform: 'translateY(-20px)' }),
                animate('.5s', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
            transition('* => void', [
                animate('.5s', style({ opacity: 0, transform: 'translateY(-20px)' })),
            ]),
        ])
    ]
})
export class DropdownComponent implements OnInit {

    @HostBinding('class') class = 'drop';

    @Input('options') options: Array<string> = [];
    @Input('defaultSelectedOption') defaultSelectedOption = 0;

    @Output('selectedOption') selectedOption = new EventEmitter();

    @HostListener('document:click', ['$event']) clickOut(event: Event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.listOpened = false;
        }
    }

    public _selectedValue = new BehaviorSubject('');

    listOpened = false;

    constructor(
        private eRef: ElementRef
    ) {}

    ngOnInit(): void {
        this._selectedValue.next(
            this.defaultSelectedOption ? this.options[this.defaultSelectedOption] : this.options[0]
        );

        this._selectedValue.subscribe(resolve => this.selectedOption.emit(resolve));
    }

    setValue(value: string) {
        this._selectedValue.next(value);
        this.toggleDrop();
    }

    toggleDrop() {
        this.listOpened = !this.listOpened;
    }
}
