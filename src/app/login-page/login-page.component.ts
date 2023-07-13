import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {
    form: FormGroup;

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.email, Validators.required]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
                Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/)
            ])
        })
    }

    submit() {
        console.log(this.form.controls['password']);
    }
}
