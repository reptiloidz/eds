import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsListComponent } from './comments-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CommentsListComponent', () => {
    let component: CommentsListComponent;
    let fixture: ComponentFixture<CommentsListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CommentsListComponent],
            imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CommentsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
