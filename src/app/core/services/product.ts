import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Product {
  private api = 'https://w370351.ferozo.com/api/products';
  constructor(private http: HttpClient) {}
  getByRestaurant(id: number){
    return this.http.get<any[]>(`${this.api}/restaurant/${id}`);
    
  }
      getFeatured(id: number) {
    return this.http.get<any[]>(`${this.api}/restaurant/${id}/featured`);
  }
}


