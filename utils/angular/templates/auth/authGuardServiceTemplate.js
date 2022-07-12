const serviceText = () => {
    return `import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authService.isLoggedIn()) {
            this.goToLogin(state);
            return false;
        }
        return true;
    }
    goToLogin(state) {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    }
}
`;
};

module.exports = serviceText;
