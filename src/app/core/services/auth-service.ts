// auth-service.ts
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from '../../interfaces/auth';
import { User } from '../../interfaces/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  
  currentUser = signal<User | null>(null);
  token = signal<string | null>(localStorage.getItem("token"));
  private revisionTokenInterval: any;

  constructor() {
    this.checkInitialSession();
  }

  isLoggedIn(): boolean {
    return !!this.token();
  }

  getUserId(): string | null {
    const currentToken = this.token();
    if (!currentToken) return null;
    try {
      const claims = this.parseJwt(currentToken);
      return claims.sub || claims.id || null;
    } catch { return null; }
  }

  private checkInitialSession() {
    const savedToken = this.token();
    if (savedToken) {
      try {
        const userData = this.parseJwt(savedToken);
        this.currentUser.set(userData);
        this.startTokenRevision();
      } catch (e) { this.logout(); }
    }
  }

  async login(loginData: any): Promise<boolean> {
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
        this.currentUser.set(this.parseJwt(responseData.token));
        this.startTokenRevision();
        return true;
      }
      return false;
    } catch { return false; }
  }

  async register(data: any): Promise<boolean> {
    const res = await fetch("https://w370351.ferozo.com/api/users", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.ok;
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
    return JSON.parse(window.atob(base64));
  }

  private startTokenRevision() {
    if (this.revisionTokenInterval) clearInterval(this.revisionTokenInterval);
    this.revisionTokenInterval = setInterval(() => {
      const currentToken = this.token();
      if (currentToken) {
        const claims = this.parseJwt(currentToken);
        if (claims.exp * 1000 < Date.now()) this.logout();
      }
    }, 10000);
  }
}