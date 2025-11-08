import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const isUserauthenticated : CanActivateFn = (route, state) => {
    // Here you would typically inject the AuthService to check the user's authentication status
    // For this example, we'll simulate the check
    const authService= inject(AuthService);
    const router= inject(Router);
    const IsLoggedIn = authService.isLoggedIn();
    if (!IsLoggedIn) {
        router.navigate(['/login']);
        //router.parseUrl('/login');
        return false;
    }
    return true;
}