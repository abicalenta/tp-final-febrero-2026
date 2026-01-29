import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss']
})
export class MenuComponent implements OnInit {

  restaurantId!: number;
  categories: any[] = [];
  products: any[] = [];
  route: any;
  menuService: any;

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

