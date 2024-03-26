import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function usernameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (!value) return null;

        const usernameValid = /[^\dA-Za-z]/.test(value);

        return usernameValid ? { usernameInvalid: true } : null
    }
}
