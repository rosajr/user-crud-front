import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root' })
export class ZipCodeService {
    private readonly URL = 'https://viacep.com.br/ws' 
    constructor(private http: HttpClient) { }

    getCep(cep: number) {
        return this.http.get(`${this.URL}/${cep}/json`)
    }
}