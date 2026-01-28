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

  try {
    const success = await this.authService.login(form.value);
    if (success) {
      // REDIRECCIÓN DIRECTA: Cambiá '/home' por la ruta de tu lista
      this.router.navigate(['/restaurant-list']); 
    } else {
      this.errorMessage.set('Credenciales incorrectas.');
    }
  } catch (error) {
    this.errorMessage.set('Error de conexión.');
  } finally {
    this.isLoading.set(false);
  }
}
}