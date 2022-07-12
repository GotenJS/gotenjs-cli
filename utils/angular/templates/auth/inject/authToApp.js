const authToApp = () => {
    return {
        imports,
        behavior
    };
};

const imports = () => `
import { AuthService } from './auth/auth.service';
import { User } from './auth/user.model';
`;

const behavior = () => `currentUser: User;
    constructor(
        private authenticationService: AuthService
    ) {
        this.authenticationService.currentUser$.subscribe(x => {
            this.currentUser = x;
        });
    }
`;
module.exports = authToApp;