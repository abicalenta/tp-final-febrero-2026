import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth-service';
import { Category } from '../../interfaces/Category';
import id from '@angular/common/locales/id';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  authService = inject(AuthService);
  categories = signal<Category[]>([]);
  
  readonly API_USERS_URL = "https://w370351.ferozo.com/api/Users";
  readonly API_CATEGORIES_URL = "https://w370351.ferozo.com/api/Categories";

  async getCategoriesByRestaurant(restaurantId: number) {
    try {
      const res = await fetch(`${this.API_USERS_URL}/${restaurantId}/categories`);
      if (!res.ok) {
        this.categories.set([]);
        return;
      }
      const data = (await res.json()) as Category[];
      this.categories.set(data);
    } catch (error) {
      console.error("Error obteniendo categorías:", error);
    }
  }
async addCategory(category: Category) {
  const token = this.authService.token(); // <--- IMPORTANTE: Llamar al signal
  if (!token) return undefined;

  const res = await fetch(this.API_CATEGORIES_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify(category)
  });

      if (!res.ok) {
        console.error("Error al actualizar:", res.status);
        return undefined;
      }

      const updatedCategory = await res.json() as Category;
      return updatedCategory;
    } catch (error: any) {
      console.error(error);
      return undefined;
    }
  }
