import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { environment } from "src/environments/prod.env";
import { AccountService } from "./account.service";
import { User } from "../shared/interface";

describe('AccountService', () => {
    let httpTestingController: HttpTestingController;
    let accountService: AccountService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ AccountService ]
        });

        accountService = TestBed.inject(AccountService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('can test HttpClient.post', () => {
        const user: User = {
            idToken: '',
            displayName: '',

        };

        accountService
            .updateProfile(user)
            .subscribe((response) =>
                expect(response).toBe(user)
            );

        const req = httpTestingController.expectOne(
            `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.firebaseKey}`
        );

        expect(req.request.method).toBe('POST');

        req.flush(user);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

});
