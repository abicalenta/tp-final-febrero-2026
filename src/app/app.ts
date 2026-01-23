import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RestaurantListComponent } from "./features/restaurant-list/restaurant-list";

@Component({
  selector: 'app-root',
  imports: [RestaurantListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tp-final-apps');
}
