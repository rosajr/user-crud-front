import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root' })
export class UserService {
    private readonly URL = 'http://localhost:8080/users' 
    constructor(private http: HttpClient) { }

    save(user: object) {
        return this.http.post(`${this.URL}`, user)
    }
}