import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserAuthService } from '../services/userauth.service';

@Injectable({
    providedIn: 'root'
})

export class LoginGuard {

    constructor(
        private router: Router,
        private userAuth: UserAuthService
    ) { }

    async canActivate(): Promise<boolean> {
        const usuario = await this.userAuth.getUser();

        if (usuario != null) {
            const parseUsuario = JSON.parse(usuario);
            const dataExpiracao = new Date(parseUsuario.dataHoraExpiracao);
            const dataAtual = new Date();

            if (parseUsuario.accessToken && dataExpiracao > dataAtual) {
                this.router.navigate(['/pages/menu']);
                return false;
            }
        }

        return true;
    }
}