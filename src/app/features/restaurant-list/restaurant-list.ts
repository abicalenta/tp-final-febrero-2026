import { Component, inject, OnInit, signal } from '@angular/core';
import { RestaurantService } from '../../core/services/restaurant';
import { Restaurant } from '../../core/services/Models/restaurant.interface';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [], // Aquí importarás RouterLink más adelante
  templateUrl: './restaurant-list.html',
  styleUrl: './restaurant-list.component.scss'
})
export class RestaurantListComponent implements OnInit {
  private resService = inject(RestaurantService);
  
  // Usamos un Signal para guardar la lista
  restaurantes = signal<Restaurant[]>([]);

  ngOnInit() {
    this.resService.getRestaurants().subscribe({
      next: (data: Restaurant[]) => this.restaurantes.set(data),
      error: (err: any) => console.error('Error al cargar locales', err)
    });
  }
}