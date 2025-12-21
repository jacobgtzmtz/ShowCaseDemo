import { TestBed } from "@angular/core/testing";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { authGuard } from "../guards/auth-guard";
import { AuthService } from "../services/auth-service";



describe('authGuard', () => {
// Para ejecutar el guard en un contexto de inyección de dependencias.
    const executeGuard: CanActivateFn = (...guardParameters) => 
        TestBed.runInInjectionContext(()=> authGuard(...guardParameters));

    let authServiceMock: jasmine.SpyObj<AuthService>;
    let routerMock: jasmine.SpyObj<Router>;

    beforeEach( ()=> {
        authServiceMock = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
        routerMock = jasmine.createSpyObj('Router', ['navigate']);

        TestBed.configureTestingModule({
            providers: [
                { provide: AuthService, useValue: authServiceMock },
                { provide: Router, useValue: routerMock }
            ]
        });
    });

    it('Should be created', () => {
        expect(executeGuard).toBeTruthy();
    });

    it('should return true and navigate when user is logged in', () => {
        //Simuilar que el usuario está logueado
        authServiceMock.isLoggedIn.and.returnValue('true');
        const CanActivateFn = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

        expect(CanActivateFn).toBe(true);
        expect(routerMock.navigate).not.toHaveBeenCalled();
    });

    
    it('should return false and navigate when user is not logged in', () => {
        //Simuilar que el usuario no está logueado
        authServiceMock.isLoggedIn.and.returnValue(null);
        const CanActivateFn = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
        expect(CanActivateFn).toBe(false);
       expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    });


});