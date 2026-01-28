import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Agregamos RouterModule para el link
import { AuthService } from '../../core/services/auth';
import { RegistroData } from '../../core/services/Models/restaurant.interface';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Necesitas RouterModule para routerLink
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Signals que tu HTML está pidiendo
  isLoading = signal(false);
  errorMessage = signal('');
  isEditing = signal(false); // Cambiado a signal para que el @if funcione
  userData = signal<RegistroData>({
    restaurantName: '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    password: ''
  });

  // El HTML llama a onRegister(registerForm)
  async onRegister(form: NgForm) {
    if (form.invalid) return;

    // Validación básica de contraseñas
    if (form.value.password !== form.value.password2) {
      this.errorMessage.set('Las contraseñas no coinciden.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      // Usamos el servicio para registrar
      const success = await this.authService.register(form.value);
      if (success) {
        this.router.navigate(['/restaurant-list']);
      }
    } catch (error) {
      this.errorMessage.set('Error al intentar registrarse.');
    } finally {
      this.isLoading.set(false);
    }
  }
}