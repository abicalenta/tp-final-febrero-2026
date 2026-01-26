import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiUrl = 'https://w370351.ferozo.com/api';

  constructor(private http: HttpClient) {}

  getCategories(restaurantId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/${restaurantId}`);
  }

  getProducts(restaurantId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${restaurantId}`);
  }

  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/category/${categoryId}`);
  }

  getProductById(productId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/detail/${productId}`);
  }
}
