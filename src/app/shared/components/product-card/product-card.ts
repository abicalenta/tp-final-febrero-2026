import { Component, inject, OnInit, viewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { FormsModule, NgForm } from '@angular/forms';
import { UsersService } from '../../../core/services/user-service';
import { AuthService } from '../../../core/services/auth-service';
import { CategoriesService } from '../../../core/services/category-service';
import { ProductService } from '../../../core/services/product-service';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class Productos implements OnInit {
  // Asegúrate de que los nombres de las clases en los archivos .ts sean estos
  userService = inject(UsersService); 
  productService = inject(ProductService);
  authService = inject(AuthService);
  categoriesService = inject(CategoriesService);
  router = inject(Router);
  route = inject(ActivatedRoute); 

  currentIdProduct: number | null = null; 
  productoOriginal: Product | undefined = undefined;
  form = viewChild<NgForm>('newProductForm');
  errorBack = false;
  isLoading = false;

  async ngOnInit() {
    this.isLoading = true; 
    try {
      const userId = Number(this.authService.getUserId());
      if (!isNaN(userId)) {
        await this.categoriesService.getCategoriesByRestaurant(userId);
      }

      const idParam = this.route.snapshot.paramMap.get('idProduct');
      if (idParam && idParam !== 'nuevo') {
        const id = Number(idParam);
        if (!isNaN(id)) {
          this.currentIdProduct = id; 
          this.productoOriginal = await this.productService.getProductById(id);
        }
      }
    } catch (e) {
      console.error('Error en ngOnInit:', e);
    } finally {
      this.isLoading = false;
    }
  }

  async handleFormSubmission(form: NgForm) {
    if (form.invalid) return; // Validación básica

    this.errorBack = false;
    this.isLoading = true;
    
    try {
      if (this.currentIdProduct) {
        // Lógica de actualización
        if (this.productoOriginal) {
          if (parseInt(form.value.discount) !== this.productoOriginal.discount) {
             await this.productService.toggleDiscount(this.currentIdProduct, { discount: parseInt(form.value.discount) });
          }
          if ((form.value.hasHappyHour === true) !== this.productoOriginal.hasHappyHour) {
             await this.productService.toggleHappyHour(this.currentIdProduct, { toggleHappyHour: form.value.hasHappyHour === true });
          }
        }
      } else {
        // Aquí deberías agregar la lógica para CREAR un producto si no hay currentIdProduct
        console.log("Creando producto nuevo...", form.value);
      }
    } catch (error) {
      this.errorBack = true;
      console.error('Error al enviar el formulario:', error);
    } finally {
      this.isLoading = false;
    }
  }
} 
