const utils = require("../utils");
const pluralize = require("pluralize");

const modalComponentTexts = (name, options) => {
    return {
        html: html(name, options),
        ts: ts(name, options),
    };
};

const ts = (name, options) => {
    const lowerName = name.toLowerCase();
    const propsList = options.props.filter(prop => utils.isArrayProp(prop)).map(prop => utils.format(prop));

    const dtoImports = [name + "DTO", ...options.internalModels.map(internalProp => utils.getFormatType(internalProp.className))];

    return () => {
        return `import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ${name}Response } from 'src/app/dtos/responses/${lowerName}.response';
import { Observable, of } from 'rxjs';
import { ${dtoImports.join(", ")}} from 'src/app/dtos/${lowerName}.dto';

@Component({
    selector: '${lowerName}-modal',
    templateUrl: './${lowerName}-modal.component.html',
    styleUrls: ['./${lowerName}-modal.component.scss'],
})
export class ${name}ModalComponent implements OnInit {
    public ${lowerName}$: Observable<${name}Response>;
    public disabled: boolean;

    constructor(
        public activeModal: NgbActiveModal,
    ) { }

    ngOnInit(): void {
        if (!this.disabled && !this.${lowerName}$) {
            const ${lowerName}Observable = new ${name}Response();
            ${lowerName}Observable.data = new ${name}DTO();
            this.${lowerName}$ = of(${lowerName}Observable);
        }
    }

    close() {
        this.activeModal.dismiss();
    }

    save(${lowerName}: ${name}DTO) {
        this.activeModal.close(${lowerName});
    }

${propsList.map(prop => {
    //TODO: revisar si está bien tener el capitalize.
        let name = pluralize.singular(utils.capitalizeString(prop.name));
        let type = utils.capitalizeString(prop.type);
        return `    new${name}(): ${type} {
        return ${(!utils.typeIsNative(prop.type) || utils.typeIsDate(prop.type)) ? "new" : ""} ${type}();
    }`;
    }).join("\n    ")}
}
`;
    };
};

const nativeList = (name, prop) => `<b>${utils.capitalizeString(prop)}</b>
                    <goten-list [(ngModel)]="${name}.${prop}" [newItem]="new${pluralize.singular(utils.capitalizeString(prop))}" [disabled]="disabled" [names]="['']">
                        <ng-template #show let-item>
                            <td>
                                <label>{{item}}</label>
                            </td>
                        </ng-template>
                        <ng-template #edit let-value let-i="i">
                            <td>
                                <input type="text" class="form-control" [(ngModel)]="value[i]">
                            </td>
                        </ng-template>
                    </goten-list>`;

const coustomList = (name, prop, type, internalModels) => {
    const internalModel = internalModels.find( internalModel => internalModel.className.toLowerCase() === type.toLowerCase());
    internalModel.props = internalModel.props.map(prop => utils.format(prop));
    return `<b>${utils.capitalizeString(prop)}</b>
                    <goten-list [(ngModel)]="${name}.${prop}" [newItem]="new${pluralize.singular(utils.capitalizeString(prop))}" [disabled]="disabled" [names]="[${internalModel.props.map(prop => "'"+prop.name+"'").join(", ")}]">
                        <ng-template #show let-item>
                            ${internalModel.props.map(prop => `<td><label>{{item.${prop.name}}}</label></td>`).join("\n\t\t\t\t\t\t\t")}
                        </ng-template>
                        <ng-template #edit let-value let-i="i">
                            ${internalModel.props.map(prop => "<td>" + inputs[prop.type.toLowerCase()]("value[i]", prop.name) + "</td>").join("\n\t\t\t\t\t\t\t")}
                        </ng-template>
                    </goten-list>`;
};

const defaultInput = (name, prop, type) => `<input type="${type}" class="form-control" [(ngModel)]="${name}.${prop}">`;

const inputs = {
    string: (name, prop) => defaultInput(name, prop, "text"),
    number: (name, prop) => defaultInput(name, prop, "number"),
    date: (name, prop) => `<goten-datepicker [name]="'${prop}'" [(ngModel)]="${name}.${prop}"></goten-datepicker>`,
    boolean: (name, prop) => `<goten-radio [name]="'${prop}'" [disabled]="disabled" [(ngModel)]="${name}.${prop}"></goten-radio>`,
};


