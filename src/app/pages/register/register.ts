import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FieldTree, form, FormOptions, SchemaOrSchemaFn } from '@angular/forms/signals';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})

  const isEditing = signal(false); 
  const isLoading = signal(false);
  const errorMessage = signal(false);

  async onRegister(form: NgForm) {
    if (form.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      const result = await this.authService.register(form.value);
      
      if (result) {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      this.errorMessage.set('Error al crear la cuenta. El email podría ya estar registrado.');
    } finally {
      this.isLoading.set(false);
    }
  }

function onRegister(form: { <TModel>(model: WritableSignal<TModel>): FieldTree<TModel>; <TModel>(model: WritableSignal<TModel>, schemaOrOptions: SchemaOrSchemaFn<TModel> | FormOptions): FieldTree<TModel>; <TModel>(model: WritableSignal<TModel>, schema: SchemaOrSchemaFn<TModel>, options: FormOptions): FieldTree<TModel>; }, NgForm: typeof NgForm) {
  throw new Error('Function not implemented.');
}
