const authToMenu = () => {
    return {
        imports,
        definition,
        constructor,
        behavior,
    };
};

const imports = () => `
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { Router } from '@angular/router';
`;
const definition = () => "public currentUser: User;";
const constructor = () => `private authenticationService: AuthService,
        private router: Router
`;
const behavior = () => `ngOnInit() {
        this.authenticationService.currentUser$.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
`;
module.exports = authToMenu;