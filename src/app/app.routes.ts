import { Routes } from '@angular/router';
import { RestaurantListComponent } from './features/restaurant-list/restaurant-list';
import { MenuComponent } from './pages/menu/menu';

export const routes: Routes = [
  { path: '', component: RestaurantListComponent },
  { path: 'menu/:id/:slug', component: MenuComponent },
];
