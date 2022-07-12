const paginationComponentTexts = (name) => {
    return {
        html: html(name),
        ts: ts(name),
    };
};

const ts = (name) => {
    const lowerName = name.toLowerCase();
    return () => {
        return `import { Component, Input } from '@angular/core';
import { ${name}Service } from 'src/app/services/${lowerName}.service';
import { GotenPaginationComponent } from 'src/app/components/generics/goten.pagination.component/goten.pagination.component';

@Component({
    selector: '${lowerName}-pagination',
    templateUrl: './${lowerName}-pagination.component.html',
    styleUrls: ['./${lowerName}-pagination.component.scss'],
})
export class ${name}PaginationComponent {

    @Input() public total: number;
    @Input() public offset: number;
    @Input() public limit: number;

    constructor(
        private ${lowerName}Service: ${name}Service,
    ) { }

    public changePage${name}({ offset, limit }) {
        return this.${lowerName}Service.get${name}s(offset, limit);
    }
}
`;
    };
};

const html = (name) => {
    return () => {
        return `<goten-pagination [total]="total" [offset]="offset" [limit]="limit" (changePage)="changePage${name}($event)"></goten-pagination>`;
    };
};

module.exports = paginationComponentTexts;