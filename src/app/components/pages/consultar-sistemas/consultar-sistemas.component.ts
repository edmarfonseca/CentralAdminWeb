import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { DeleteModalComponent } from '../../shared/delete-modal/delete-modal.component';
import { MensagemModalComponent } from '../../shared/mensagem-modal/mensagem-modal.component';

@Component({
  selector: 'app-consultar-sistemas',
  imports: [
    CommonModule,
    RouterLink,
    NgxPaginationModule,
    DeleteModalComponent,
    MensagemModalComponent
  ],
  templateUrl: './consultar-sistemas.component.html',
  styleUrl: './consultar-sistemas.component.css'
})
export class ConsultarSistemasComponent {

  @ViewChild(MensagemModalComponent) mm!: MensagemModalComponent;

  sistemas: any[] = [];
  pagina: number = 1;
  selectedId: string = '';
  messageDelete: string = '';

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

  setParamDelete(id: string, codigo: string, nome: string) {

    this.selectedId = id;
    this.messageDelete = 'Código: ' + codigo + '<br>' + nome;
  }

  onDelete() {

    this.spinner.show();

      this.httpClient.delete(`${environment.sistemasApi}/${this.selectedId}`)
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
}