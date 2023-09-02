import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (!value) return null;

        const passValid = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/.test(value);

        return passValid ? null : {passwordStrength:true}
    }
}
