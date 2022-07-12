const gotenListTexts = () => {
    return {
        html,
        ts,
    };
};

const ts = () => {
    return `import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { GotenNgModel, MakeProvider } from 'goten-ngmodel';

@Component({
    selector: 'goten-list',
    templateUrl: './goten.list.component.html',
    providers: [
        MakeProvider(GotenListComponent),
    ],
})
export class GotenListComponent extends GotenNgModel<Array<any>> {
    @Input() public newItem: any;
    @Input() public disabled: boolean;
    @Input() public names: Array<string>;
    @ContentChild('show') show: TemplateRef<any>;
    @ContentChild('edit') edit: TemplateRef<any>;

    public addItem() {
        this.value.push(this.newItem());
    }

    public removeItem(i) {
        this.value.splice(i, 1);
    }

    trackByIndex(index: number, obj: any): any {
        return index;
    }
}
`;
};

const html = () => {
    return `<table class="table table-striped" *ngIf="value?.length > 0; else void">
    <thead>
        <tr>
            <th *ngFor="let name of names">{{name}}</th>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let item of value; let i = index; trackBy:trackByIndex;">
            <ng-container *ngIf="!disabled; then valuesEditRef; else itemRef"></ng-container>

            <ng-template #valuesEditRef>
                <ng-container *ngTemplateOutlet="edit, context:{ $implicit: value, i: i }"></ng-container>
                <td>
                    <button class="btn btn-link" (click)="removeItem(i)">
                        <fa-icon [icon]="['fas', 'trash-alt']"></fa-icon>
                    </button>
                </td>
            </ng-template>

            <ng-template #itemRef>
                <ng-container *ngTemplateOutlet="show, context:{ $implicit: item }"></ng-container>
            </ng-template>
        </tr>
    </tbody>
</table>
<ng-template #void>
    <br>
</ng-template>
<button (click)="addItem()" *ngIf="!disabled" class="btn btn-success">
    <fa-icon [icon]="['fas', 'plus']"></fa-icon>
</button>`;
};

module.exports = gotenListTexts;