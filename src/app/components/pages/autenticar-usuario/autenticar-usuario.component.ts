import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-autenticar-usuario',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './autenticar-usuario.component.html',
  styleUrl: './autenticar-usuario.component.css'
})
export class AutenticarUsuarioComponent {

  mensagemErro: string = '';

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  get f() {
    return this.form.controls;
  }

  onSubmit() {

    this.spinner.show();

    this.httpClient.post(`${environment.usuariosApi}/autenticar`, this.form.value)
      .subscribe({
        next: (data: any) => {
          sessionStorage.setItem('user-auth', JSON.stringify(data));
          location.href = '/pages/menu';
          this.spinner.hide();
        },
        error: (e) => {
          this.mensagemErro = e.error.message;
          this.spinner.hide();
        }
      })
  }

}