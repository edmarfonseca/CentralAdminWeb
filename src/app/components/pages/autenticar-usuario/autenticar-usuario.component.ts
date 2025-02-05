import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensagemModalComponent } from '../../shared/mensagem-modal/mensagem-modal.component';
import { CryptoService } from '../../../services/crypto.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-autenticar-usuario',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MensagemModalComponent
  ],
  templateUrl: './autenticar-usuario.component.html',
  styleUrl: './autenticar-usuario.component.css'
})
export class AutenticarUsuarioComponent {

  @ViewChild(MensagemModalComponent) mm!: MensagemModalComponent;

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private crypto: CryptoService
  ) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    this.spinner.show();

    try {
      const data: any = await lastValueFrom(this.httpClient.post(`${environment.usuariosApi}/autenticar`, this.form.value));
      const usuario = await this.crypto.encrypt(JSON.stringify(data));

      sessionStorage.setItem('user-auth', JSON.stringify(usuario));

      location.href = '/pages/menu';
    } catch (e: any) {
      this.mm.ShowError(e.error.message);
    } finally {
      this.spinner.hide();
    }
  }
}