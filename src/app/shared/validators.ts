import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMismatchValidator: ValidatorFn =
    ( control: AbstractControl ): ValidationErrors | null => {
        const password = control.get('password');
        const confirmPass = control.get('confirmPass');

        return password && confirmPass && password.value !== confirmPass.value
            ? { passwordMismatch: true }
            : null;
}
