import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-autenticar-usuario',
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './autenticar-usuario.component.html',
  styleUrl: './autenticar-usuario.component.css'
})
export class AutenticarUsuarioComponent {

  constructor(
    private httpClient: HttpClient
  ) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.httpClient.post(`${environment.usuariosApi}/autenticar`, this.form.value)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (e) => {
          console.log(e.error);
        }
      })
  }

}
