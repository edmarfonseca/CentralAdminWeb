import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-consultar-clientes',
  imports: [
    CommonModule,
    RouterLink,
    NgxPaginationModule
  ],
  templateUrl: './consultar-clientes.component.html',
  styleUrl: './consultar-clientes.component.css'
})
export class ConsultarClientesComponent {

  clientes: any[] = [];
  pagina: number = 1;

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    this.spinner.show();

    this.httpClient.get(environment.clientesApi)
      .subscribe({
        next: (data) => {
          this.clientes = data as any[];
          this.spinner.hide();
        }
      });
  }

  onDelete(id: string, nome: string) {

    if (confirm(`Deseja realmente excluir o cliente ${nome}?`)) {

      this.spinner.show();

      this.httpClient.delete(`${environment.clientesApi}/${id}`)
        .subscribe({
          next: (data: any) => {
            this.spinner.hide();
            this.ngOnInit();
          }
        })
    }
  }

  handlePageChange(event: any) {
    this.pagina = event;
  }

  formatarCpfCnpj(cpfCnpj: string): string {
    if (!cpfCnpj) return '';

    if (cpfCnpj.length === 11) {
      return cpfCnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (cpfCnpj.length === 14) {
      return cpfCnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    return cpfCnpj;
  }
}