const appRoutesText = () => {
    return `import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component/home.component';
// <imports>
// </imports>

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
// <routes>
// </routes>
    { path: '**', redirectTo: 'home' },
];

export const AppRoutes = RouterModule.forRoot(appRoutes);
`;
};

module.exports = appRoutesText;
