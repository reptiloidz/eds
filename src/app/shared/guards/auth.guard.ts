import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

export const AuthGuard: CanActivateFn = (): Observable<boolean> | Promise<boolean> | boolean => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.anticipated$.getValue()) {
        return true;
    } else {
        router.navigate(['login']);
        return false;
    }
}
