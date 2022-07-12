const appComponentTexts = () => {
    return {
        html,
        ts,
    };
};

const ts = () => {
    return `import { Component } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);
// <app-component-imports>
// </app-component-imports>
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    // <app-component>
    // </app-component>
}
`;
};

const html = () => {
    return `<menu-tab></menu-tab>
<router-outlet></router-outlet>`;
};

module.exports = appComponentTexts;