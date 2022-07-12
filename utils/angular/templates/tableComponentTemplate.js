const utils = require("../utils");

const tableComponentTexts = (name, options) => {
    return {
        html: html(name, options),
        ts: ts(name),
    };
};

const ts = (name) => {
    const lowerName = name.toLowerCase();
    return () => {
        return `import { Component, Input } from '@angular/core';
import { ${name}Service } from '../../../services/${lowerName}.service';

import { ${name}DTO } from '../../../dtos/${lowerName}.dto';
import { ${name}Response } from 'src/app/dtos/responses/${lowerName}.response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ${name}ModalComponent } from '../${lowerName}-modal/${lowerName}-modal.component';

@Component({
    selector: '${lowerName}-table',
    templateUrl: './${lowerName}-table.component.html',
    styleUrls: ['./${lowerName}-table.component.scss'],
})
export class ${name}TableComponent {
    @Input() public ${lowerName}s: Array<${name}DTO>;

    constructor(
        private ${lowerName}Service: ${name}Service,
        private modalService: NgbModal,
    ) {}

    show${name}(${lowerName}Id: any): void {
        const modal: ${name}ModalComponent = this.modalService.open(${name}ModalComponent, { size: 'lg' }).componentInstance;
        modal.${lowerName}$ = this.${lowerName}Service.fetch${name}(${lowerName}Id);
        modal.disabled = true;
    }

    edit${name}(${lowerName}Id: any): void {
        const modalRef = this.modalService.open(${name}ModalComponent, { size: 'lg' });
        const modal: ${name}ModalComponent = modalRef.componentInstance;
        modal.${lowerName}$ = this.${lowerName}Service.fetch${name}(${lowerName}Id);
        modalRef.result
            .then(${lowerName} => {
                const editSubscription = this.${lowerName}Service.edit${name}(${lowerName}, ${lowerName}Id).subscribe(
                    (response: ${name}Response) => {
                        const index = this.${lowerName}s.findIndex((${lowerName}Item: ${name}DTO) => ${lowerName}Item.id === ${lowerName}Id);
                        this.${lowerName}s.splice(index, 1, response.data);
                        editSubscription.unsubscribe();
                    }
                );
            })
            .catch(_=>{});
    }

    delete${name}(${lowerName}Id): void {
        const deleteSubscription = this.${lowerName}Service.delete${name}(${lowerName}Id).subscribe(
            response => {
                const index = this.${lowerName}s.findIndex((${lowerName}) => ${lowerName}.id === response.data.id);
                this.${lowerName}s.splice(index, 1);
                deleteSubscription.unsubscribe();
            }
        );
    }
}
`;
    };
};

const html = (name, options) => {
    const lowerName = name.toLowerCase();
    const props = options.props.filter(prop =>  utils.isNativeProp(prop)).map(prop => utils.getFormatPropertyName(prop));
    const propsLists = options.props.filter(prop =>  utils.isArrayProp(prop)).map(prop => utils.getFormatPropertyName(prop));
    return () => {
        return `<table class="table table-hover">
    <thead>
        <tr>
            ${props.map(prop => "<th>" + utils.capitalizeString(prop) + "</th>").join("\n\t\t\t")}
            ${propsLists.map(prop => "<th>" + utils.capitalizeString(prop) + "</th>").join("\n\t\t\t")}
            <th></th>
        </tr>
    </thead>
    <tbody *ngIf="${lowerName}s">
        <tr *ngFor="let ${lowerName} of ${lowerName}s">
            ${props.map(prop => "<td>\n\t\t\t\t{{" + lowerName + "." + prop + "}}\n\t\t\t</td>").join("\n\t\t\t")}
            ${propsLists.map(prop => "<td>\n\t\t\t\t{{" + lowerName + "." + prop + ".length}}\n\t\t\t</td>").join("\n\t\t\t")}
            <td>
                <button class="btn btn-link" (click)="show${name}(${lowerName}.id)">
                    <fa-icon [icon]="['fas', 'search']"></fa-icon>
                </button>
                <button class="btn btn-link" (click)="edit${name}(${lowerName}.id)">
                    <fa-icon [icon]="['fas', 'pencil-alt']"></fa-icon>
                </button>
                <goten-confirm-button [modalBody]="'eliminar ${lowerName}'" [modalTitle]="'Borrar'" (confirm)="delete${name}(${lowerName}.id)"
                 [class]="'btn btn-link'">
                    <fa-icon [icon]="['fas', 'trash-alt']"></fa-icon>
                </goten-confirm-button>
            </td>
        </tr>
    </tbody>
</table>`;
    };
};

module.exports = tableComponentTexts;