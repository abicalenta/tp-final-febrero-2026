import { Routes } from '@angular/router';
import { RestaurantListModule } from './features/restaurant-list/restaurant-list';
import { MenuComponent } from './pages/menu/menu';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', component: Login },
  // { path: '', component: RestaurantListModule },
  { path: 'menu/:id/:slug', component: MenuComponent },
];
