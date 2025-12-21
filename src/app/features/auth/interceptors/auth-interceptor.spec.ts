import { HttpClient, provideHttpClient, withInterceptors } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { AuthService } from "../services/auth-service";
import { TestBed } from "@angular/core/testing";

import { authInterceptor } from "./auth-interceptor";

describe('authinterceptor', ()=> {

    let http: HttpClient;
    let httpMock: HttpTestingController;
    let authServiceMock: jasmine.SpyObj<AuthService>;

    const testurl = '/api/auth';

    beforeEach( () => {
        authServiceMock = jasmine.createSpyObj('AuthService', ['getToken']);

        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(withInterceptors([authInterceptor])),
                provideHttpClientTesting(),
                {provide: AuthService, useValue: authServiceMock}
            ]
        });

        http = TestBed.inject(HttpClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach( () => {
        httpMock.verify();
    });

    it('Should add token when a token is available', () => {
        const dummytoken ='my-secret-token';
        authServiceMock.getToken.and.returnValue(dummytoken);

        http.get(testurl).subscribe();

        const httpRequest = httpMock.expectOne(testurl);
        expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
        expect(httpRequest.request.headers.get('Authorization')).toEqual(`Bearer ${dummytoken}`);
    });














});