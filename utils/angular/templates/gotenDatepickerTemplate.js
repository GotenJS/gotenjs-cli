const gotenDatepickerTexts = () => {
    return {
        html,
        ts,
    };
};

const ts = () => {
    return `import { Component, Input } from '@angular/core';
import { GotenNgModel, MakeProvider } from 'goten-ngmodel';

@Component({
    selector: 'goten-datepicker',
    templateUrl: './goten.datepicker.component.html',
    providers: [
        MakeProvider(GotenDatepikerComponent),
    ],
})
export class GotenDatepikerComponent extends GotenNgModel<Date> {
    @Input() public name: string;
}
`;
};

const html = () => {
    return `<input class="form-control" type="date" name="name" [ngModel]="value | date:'yyyy-MM-dd'" (ngModelChange)="value = $event">`;
};

module.exports = gotenDatepickerTexts;