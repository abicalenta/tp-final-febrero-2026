import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/user';
import { Category } from '../../interfaces/Category';
import { Product } from '../../interfaces/product';
import { UsersService } from '../../core/services/user-service';
import { ProductService } from '../../core/services/product-service';
import { CategoriesService } from '../../core/services/category-service';

@Component({
  selector: 'app-ver-restaurante',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurants-list.html',
  styleUrl: './restaurants-list.scss',
})
export class VerRestaurante implements OnInit {
  
  // dependencias
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private usersService = inject(UsersService);
  private restaurantService = inject(ProductService);
  private categoriesService = inject(CategoriesService);

  // Estados con Signals
  isLoading = signal<boolean>(true);
  user = signal<User | undefined>(undefined);
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  selectedCategoryId = signal<number | null>(null);

  // Lógica de filtrado reactiva
  filteredProducts = computed(() => {
    const selectedId = this.selectedCategoryId();
    const currentProducts = this.products();
    
    console.log('%c🔄 [Computed] Filtrando productos...', 'color: #3498db', { 
      categoriaSeleccionada: selectedId, 
      totalProductos: currentProducts.length 
    });

    if (selectedId === null) {
      return currentProducts; 
    }
    return currentProducts.filter(p => p.categoryId === selectedId);
  });
authService: any;

  async ngOnInit() {
    // 1. Capturar el parámetro de la URL
    const idParam = this.route.snapshot.paramMap.get('idRestaurant');
    console.log('%c1. [ngOnInit] Parámetro idRestaurant de la URL:', 'color: #f1c40f', idParam);

    if (idParam) {
      const id = Number(idParam); 
  
      if (!isNaN(id)) {
        console.log('2. [ngOnInit] ID convertido a número correctamente:', id);
        await this.loadData(id);
      } else {
        console.error("❌ ERROR: El ID en la URL no es un número válido:", idParam);
        this.isLoading.set(false);
      }
    } else {
      console.error("❌ ERROR: No se encontró ':idRestaurant' en la ruta definida en app.routes.ts");
      this.isLoading.set(false);
    }
  }

  async loadData(id: number) {
    console.log('%c3. [loadData] Iniciando carga para el restaurante ID:', 'color: #2ecc71', id);
    this.isLoading.set(true);

    try {
      // Carga de Usuario
      console.log('4. [loadData] Buscando datos del restaurante...');
      let restaurantUser = this.usersService.users.find(r => r.id === id);
      
      if (!restaurantUser) {
        console.log('   -> No estaba en memoria local, llamando al servicio API...');
        restaurantUser = await this.usersService.getUsersbyId(id);
      }
      console.log('5. [loadData] Datos del restaurante recibidos:', restaurantUser);
      this.user.set(restaurantUser);

      //Carga de Productos
      console.log('6. [loadData] Cargando productos del restaurante...');
      const prods = await this.restaurantService.getProductbyrestaurant(id);
      console.log('7. [loadData] Productos cargados:', prods ? prods.length : 0, prods);
      this.products.set(prods || []);

      //Carga de Categorías 
      console.log('8. [loadData] Cargando categorías...');
      await this.categoriesService.getCategoriesByRestaurant(id);
      const currentCats = this.categoriesService.categories();
      console.log('9. [loadData] Categorías obtenidas del servicio:', currentCats);
      this.categories.set(currentCats);

    } catch (error) {
      console.error("❌ ERROR CRÍTICO cargando el menú:", error);
    } finally {
      console.log('10. [loadData] Proceso de carga finalizado.');
      this.isLoading.set(false);
    }
  }

  selectCategory(categoryId: number | null) {
    console.log('Seleccionaste categoría ID:', categoryId);
    this.selectedCategoryId.set(categoryId);
  }

  calculateFinalPrice(product: Product): number {
    const discount = product.discount || 0;
    if (discount > 0) {
      return product.price - (product.price * (discount / 100));
    }
    return product.price;
  }

  volver() {
    console.log('Navegando de vuelta a la lista de restaurantes...');
    this.router.navigate(['/restaurante']);
  }
}
      
    