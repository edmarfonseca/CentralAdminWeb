import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensagemModalComponent } from '../../shared/mensagem-modal/mensagem-modal.component';

@Component({
  selector: 'app-cadastrar-clientes',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MensagemModalComponent
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './cadastrar-clientes.component.html',
  styleUrl: './cadastrar-clientes.component.css'
})
export class CadastrarClientesComponent {

  @ViewChild(MensagemModalComponent) mm!: MensagemModalComponent;

  isPF: boolean = true;
  ufs: any[] = [];

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) { }

  form = new FormGroup({

    nome: new FormControl('', [
      Validators.required,
      Validators.maxLength(100)
    ]),

    cpfCnpj: new FormControl(),

    cpf: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{11}$/)
    ]),

    cnpj: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{14}$/)
    ]),

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

    this.onSelecaoPessoa(this.isPF);

    this.httpClient.get(environment.ufsApi)
      .subscribe({
        next: (data) => {
          this.ufs = data as any[];
          this.spinner.hide();
        }
      });
  }

  onSubmit() {

    this.spinner.show();

    if (this.isPF) {
      this.f.cpfCnpj.setValue(this.f.cpf.value);
    }
    else {
      this.f.cpfCnpj.setValue(this.f.cnpj.value);
    }

    this.httpClient.post(environment.clientesApi, this.form.value)
      .subscribe({
        next: (data: any) => {
          this.mm.ShowSuccess('Cadastro realizado com sucesso!');
          this.form.reset();
          this.spinner.hide();
        },
        error: (e) => {
          this.mm.ShowError(e.error.message);
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
      this.mm.ShowWarning('Informe o CEP corretamente antes de realizar a consulta.');
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
          this.mm.ShowError('Consulta ao CEP falhou!');
          this.spinner.hide();
        }
      });
  }
}