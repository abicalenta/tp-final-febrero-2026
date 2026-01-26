import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RestaurantListModule } from "./features/restaurant-list/restaurant-list";

@Component({
  selector: 'app-root',
  imports: [RestaurantListModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tp-final-apps');
}
