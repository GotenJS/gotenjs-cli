const mainComponentTexts = (name) => {
    return {
        html: html(name),
        ts: ts(name),
    };
};

const ts = (name) => {
    const lowerName = name.toLowerCase();
    return () => {
        return `import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ${name}Service } from '../../../services/${lowerName}.service';
import { ${name}ModalComponent } from '../${lowerName}-modal/${lowerName}-modal.component';

@Component({
    selector: '${lowerName}s-tab',
    templateUrl: './${lowerName}s.component.html',
    styleUrls: ['./${lowerName}s.component.scss'],
    providers: [
        ${name}Service,
    ],
})
export class ${name}sComponent implements OnInit {
    constructor(
        private modalService: NgbModal,
        public ${lowerName}Service: ${name}Service,
    ) { }

    ngOnInit(): void {
        this.${lowerName}Service.get${name}s();
    }

    openCreateModal() {
        const modalRef = this.modalService.open(${name}ModalComponent, { size: 'lg' });
        const modal: ${name}ModalComponent = modalRef.componentInstance;
        modal.disabled = false;
        modalRef.result
            .then(${lowerName} => {
                if (${lowerName}) {
                    const createSubscription = this.${lowerName}Service.create${name}(${lowerName}).subscribe(
                        response => {
                            createSubscription.unsubscribe();
                            this.${lowerName}Service.get${name}s();
                        }
                    );
                }
            })
            .catch(_=>{});
    }

}
`;
    };
};

const html = (name) => {
    const lowerName = name.toLowerCase();
    return () => {
        return `<div class="row">
    <div class="col-md-8">
        <h2>${name}s</h2>
    </div>
    <div class="col-md-4">
        <button class="btn btn-success float-right" (click)="openCreateModal()">
            <fa-icon [icon]="['fas', 'plus']"></fa-icon> Nuevo
        </button>
        <br/>
        <br/>
    </div>
</div>
<${lowerName}-filter></${lowerName}-filter>
<br/>
<ng-container *ngIf="(${lowerName}Service.${lowerName}s$ | async) as response${name}s">
    <${lowerName}-table *ngIf="(response${name}s.data.list) as ${lowerName}s" [${lowerName}s]="${lowerName}s">
    </${lowerName}-table>

    <${lowerName}-pagination [total]="response${name}s.data.total" [offset]="response${name}s.data.offset" [limit]="response${name}s.data.limit"></${lowerName}-pagination>
</ng-container>`;
    };
};

module.exports = mainComponentTexts;