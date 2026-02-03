import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { CategoriesService } from "../../core/services/category-service";
import { ProductService } from "../../core/services/product-service";
import { UsersService } from "../../core/services/user-service";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-ver-restaurante',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './restaurants-list.html', // Asegúrate que el nombre de archivo coincida
  styleUrl: './restaurants-list.scss'
})
export class VerRestaurante implements OnInit {
  private route = inject(ActivatedRoute);
  private categoriesService = inject(CategoriesService);
  private productService = inject(ProductService);
  private userService = inject(UsersService);

  isLoading = signal(true);
  restaurantName = signal('');
  products = signal<any[]>([]);
  categories = signal<any[]>([]);
  selectedCategoryId = signal<number | null>(null);

  filteredProducts = computed(() => {
    const id = this.selectedCategoryId();
    return id ? this.products().filter(p => Number(p.categoryId) === id) : this.products();
  });

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('idRestaurant'));
    if (id) {
      const user = await this.userService.getUsersbyId(id);
      this.restaurantName.set(user?.restaurantName || 'Restaurante');
      
      // Cargar categorías y productos en paralelo
      await Promise.all([
        this.categoriesService.getCategoriesByRestaurant(id),
        this.loadProducts(id)
      ]);
      
      this.categories.set(this.categoriesService.categories());
    }
    this.isLoading.set(false);
  }

  async loadProducts(id: number) {
    const prods = await this.productService.getProductbyrestaurant(id);
    this.products.set(prods);
  }

  calculateFinalPrice(prod: any) {
    return prod.discount ? prod.price * (1 - prod.discount / 100) : prod.price;
  }
}