import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  nomeUsuario: string = '';
  isAuthenticated: boolean = false;

  ngOnInit() {

    const data = sessionStorage.getItem('user-auth') as string;

    if (data != null) {
      this.isAuthenticated = true;

      //const usuario = JSON.parse(CryptoJS.AES.decrypt(data, environment.cryptoKey).toString(CryptoJS.enc.Utf8));
      const usuario = JSON.parse(data).toString();

      this.nomeUsuario = usuario.nome;
    }
  }

  logout() {

    sessionStorage.removeItem('user-auth');
    location.href = '/';
  }
}