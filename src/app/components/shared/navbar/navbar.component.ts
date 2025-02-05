import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAuthService } from '../../../services/userauth.service';

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
  isAuthenticated: boolean = false;

  constructor(
    private userAuth: UserAuthService
  ) { }

  async ngOnInit() {
    const usuario = await this.userAuth.getUser();

    if (usuario != null) {
      this.nomeUsuario = JSON.parse(usuario).nome;
      this.iniciais = this.getIniciais(this.nomeUsuario);
      this.isAuthenticated = true;
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