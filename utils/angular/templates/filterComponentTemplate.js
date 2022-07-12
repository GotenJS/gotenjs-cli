const utils = require("../utils");

const filterComponentTexts = (name, options) => {
    return {
        html: html(name, options),
        ts: ts(name),
    };
};

const ts = (name) => {
    const lowerName = name.toLowerCase();
    return () => {
        return `import { Component, Injectable } from '@angular/core';
import { ${name}Service } from '../../../services/${lowerName}.service';

@Component({
    selector: '${lowerName}-filter',
    templateUrl: './${lowerName}-filter.component.html',
    styleUrls: ['./${lowerName}-filter.component.scss'],
})
export class ${name}FilterComponent {
    constructor(
        private ${lowerName}Service: ${name}Service
    ) {}

    public filter${name}s() {
        this.${lowerName}Service.get${name}s();
    }

}
`;
    };
};

const defInput = (name, prop, type) => `\n\t\t\t<b>${utils.capitalizeString(prop)}</b>\n\t\t\t<input type="${type}" class="form-control" name="'${prop}Filter'" [(ngModel)]="${name}Service.${name}Filter.${prop}">`;

const inputs = {
    string: (name, prop) => defInput(name, prop, "text"),
    number: (name, prop) => defInput(name, prop, "number"),
    date: (name, prop) => `\n\t\t\t<b>${utils.capitalizeString(prop)}</b>\n\t\t\t<goten-datepicker [name]="'${prop}Filter'" [(ngModel)]="${name}Service.${name}Filter.${prop}"></goten-datepicker>`,
    boolean: (name, prop) => `\n\t\t\t<b>${utils.capitalizeString(prop)}</b>\n\t\t\t<br>\n\t\t\t<goten-radio [name]="'${prop}Filter'" [both]="true" [(ngModel)]="${name}Service.${name}Filter.${prop}"></goten-radio>`
};

const html = (name, options) => {
    const lowerName = name.toLowerCase();
    const props = options.props.filter(prop => utils.isNativeProp(prop)).map(prop => utils.format(prop));
    return () => {
        return `<form (submit)="filter${name}s()">
    <div class="row">
        ${props.map(prop => "<div class=\"col-md-3 form-group\">" + inputs[prop.type.toLowerCase()](lowerName, prop.name) + "\n\t\t</div>").join("\n\t\t")}
    </div>
    <div class="row">
        <div class="col-md-12 form-group">
            <button type="submit" class="btn btn-primary">Buscar</button>
        </div>
    </div>
</form>`;
    };
};

module.exports = filterComponentTexts;