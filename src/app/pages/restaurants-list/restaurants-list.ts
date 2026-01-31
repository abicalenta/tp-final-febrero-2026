import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { Category } from "../../interfaces/Category";
import { Product } from "../../interfaces/product";
import { User } from "../../interfaces/user";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-restaurants-list',
  standalone: true,
  imports: [CommonModule], // Importante para que funcione el filtrado
  templateUrl: './restaurants-list.html',
  styleUrl: './restaurants-list.scss'
})

export class VerRestaurante implements OnInit {
[x: string]: any;
number: any;
calculateFinalPrice(_t16: Product) {
throw new Error('Method not implemented.');
}
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  isLoading = signal<boolean>(true);
  user = signal<User | undefined>(undefined);
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  selectedCategoryId = signal<number | null>(null);

  filteredProducts = computed(() => {
    const selectedId = this.selectedCategoryId();
    const currentProducts = this.products();
    
    if (!selectedId) return currentProducts;
    return currentProducts.filter(p => Number(p.categoryId) === selectedId);
  });
}
    