import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mensagem-modal',
  imports: [CommonModule],
  templateUrl: './mensagem-modal.component.html',
  styleUrls: ['./mensagem-modal.component.css']
})
export class MensagemModalComponent {

  success: string = '';
  warning: string = '';
  error: string = '';

  exibirMensagem(mensagem: string, tipo: 'success' | 'warning' | 'error'): void {
    if (tipo === 'success') {
      this.success = mensagem;
    } else if (tipo === 'warning') {
      this.warning = mensagem;
    } else if (tipo === 'error') {
      this.error = mensagem;
    }

    setTimeout(() => {
      if (tipo === 'success') this.success = '';
      if (tipo === 'warning') this.warning = '';
      if (tipo === 'error') this.error = '';
    }, 5000);
  }
}