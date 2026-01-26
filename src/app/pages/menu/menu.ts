import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../../core/services/menu';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class MenuComponent implements OnInit {

  restaurantId!: number;

  categories: any[] = [];
  products: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.restaurantId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadCategories();
    this.loadProducts();
  }

  loadCategories() {
    this.menuService.getCategories(this.restaurantId)
      .subscribe((res: any[]) => this.categories = res);
  }

  loadProducts() {
    this.menuService.getProducts(this.restaurantId)
      .subscribe((res: any[]) => this.products = res);
  }

  filterByCategory(categoryId: number) {
    this.menuService.getProductsByCategory(categoryId)
      .subscribe((res: any[]) => this.products = res);
  }

}

