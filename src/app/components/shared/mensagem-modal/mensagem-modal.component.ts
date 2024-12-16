import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-mensagem-modal',
  imports: [CommonModule],
  templateUrl: './mensagem-modal.component.html',
  styleUrls: ['./mensagem-modal.component.css']
})
export class MensagemModalComponent implements OnChanges {
  @Input() success: string = '';
  @Input() warning: string = '';
  @Input() error: string = '';

  // Detecta alterações nas entradas
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['success']?.currentValue) {
      this.closeAfterTimeout(() => this.success = '');
    }
    if (changes['warning']?.currentValue) {
      this.closeAfterTimeout(() => this.warning = '');
    }
    if (changes['error']?.currentValue) {
      this.closeAfterTimeout(() => this.error = '');
    }
  }

  // Configura o timeout de 5 segundos
  private closeAfterTimeout(callback: () => void): void {
    setTimeout(() => callback(), 5000);
  }
}