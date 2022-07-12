const gotenPaginationTexts = () => {
    return {
        html,
        ts,
    };
};

const ts = () => {
    return `import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
    selector: 'goten-pagination',
    templateUrl: './goten.pagination.component.html',
})
export class GotenPaginationComponent implements OnInit {

    @Input() public total: number;
    @Input() public offset: number;
    @Input() public limit: number;
    @Output() public changePage: EventEmitter<any>;
    public list: Array<any>;
    public page: number;
    public get totalPages(): number {
        return Math.ceil(this.total / this.limit);
    }

    constructor() {
        this.changePage = new EventEmitter<any>();
    }

    ngOnInit(): void {
        this.list = new Array(this.totalPages);
        this.page = Math.ceil((this.total / this.limit) - (this.total - this.offset) / this.limit);
    }

    public changePageAction(page: number) {
        const offset = page * this.limit;
        this.changePage.emit({ offset, limit: this.limit });
    }
}
`;
};

const html = () => {
    return `<nav>
    <ul class="pagination">
        <li class="page-item" [ngClass]="{'disabled':page === 0}">
            <a class="page-link" (click)="changePageAction(0)">&#60;&#60;</a>
        </li>
        <li class="page-item" [ngClass]="{'disabled':page === 0}">
            <a class="page-link" (click)="changePageAction(page-1)">&#60;</a>
        </li>
        <li *ngFor="let _ of list; let i = index" class="page-item" [ngClass]="{'active':page===i}">
            <a class="page-link" (click)="changePageAction(i)">{{i+1}}</a>
        </li>
        <li class="page-item" [ngClass]="{'disabled':page+1 === totalPages}">
            <a class="page-link" (click)="changePageAction(page+1)">&#62;</a>
        </li>
        <li class="page-item" [ngClass]="{'disabled':page+1 === totalPages}">
            <a class="page-link" (click)="changePageAction(totalPages-1)">&#62;&#62;</a>
        </li>
    </ul>
</nav>`;
};

module.exports = gotenPaginationTexts;