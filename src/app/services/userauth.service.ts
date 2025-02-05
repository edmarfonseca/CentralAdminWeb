import { Injectable } from '@angular/core';
import { CryptoService } from './crypto.service';

@Injectable({
    providedIn: 'root'
})

export class UserAuthService {

    constructor(
        private crypto: CryptoService
    ) { }

    async getUser(): Promise<string | null> {
        const data = sessionStorage.getItem('user-auth');

        if (data) {
            const parsedData = JSON.parse(data);

            if (parsedData.criptografado && parsedData.iv) {
                const usuario = await this.crypto.decrypt(parsedData.criptografado, parsedData.iv);
                return usuario;
            }
        }

        return null;
    }
}