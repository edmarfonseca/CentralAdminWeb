import { Component, ViewChild } from '@angular/core';
import { MensagemModalComponent } from '../../shared/mensagem-modal/mensagem-modal.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-clientes',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MensagemModalComponent
  ],
  templateUrl: './editar-clientes.component.html',
  styleUrl: './editar-clientes.component.css'
})
export class EditarClientesComponent {

  @ViewChild(MensagemModalComponent) mensagemModal!: MensagemModalComponent;

  isPF: boolean = true;
  ufs: any[] = [];
  id: string = '';

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  form = new FormGroup({

    nome: new FormControl('', [
      Validators.required,
      Validators.maxLength(100)
    ]),

    cpfCnpj: new FormControl(),
    cpf: new FormControl(),
    cnpj: new FormControl(),

    logradouro: new FormControl('', [
      Validators.required,
      Validators.maxLength(100)
    ]),

    numero: new FormControl('', [
      Validators.required
    ]),

    complemento: new FormControl('', [
      Validators.maxLength(50)
    ]),

    bairro: new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ]),

    cidade: new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ]),

    uf: new FormControl('', [
      Validators.required,
      Validators.maxLength(2)
    ]),

    cep: new FormControl('', [
      Validators.required,
      Validators.maxLength(8)
    ])

  });

  get f() {
    return this.form.controls;
  }

  ngOnInit() {

    this.spinner.show();

    this.httpClient.get(environment.ufsApi)
    .subscribe({
      next: (data) => {
        this.ufs = data as any[];
        this.spinner.hide();
      }
    });

    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.httpClient.get(`${environment.clientesApi}/${this.id}`)
      .subscribe({
        next: (data) => {
          this.form.patchValue(data);

          this.isPF = (this.f.cpfCnpj.value.length === 11);

          if (this.isPF) {
            this.f.cpf.setValue(this.f.cpfCnpj.value);
          }
          else {
            this.f.cnpj.setValue(this.f.cpfCnpj.value);
          }

          this.spinner.hide();
        }
      })
  }

  onSubmit() {

    this.spinner.show();

    if (this.isPF) {
      this.f.cpfCnpj.setValue(this.f.cpf.value);
    }
    else {
      this.f.cpfCnpj.setValue(this.f.cnpj.value);
    }

    this.httpClient.put(`${environment.clientesApi}/${this.id}`, this.form.value)
      .subscribe({
        next: (data: any) => {
          this.spinner.hide();
          this.mensagemModal.exibirMensagem('Atualização realizada com sucesso!', 'success');
        },
        error: (e) => {
          this.mensagemModal.exibirMensagem(e.error.message, 'error');
          this.spinner.hide();
        }
      });
  }

  onSelecaoPessoa(isPessoaFisica: boolean): void {

    this.isPF = isPessoaFisica;

    if (this.isPF) {
      this.f.cpf.setValue('');
      this.f.cnpj.setValue('00000000000000');
    }
    else {
      this.f.cpf.setValue('00000000000');
      this.f.cnpj.setValue('');
    }
  }

  onConsultaCep(eCep: string | null): void {

    if (!eCep || eCep.length < 8) {
      this.mensagemModal.exibirMensagem('Informe o CEP corretamente antes de realizar a consulta.', 'warning');
      return;    
    }

    this.spinner.show();

    this.httpClient.get(`https://viacep.com.br/ws/${eCep}/json/`)
      .subscribe({
        next: (data: any) => {

          this.form.patchValue({
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            uf: data.uf
          });

          this.spinner.hide();
        },
        error: (e) => {
          this.mensagemModal.exibirMensagem('Consulta ao CEP falhou!', 'error');
          this.spinner.hide();
        }
      });
  }
}