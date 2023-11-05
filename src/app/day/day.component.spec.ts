import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayComponent } from './day.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommentsListComponent } from '../comments-list/comments-list.component';
import { SanitizerPipe } from '../shared/pipes/sanitizer.pipe';


describe('DayComponent', () => {
    let component: DayComponent;
    let fixture: ComponentFixture<DayComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ DayComponent, CommentsListComponent, SanitizerPipe ],
            imports: [ RouterTestingModule, HttpClientTestingModule ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(DayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
