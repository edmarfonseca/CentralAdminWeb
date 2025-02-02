import { Component } from '@angular/core';
//import * as CryptoJS from 'crypto-js';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  nomeUsuario: string = '';
  iniciais: string = '';
  menuAberto: boolean = false;
  isAuthenticated: boolean = false;

  ngOnInit() {

    const data = sessionStorage.getItem('user-auth') as string;

    if (data != null) {
      this.isAuthenticated = true;

      //const usuario = JSON.parse(CryptoJS.AES.decrypt(data, environment.cryptoKey).toString(CryptoJS.enc.Utf8));
      const usuario = JSON.parse(data);     

      this.nomeUsuario = usuario.nome;

      this.iniciais = this.getIniciais(this.nomeUsuario);
    }
  }

  getIniciais(nome: string): string {
    
    const partes = nome.trim().split(' ');
    return partes.length === 1 ? partes[0][0] : (partes[0][0] + partes[1][0]).toUpperCase();
  }

  logout() {

    sessionStorage.removeItem('user-auth');
    location.href = '/';
  }
}