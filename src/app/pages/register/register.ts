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
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal('');

  async onRegister(form: NgForm) {
    if (form.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      // 'as any' para evitar el error de tipo unknown en el TP
      const result = await (this.authService.register(form.value) as any);
      
      if (result) {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      this.errorMessage.set('Error al crear la cuenta. El email podría ya estar registrado.');
    } finally {
      this.isLoading.set(false);
    }
  }
}