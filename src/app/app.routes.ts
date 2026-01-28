import { Routes } from '@angular/router';
import { MenuComponent } from './pages/menu/menu';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'menu/:id/:slug', component: MenuComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];





