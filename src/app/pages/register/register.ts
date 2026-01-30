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

  // Signals para reactividad (visto en la materia LND 2025)
  isEditing = signal(false); 
  isLoading = signal(false);
  errorMessage = signal('');

  async onRegister(form: NgForm) {
    // 1. Validar que el formulario de Template Driven sea válido
    if (form.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      // 2. Enviar los datos capturados en el HTML (userName, name, password)
      const success = await this.authService.register(form.value);
      
      if (success) {
        console.log('✅ Registro exitoso');
        // 3. Redirigir al login para que el usuario ingrese sus nuevas credenciales
        this.router.navigate(['/login']);
      } else {
        this.errorMessage.set('No se pudo completar el registro. Intentalo de nuevo.');
      }
    } 
    catch (error) {
      console.error('Error en el registro:', error);
      this.errorMessage.set('Error de conexión con el servidor.');
    } finally {
      this.isLoading.set(false);
    }
  }
}