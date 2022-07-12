const gotenConfirmButtonText = () => {
    return `import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/internal/Observable';

const defaultBody = '¿Está seguro?';
const defaultTitle = 'Confirmar';

@Component({
    selector: 'modal-confirm',
    template: \`<div class="modal-header">
  <h4 class="modal-title">{{title}}</h4>
  <button type="button" class="close" aria-label="Close" (click)="close(false)">
      <span aria-hidden="true">&times;</span>
  </button>
</div>
<div class="modal-body">
  <div class="row">
      <div class="col-md-12">
        {{body}}
      </div>
  </div>
</div>
<div class="modal-footer">
  <button type="button" class="btn btn-default" (click)="close(false)">Cancelar</button>
  <button type="button" class="btn btn-danger" (click)="close(true)">Eliminar</button>
</div>\`,
})
export class GotenConfirmButtonModalComponent {

    @Input() public title: string;
    @Input() public body: string;

    constructor(
        public activeModal: NgbActiveModal,
    ) {}

    close(ok: boolean): void {
        this.activeModal.close(ok);
    }
}

@Component({
    selector: 'goten-confirm-button',
    template: \`<button class="{{class}}"
  (click)="open()"
>
  <ng-content></ng-content>
</button>\`,
})
export class GotenConfirmButtonComponent {

    @Input() public modalBody: string;
    @Input() public modalTitle: string;
    @Input() public class: string;
    @Output() public confirm: EventEmitter<void>;
    constructor(
        private modalService: NgbModal,
    ) {
        this.modalBody = defaultBody;
        this.modalTitle = defaultTitle;
        this.class = '';
        this.confirm = new EventEmitter<void>();
    }

    open(): void {
        const modalRef = this.modalService.open(GotenConfirmButtonModalComponent, { size: 'sm' });
        modalRef.componentInstance.title = this.modalTitle;
        modalRef.componentInstance.body = this.modalBody;
        modalRef.result
            .then(result => {
                if (result) {
                    this.confirm.emit();
                }
            })
            .catch(_=>{});
    }
}

`;
};

module.exports = gotenConfirmButtonText;

