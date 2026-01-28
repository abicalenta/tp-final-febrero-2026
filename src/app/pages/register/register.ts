import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  // 1. Cambiamos isEditing a un Signal para que el HTML funcione
  isEditing = signal(false); 
  
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal('');

  async onRegister(form: NgForm) {
    if (form.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
    
      const result = await this.authService.register(form.value);
      
      if (result) {
        this.router.navigate(['/login']);
      }
      if (success) {
      // 2. Si se guardó bien, vamos al login para que entre
      this.router.navigate(['/login']);

    } catch (error) {
      this.errorMessage.set('Error al crear la cuenta. El email podría ya estar registrado.');
    } finally {
      this.isLoading.set(false);
    }
  }
  }
}