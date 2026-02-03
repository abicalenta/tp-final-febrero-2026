import { Routes } from "@angular/router";
import { authGuard } from "./core/guards/auth.guard";
import { Restaurante } from "./features/restaurant-list/restaurant-list";
import { HomeComponent } from "./pages/home/home";
import { LoginComponent } from "./pages/login/login";
import { RegisterComponent } from "./pages/register/register";
import { VerRestaurante } from "./pages/restaurants-list/restaurants-list";
import { CategoriaPagina } from "./shared/components/category-filter/category-filter";
import { Productos } from "./shared/components/product-card/product-card";

export const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "restaurante", component: Restaurante, canActivate: [authGuard] },
  { path: "ver-restaurante/:idRestaurant", component: VerRestaurante, canActivate: [authGuard] },
  { path: 'categoria-pagina/edit/:idCategory', component: CategoriaPagina, canActivate: [authGuard] },
  { path: 'productos/edit/:idProduct', component: Productos, canActivate: [authGuard] },
  { path: "", redirectTo: 'restaurante', pathMatch: 'full' },
  { path: "**", component: HomeComponent }
];