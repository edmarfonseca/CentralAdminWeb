import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consultar-sistemas',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './consultar-sistemas.component.html',
  styleUrl: './consultar-sistemas.component.css'
})
export class ConsultarSistemasComponent {

  sistemas: any[] = [];

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    this.spinner.show();

    this.httpClient.get(environment.sistemasApi)
      .subscribe({
        next: (data) => {
          this.sistemas = data as any[];
          this.spinner.hide();
        }
      });
  }

  onDelete(id: string, nome: string) {
    
    if (confirm(`Deseja realmente excluir o sistema ${nome}?`)) {

      this.spinner.show();

      this.httpClient.delete(`${environment.sistemasApi}/${id}`)
        .subscribe({
          next: (data: any) => {
            this.spinner.hide();
            this.ngOnInit();
          }
        })
    }

  }
}