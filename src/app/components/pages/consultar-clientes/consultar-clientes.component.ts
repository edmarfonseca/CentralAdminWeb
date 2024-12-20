import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteModalComponent } from '../../shared/delete-modal/delete-modal.component';
import { MensagemModalComponent } from '../../shared/mensagem-modal/mensagem-modal.component';

@Component({
  selector: 'app-consultar-clientes',
  imports: [
    CommonModule,
    RouterLink,
    NgxPaginationModule,
    DeleteModalComponent,
    MensagemModalComponent
  ],
  templateUrl: './consultar-clientes.component.html',
  styleUrl: './consultar-clientes.component.css'
})
export class ConsultarClientesComponent {

  @ViewChild(MensagemModalComponent) mm!: MensagemModalComponent;

  clientes: any[] = [];
  pagina: number = 1;
  selectedId: string = '';
  messageDelete: string = '';

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

  setParamDelete(id: string, cpfCnpj: string, nome: string) {

    this.selectedId = id;

    if (cpfCnpj.length === 11) {
      this.messageDelete = 'CPF: '
    }
    else if (cpfCnpj.length === 14) {
      this.messageDelete = 'CNPJ: '
    }

    this.messageDelete = this.messageDelete + this.formatarCpfCnpj(cpfCnpj);
    this.messageDelete = this.messageDelete + '<br>' + nome;
  }

  onDelete() {

    this.spinner.show();

    this.httpClient.delete(`${environment.clientesApi}/${this.selectedId}`)
      .subscribe({
        next: (data: any) => {
          this.mm.ShowSuccess('Exclusão realizada com sucesso!');
          this.spinner.hide();
          this.ngOnInit();
        },
        error: (e) => {
          this.mm.ShowError(e.error.message);
          this.spinner.hide();
        }
      })
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