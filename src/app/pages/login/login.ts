import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginData } from '../../core/services/auth';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal('');

  async onLogin(form: NgForm) {
    if (form.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    const credentials: LoginData = form.value;

    try {
      const success = await this.authService.login(credentials);
      if (success) {
        this.router.navigate(['/restaurant-list']); // Ruta definida en los requerimientos
      } else {
        this.errorMessage.set('Credenciales incorrectas. Intentá de nuevo.');
      }
    } catch (error) {
      this.errorMessage.set('Error de conexión con el servidor.');
    } finally {
      this.isLoading.set(false);
    }
  }
}