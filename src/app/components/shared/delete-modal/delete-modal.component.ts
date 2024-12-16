import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
})
export class DeleteModalComponent {
  
  @Input() title: string = 'Confirma a exclusão do registro?';
  @Input() message: string = '';
  @Output() delete = new EventEmitter<void>();

  onDelete() {
    this.delete.emit();
  }
}