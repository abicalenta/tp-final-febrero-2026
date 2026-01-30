import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from '../../interfaces/auth';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  
  // Usamos Signals para reactividad moderna (visto en LND 2025)
  currentUser = signal<User | null>(null);
  token = signal<string | null>(localStorage.getItem("token"));
  
  private revisionTokenInterval: any;
  register: any;

  constructor() {
    this.checkInitialSession();
  }

  // Método requerido por el AuthGuard para validar acceso
  isLoggedIn(): boolean {
    return !!this.token();
  }

  // Recupera el ID del usuario desde el JWT
  getUserId(): string | null {
    const currentToken = this.token();
    if (currentToken) {
      const claims = this.parseJwt(currentToken);
      return claims.sub;
    }
    return null;
  }

  private checkInitialSession() {
    const savedToken = this.token();
    if (savedToken) {
      try {
        const userData = this.parseJwt(savedToken);
        this.currentUser.set({
          id: userData.sub,
          name: userData.name || userData.unique_name || 'Usuario',
          email: userData.email
        } as unknown as User);
        this.startTokenRevision();
      } catch (e) {
        this.logout();
      }
    }
  }

  async login(loginData: LoginData): Promise<boolean> {
    try {
      const res = await fetch("https://w370351.ferozo.com/api/Authentication/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
      });

      if (res.ok) {
        const responseData = await res.json();
        localStorage.setItem("token", responseData.token);
        this.token.set(responseData.token);
        
        const userData = this.parseJwt(responseData.token);
        this.currentUser.set({
          id: userData.sub,
          name: userData.name || userData.unique_name || 'Usuario',
          email: userData.email
        } as unknown as User);

        this.startTokenRevision();
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  logout() {
    this.token.set(null);
    this.currentUser.set(null);
    localStorage.removeItem("token");
    if (this.revisionTokenInterval) clearInterval(this.revisionTokenInterval);
    this.router.navigate(["/login"]);
  }

  private parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  private startTokenRevision() {
    if (this.revisionTokenInterval) clearInterval(this.revisionTokenInterval);
    this.revisionTokenInterval = setInterval(() => {
      const currentToken = this.token();
      if (currentToken) {
        const claims = this.parseJwt(currentToken);
        if (new Date(claims.exp * 1000) < new Date()) this.logout();
      }
    }, 10000);
  }
}