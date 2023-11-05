import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { NasaService } from '../services/nasa.service';
import { DropdownComponent } from '../shared/ui/components/dropdown/dropdown/dropdown.component';
import { Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

class MockNasaService {
    getLastFivePictures = () => {
        return new Observable(subscriber => {
            subscriber.next([{}, {}, {}, {}, {}])
        })
    }
}

describe('HomePageComponent', () => {
    let component: HomePageComponent;
    let fixture: ComponentFixture<HomePageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HomePageComponent, DropdownComponent],
            imports: [ RouterTestingModule ],
            providers: [
                { provide: NasaService, useClass: MockNasaService}
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HomePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
