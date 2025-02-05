import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CryptoService } from '../services/crypto.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private cryptoService: CryptoService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const endpoints = [environment.sistemasApi];

        if (endpoints.some((e) => request.url.includes(e))) {
            const data = sessionStorage.getItem('user-auth');

            if (data) {
                const { criptografado, iv } = JSON.parse(data); // Pegando criptografia + IV

                return from(this.cryptoService.decrypt(criptografado, iv)).pipe(
                    switchMap((decryptedData) => {
                        const usuario = JSON.parse(decryptedData);

                        const cloneRequest = request.clone({
                            setHeaders: { Authorization: `Bearer ${usuario.accessToken}` },
                        });

                        return next.handle(cloneRequest);
                    })
                );
            }
        }

        return next.handle(request);
    }
}