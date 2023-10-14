import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

@Component({
  selector: 'app-my-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Titre de la modal</h4>
      <button type="button" class="close" (click)="activeModal.dismiss()">
        <span>&times;</span>
      </button>
    </div>
    <div class="modal-body">
      Contenu de la modal
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="activeModal.close()">Fermer</button>
    </div>
  `
})
export class ModalComponent {
  constructor(public activeModal: NgbActiveModal) {}
}
