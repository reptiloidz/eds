import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

export const LoginGuard: CanActivateFn = (): Observable<boolean> | Promise<boolean> | boolean => {
    const authService = inject(AuthService);
    const router = inject(Router);

    console.log(authService.user, 'from guard');
    if (!authService.anticipated$.getValue()) {
        return true;
    } else {
        router.navigate(['/']);
        return false;
    }
}
