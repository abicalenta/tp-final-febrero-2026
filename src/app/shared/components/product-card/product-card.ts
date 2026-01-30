import { Component, inject, OnInit, viewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { FormsModule, NgForm } from '@angular/forms';
import { UsersService } from '../../../core/services/user-service';
import { AuthService } from '../../../core/services/auth-service';
import { CategoriesService } from '../../../core/services/category-service';
import { ProductService } from '../../../core/services/product-service';
import { Category } from '../../../interfaces/Category';
import { Product, NewProduct } from '../../../interfaces/product';

@Component({
  selector: 'app-productos',
  standalone: true, // Asegúrate de tener esto si usas imports
  imports: [FormsModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class Productos implements OnInit {
  restaurantService = inject(UsersService);
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
      // FIX: Convertimos el ID a número para evitar error ts(2345)
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
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  }

  async handleFormSubmission(form: NgForm) {
    this.errorBack = false;
    this.isLoading = true;

    // FIX: Convertimos el ID del restaurante a número para evitar error ts(2322)
    const restaurantId = Number(this.authService.getUserId());

    const nuevoProducto: NewProduct = {
      name: form.value.name,
      description: form.value.description,
      price: parseInt(form.value.price),
      featured: form.value.featured === true,
      recommendedFor: parseInt(form.value.recommendedFor),
      discount: parseInt(form.value.discount),
      hasHappyHour: form.value.hasHappyHour === true,
      categoryId: parseInt(form.value.categoryId),
      restaurantId: restaurantId, // Ahora es un número válido
      labels: [],
      isDestacado: form.value.featured === true,
      imageUrl: ''
    };

    try {
      let res;
      if (this.currentIdProduct) {
        // Lógica de actualización (toggles)
        if (this.productoOriginal && parseInt(form.value.discount) !== this.productoOriginal.discount) {
           await this.productService.toggleDiscount(this.currentIdProduct, { discount: parseInt(form.value.discount) });
        }
        if (this.productoOriginal && (form.value.hasHappyHour === true) !== this.productoOriginal.hasHappyHour) {
           await this.productService.toggleHappyHour(this.currentIdProduct, { toggleHappyHour: form.value.hasHappyHour === true });
        }
        if (this.productoOriginal && (form.value.featured === true) !== this.productoOriginal.isDestacado) {
          await this.productService.toggleDestacado(this.currentIdProduct, { isDestacado: form.value.featured === true });
        }
        
        res = await this.productService.editProduct({
          ...nuevoProducto,
          id: this.currentIdProduct
        });
      } else {
        res = await this.productService.addProduct(nuevoProducto);
      }

      if (!res) {
        this.errorBack = true;
      } else {
        this.router.navigate(["/perfiles"]);
      }
    } catch (error) {
      console.error(error);
      this.errorBack = true;
    } finally {
      this.isLoading = false;
    }
  }
}