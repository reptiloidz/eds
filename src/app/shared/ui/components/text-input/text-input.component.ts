import { Component, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControlDirective, FormControlName, FormGroupDirective, NG_VALUE_ACCESSOR, NgControl, UntypedFormControl } from '@angular/forms';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';

@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: TextInputComponent,
        }
    ]
})
export class TextInputComponent implements ControlValueAccessor, OnInit {
    @Input('type') type = 'text';
    @Input('placeholder') placeholder = '';
    @Input('inputClass') inputClass = 'form__input';
    @Input('passSwitch') passSwitch = false;

    private onChange = (_: string | number | null) => {_};
	private onTouched = () => {};
    private control: UntypedFormControl | null = null;

    value: string | number | null = '';
    fieldValue$ = new BehaviorSubject<string | null>(null);
    fieldValue = this.fieldValue$.asObservable().pipe(distinctUntilChanged());
    isPassVisible = false;

    constructor(
        private injector: Injector,
    ) {}

    ngOnInit() {
        const ngControl = this.injector.get(NgControl);

        if (ngControl instanceof FormControlName) {
			this.control = this.injector
				.get(FormGroupDirective)
				.getControl(ngControl);
		} else {
			this.control = (ngControl as FormControlDirective).form;
		}

        this.fieldValue.subscribe(
            {
                next: value => {
                    this.value = value;
                    this.onChange(value);
                }
            }
        )
    }

    writeValue(value: string): void {
        this.fieldValue$.next(value);
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    changeHandler(value: string) {
		this.fieldValue$.next(value);
	}

    onPassSwitch() {
        this.isPassVisible = !this.isPassVisible;
        this.type = this.isPassVisible ? 'text' : 'password';
    }
}
