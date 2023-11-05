import { TestBed } from "@angular/core/testing";
import { NasaService } from "./nasa.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('NasaService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ NasaService ],
            imports: [ HttpClientTestingModule ]
        })
            .compileComponents();

    });

    it('should create', () => {
        const service = TestBed.inject(NasaService);
        expect(service).toBeTruthy();
    });
});
