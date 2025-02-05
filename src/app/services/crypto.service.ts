import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private chaveSecreta = environment.cryptoKey;

  constructor() {}

  private async gerarChave(): Promise<CryptoKey> {
    return await window.crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(this.chaveSecreta),
      { name: "AES-GCM" },
      false,
      ["encrypt", "decrypt"]
    );
  }

  async encrypt(texto: string): Promise<{ criptografado: string; iv: string }> {
    const chave = await this.gerarChave();
    const encoder = new TextEncoder();
    const data = encoder.encode(texto);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    const cipherText = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv },
      chave,
      data
    );

    return {
      criptografado: btoa(String.fromCharCode(...new Uint8Array(cipherText))),
      iv: btoa(String.fromCharCode(...iv))
    };
  }

  async decrypt(criptografado: string, ivBase64: string): Promise<string> {
    const chave = await this.gerarChave();
    const iv = new Uint8Array(atob(ivBase64).split("").map(c => c.charCodeAt(0)));
    const cipherText = new Uint8Array(atob(criptografado).split("").map(c => c.charCodeAt(0)));

    const decryptedData = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv },
      chave,
      cipherText
    );

    return new TextDecoder().decode(decryptedData);
  }
}