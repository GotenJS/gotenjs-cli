const gotenRadioTexts = () => {
    return {
        html,
        ts,
    };
};

const ts = () => {
    return `import { Component, Input } from '@angular/core';
import { GotenNgModel, MakeProvider } from 'goten-ngmodel';

@Component({
    selector: 'goten-radio',
    templateUrl: './goten.radio.component.html',
    providers: [
        MakeProvider(GotenRadioComponent)
    ]
})
export class GotenRadioComponent extends GotenNgModel<boolean> {
    @Input() public name: string;
    @Input() public both: boolean;
    @Input() public disabled: boolean;

    constructor() {
        super();
        this.both = false;
        this.disabled = false;
    }
}
`;
};

const html = () => {
    return `<div class="form-check form-check-inline" *ngIf="both">
    <input [name]="name" class="form-check-input" [disabled]="disabled" type="radio" [(ngModel)]="value">
    <label class="form-check-label" for="inlineCheckbox1">Ambos</label>
</div>
<div class="form-check form-check-inline">
    <input [name]="name" class="form-check-input" [disabled]="disabled" type="radio" [value]="true" [(ngModel)]="value">
    <label class="form-check-label" for="inlineCheckbox1">Si</label>
</div>
<div class="form-check form-check-inline">
    <input [name]="name" class="form-check-input" type="radio" [value]="false" [disabled]="disabled" [(ngModel)]="value">
    <label class="form-check-label" for="inlineCheckbox1">No</label>
</div>`;
};

module.exports = gotenRadioTexts;