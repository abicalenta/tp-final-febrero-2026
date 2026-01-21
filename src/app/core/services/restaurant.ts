import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from './Models/restaurant.interface';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private http = inject(HttpClient);
  private apiUrl = 'https://w370351.ferozo.com/api';

  // Método para obtener la lista de restaurantes
  getRestaurants() {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/restaurantes`);
  }
}
