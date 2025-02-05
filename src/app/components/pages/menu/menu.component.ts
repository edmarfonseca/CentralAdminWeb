import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environments/environment';
import { MensagemModalComponent } from '../../shared/mensagem-modal/mensagem-modal.component';

@Component({
  selector: 'app-menu',
  imports: [
    MensagemModalComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  @ViewChild(MensagemModalComponent) mm!: MensagemModalComponent;

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  navMenu(apiEnvironment: string, navPage: string) {
    this.spinner.show();

    const apiUrl = environment[apiEnvironment as keyof typeof environment];

    this.httpClient.get(apiUrl)
      .subscribe({
        next: (data) => {
          this.spinner.hide();
          this.router.navigate([`/pages/${navPage}`]);
        },
        error: (e) => {
          this.spinner.hide();
          if (e.status === 401) {
            this.mm.ShowWarning('Usuário não autorizado.');
          }
          else {
            this.mm.ShowError(e.message);
          }
        }
      });
  }
}