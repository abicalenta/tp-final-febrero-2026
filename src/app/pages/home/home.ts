import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {


  // 0signals para manejar el estado
  isLoading = signal(true);
  Restaurants = signal<any[]>([]);


  ngOnInit(): void {
    this.loadFeaturedRestaurants();
  }

  async loadFeaturedRestaurants() {
    try {
    } catch (error) {
      console.error('Error al cargar restaurantes destacados', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
