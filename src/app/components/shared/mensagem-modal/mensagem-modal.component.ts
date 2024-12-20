import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mensagem-modal',
  imports: [
    CommonModule
  ],
  templateUrl: './mensagem-modal.component.html',
  styleUrls: ['./mensagem-modal.component.css']
})
export class MensagemModalComponent {

  timeShow: number = 5000;

  success: string = '';
  warning: string = '';
  error: string = '';

  ShowSuccess(message: string): void {
    this.success = message;
    setTimeout(() => this.success = '', this.timeShow);
  }

  ShowWarning(message: string): void {
    this.warning = message;
    setTimeout(() => this.warning = '', this.timeShow);
  }

  ShowError(message: string): void {
    this.error = message;
    setTimeout(() => this.error = '', this.timeShow);
  }
}