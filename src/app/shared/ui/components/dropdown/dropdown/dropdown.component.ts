import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html'
})
export class DropdownComponent implements OnInit {

    @Input('options') options: Array<string> = [];
    @Input('defaultSelectedOption') defaultSelectedOption = '';
    @Output('selectedOption') selectedOption = new EventEmitter();

    public _selectedValue = new BehaviorSubject('');


    ngOnInit(): void {
        this._selectedValue.next(
            this.defaultSelectedOption ? this.defaultSelectedOption : this.options[0]
        );

        this._selectedValue.subscribe(resolve => this.selectedOption.emit(resolve));
    }

    setValue(value: string) {
        this._selectedValue.next(value);

    }
}
