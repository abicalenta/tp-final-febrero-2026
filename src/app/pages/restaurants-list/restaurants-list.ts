import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurants-list.html',
})
export class RestaurantsListComponent {}
