import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/authService";

export const AuthGuard: CanActivateChildFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<boolean> | Promise<boolean> | boolean => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.authorized$.getValue()) {
        return true;
    } else {
        router.navigate(['login']);
        return false;
    }
}
