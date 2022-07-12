const appModuleText = () => {
    return `import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { GotenRadioComponent } from './components/generics/goten.radio.component/goten.radio.component';
import { GotenListComponent } from './components/generics/goten.list.component/goten.list.component';
import { GotenDatepikerComponent } from './components/generics/goten.datepicker.component/goten.datepicker.component';
import {
    GotenConfirmButtonComponent,
    GotenConfirmButtonModalComponent
} from './components/generics/goten.confirm.button.component/goten.confirm.button.component';
import { GotenPaginationComponent } from './components/generics/goten.pagination.component/goten.pagination.component';

import { HomeComponent } from './components/home.component/home.component';
import { MenuComponent } from './components/menu.component/menu.component';
import { AppRoutes } from './app.routes';

// <imports>
// </imports>

@NgModule({
    declarations: [
        AppComponent,
        GotenConfirmButtonComponent,
        GotenConfirmButtonModalComponent,
        GotenDatepikerComponent,
        GotenListComponent,
        GotenRadioComponent,
        GotenPaginationComponent,
        HomeComponent,
        MenuComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        FontAwesomeModule,
        HttpClientModule,
        AppRoutes,
        // <imports-module>
        // </imports-module>
    ],
    entryComponents: [
        GotenConfirmButtonModalComponent,
    ],
    providers: [
        // <imports-providers>
        // </imports-providers>
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
`;
};

module.exports = appModuleText;