import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-editar-sistemas',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './editar-sistemas.component.html',
  styleUrl: './editar-sistemas.component.css'
})
export class EditarSistemasComponent {

  mensagemSucesso: string = '';
  mensagemErro: string = '';
  id: string = '';

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
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

  ngOnInit() {

    this.spinner.show();

    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.httpClient.get(`${environment.sistemasApi}/${this.id}`)
      .subscribe({
        next: (data) => {
          this.form.patchValue(data); //preenchendo o formulário
          this.spinner.hide();
        }
      })

  }

  onSubmit() {

    this.mensagemSucesso = '';
    this.mensagemErro = '';

    this.spinner.show();

    this.httpClient.put(`${environment.sistemasApi}/${this.id}`, this.form.value)
      .subscribe({
        next: (data: any) => {
          this.spinner.hide();
          this.mensagemSucesso = `Atualização realizada com sucesso!`;
        },
        error: (e) => {
          this.mensagemErro = e.error.message;
          this.spinner.hide();
        }
      });
  }
}