import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPageComponent } from './signup-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SignupPageComponent', () => {
    let component: SignupPageComponent;
    let fixture: ComponentFixture<SignupPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SignupPageComponent],
            imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule]
        })
            .compileComponents();

        fixture = TestBed.createComponent(SignupPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