const defaultInputAndLabel = (name, prop, type, prefixRef) => `<b>${utils.capitalizeString(prop)}</b>
                    <input type="${type}" class="form-control" [(ngModel)]="${name}.${prop}" *ngIf="!disabled else ${prefixRef}${prop}Ref">
                    <ng-template #${prefixRef}${prop}Ref>
                        <p>
                            {{ ${name}.${prop} }}
                        </p>
                    </ng-template>`;

const inputsAndLabels = {
    string: (name, prop, prefixRef = "") => defaultInputAndLabel(name, prop, "text", prefixRef),
    number: (name, prop, prefixRef = "") => defaultInputAndLabel(name, prop, "number", prefixRef),
    date: (name, prop, prefixRef = "") => `<b>${utils.capitalizeString(prop)}</b>
                    <goten-datepicker [name]="'${prop}'" [(ngModel)]="${name}.${prop}" *ngIf="!disabled else ${prefixRef}${prop}Ref"></goten-datepicker>
                    <ng-template #${prefixRef}${prop}Ref>
                        <p>
                            {{ ${name}.${prop} | date:"dd/MM/yyyy" }}
                        </p>
                    </ng-template>`,
    boolean: (name, prop, prefixRef = "") => `<b>${utils.capitalizeString(prop)}</b>
                    <br/>
                    <goten-radio [name]="'${prop}'" [disabled]="disabled" [(ngModel)]="${name}.${prop}"></goten-radio>`,
    array: (name, prop, type, internalModels, prefixRef = "") => utils.typeIsNative(type) ? nativeList(name, prop) : coustomList(name, prop, type, internalModels),
    custom: (name, prop, type, internalModels, prefixRef = "") => {
        const internalModel = internalModels.find( internalModel => internalModel.className.toLowerCase() === type.toLowerCase());
        return `\t\t\t\t<div class="col-md-12">
                    <h5>${utils.capitalizeString(prop)}</h5>
                </div>
                ${internalModel.props.map(internalProp => `<div class="col-md-4 form-group">
                    ${inputsAndLabels[utils.getFormatTypeOfProperty(internalProp).toLowerCase()](`${name}.${prop}`, utils.getFormatPropertyName(internalProp), prop)}
                </div>`).join("\n")}`;},
};

const html = (name, options) => {
    const lowerName = name.toLowerCase();
    const formatProps = options.props.map(prop => utils.format(prop));
    const props = formatProps.filter(prop => !prop.isArray && !prop.isCustom);
    const propsList = formatProps.filter(prop => prop.isArray);
    const propsCustom = formatProps.filter(prop => prop.isCustom && !prop.isArray);
    return () => {
        return `<div class="modal-header">
    <h4 class="modal-title">${name}</h4>
    <button type="button" class="close" aria-label="Close" (click)="close()">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
<ng-container *ngIf="(${lowerName}$ | async) as ${lowerName}Response">
    <ng-container *ngIf="${lowerName}Response.data as ${lowerName}">
        <div class="modal-body">
            <div class="row">
            ${props.map(prop => "<div class=\"col-md-4 form-group\">" + inputsAndLabels[prop.type.toLowerCase()](lowerName, prop.name) + "\n\t\t\t\t</div>").join("\n\t\t\t\t")}
            ${propsList.map(prop => "<div class=\"col-md-12 form-group\">" + inputsAndLabels["array"](lowerName, prop.name, prop.type, options.internalModels) + "\n\t\t\t\t</div>").join("\n\t\t\t\t")}
            </div>
            ${propsCustom.map(prop => "<div class=\"row\">\n" + inputsAndLabels["custom"](lowerName, prop.name, prop.type, options.internalModels) + "\n\t\t\t</div>").join("\n\t\t\t\t")}
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" (click)="close()">Cerrar</button>
            <button type="button" class="btn btn-primary" (click)="save(${lowerName})" *ngIf="!disabled">Guardar</button>
        </div>
    </ng-container>
</ng-container>`;
    };
};

module.exports = modalComponentTexts;