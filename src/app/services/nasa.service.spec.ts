import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { NasaService } from "./nasa.service";
import { environment } from "src/environments/prod.env";

describe('NasaService', () => {
    let httpTestingController: HttpTestingController;
    let nasaService: NasaService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ NasaService ]
        });

        nasaService = TestBed.inject(NasaService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('can test HttpClient.get', () => {
        const data = [1, 2, 3];

        nasaService
            .getDailyPicture()
            .subscribe((response) =>
                expect(response).toBe(data)
            );

        const req = httpTestingController.expectOne(
            `https://api.nasa.gov/planetary/apod?api_key=${environment.nasaKey}`
        );

        expect(req.request.method).toBe('GET');

        req.flush(data);
    });

    it('should trow error', () => {
        const message = 'Session expired';

        nasaService.getDailyPicture().subscribe({
            next: () => {
                fail('should fail with the 401 error')
            },
            error: error => {
                expect(error.status).toBe(401);
                expect(error.error).toContain(message);
            }
        });

        const req = httpTestingController.expectOne(
            `https://api.nasa.gov/planetary/apod?api_key=${environment.nasaKey}`
        );

        expect(req.request.method).toBe('GET');

        req.flush(message, {
            status: 401,
            statusText: 'Unauthorized',
        });
    });

    afterEach(() => {
        httpTestingController.verify();
    });

});
