import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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
    this.errorMessage.set(''); // Limpiamos errores previos

    try {
      console.log('Intentando iniciar sesión con:', form.value.userName);
      const success = await this.authService.login(form.value);

      if (success) {
        console.log('✅ Login exitoso. Redirigiendo...');
        // FIX: Cambiamos 'restaurant-list' por 'restaurante' para coincidir con app.routes.ts
        this.router.navigate(['/restaurante']); 
      } else {
        this.errorMessage.set('Credenciales incorrectas. Verificá tu usuario y contraseña.');
      }
    } catch (error) {
      console.error('Error en el proceso de login:', error);
      this.errorMessage.set('Error de conexión con el servidor.');
    } finally {
      this.isLoading.set(false);
    }
  }
}