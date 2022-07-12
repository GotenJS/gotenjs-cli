const authToRoutes = () => {
    return {
        imports,
        routes
    };
};

const imports = () => `
import { AuthGuardService as AuthGuard } from './auth/authGuard.service';
import { LoginComponent } from './auth/login.component';
`;

const routes = () => `
{ path: 'login', component: LoginComponent },
`;
module.exports = authToRoutes;