import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensagemModalComponent } from '../../shared/mensagem-modal/mensagem-modal.component';

@Component({
  selector: 'app-cadastrar-sistemas',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MensagemModalComponent
  ],
  templateUrl: './cadastrar-sistemas.component.html',
  styleUrl: './cadastrar-sistemas.component.css'
})
export class CadastrarSistemasComponent {

  @ViewChild(MensagemModalComponent) mm!: MensagemModalComponent;

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) { }

  form = new FormGroup({

    codigo: new FormControl('', [
      Validators.required, Validators.maxLength(10)
    ]),

    nome: new FormControl('', [
      Validators.required, Validators.maxLength(50)
    ]),

    url: new FormControl('', [
      Validators.required, Validators.maxLength(250)
    ])
  });

  get f() {
    return this.form.controls;
  }

  onSubmit() {

    this.spinner.show();

    this.httpClient.post(environment.sistemasApi, this.form.value)
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
}