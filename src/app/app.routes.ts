import { Routes } from '@angular/router';
import { Restaurante } from './features/restaurant-list/restaurant-list';
import { VerRestaurante } from './pages/restaurants-list/restaurants-list';
import { CategoriaPagina } from './shared/components/category-filter/category-filter';
import { Productos } from './shared/components/product-card/product-card';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { HomeComponent } from './pages/home/home';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { onlyLoggedUserGuard } from './core/guards/auth.guard';


export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path: "register",
        component: RegisterComponent,
    },
    {
        path: "restaurante",
        component: Restaurante,
    },
    {
        path: "ver-restaurante/:idRestaurant",
        component: VerRestaurante,
    },
    {
        path: "perfiles",
        component: AdminDashboard, // Cambiado: Usamos componente en vez de servicio
        canActivate: [onlyLoggedUserGuard]
    },
    {
        path: 'categoria-pagina/edit/:idCategory', 
        component: CategoriaPagina,
        canActivate: [onlyLoggedUserGuard] 
    },
    {
        path: 'productos/edit/:idProduct', 
        component: Productos,
        canActivate: [onlyLoggedUserGuard]
    },
    {
        path: 'perfiles/edit',
        component: AdminDashboard, // Cambiado: Usamos componente en vez de servicio
        canActivate: [onlyLoggedUserGuard]
    },
    {
        path: "",
        redirectTo: 'restaurante',
        pathMatch: 'full'
    },
    {
        path: "**",
        component: HomeComponent,
    }]