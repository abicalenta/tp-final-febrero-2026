import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginData } from './Models/restaurant.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getUserId() {
    throw new Error('Method not implemented.');
  }
  register(value: any): any {
    throw new Error('Method not implemented.');
  }
  private http = inject(HttpClient);
  
  usuarioLogueado = signal<boolean>(this.hasToken());

  
  private apiUrl = 'https://w370351.ferozo.com/swagger/index.html'; 
  token: any;

  login(datos: LoginData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, datos).pipe(
      tap(res => {
        // Si el login es exitoso, guardamos el token
        if (res && res.token) {
          localStorage.setItem('token', res.token);
          this.usuarioLogueado.set(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.usuarioLogueado.set(false);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
  }
}

