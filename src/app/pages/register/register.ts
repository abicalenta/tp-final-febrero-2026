import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Definimos signals para cumplir con Angular moderno
  isEditing = signal(false); 
  isLoading = signal(false);
  errorMessage = signal('');

  async onRegister(form: NgForm) {
    if (form.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      // Usamos form.value para enviar los datos al servicio
      const result = await this.authService.register(form.value);
      
      if (result) {
        // Redirección al login tras un registro exitoso
        this.router.navigate(['/login']);
      }
    } catch (error) {
      this.errorMessage.set('Error al procesar la solicitud.');
    } finally {
      this.isLoading.set(false);
    }
  }
}