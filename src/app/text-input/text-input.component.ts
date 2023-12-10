import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.html',
    providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          multi: true,
          useExisting: forwardRef(() => TextInputComponent),
        }
    ]
})
export class TextInputComponent {
    @Input('type') type = 'text';
    @Input('placeholder') placeholder = '';
    @Input('formControlName') formControlName!: string;

    value!: string;

    writeValue(value: string): void {
        this.value = value ? value : ''
      }
      registerOnChange(): void {
      }
      registerOnTouched(): void {
      }
}
