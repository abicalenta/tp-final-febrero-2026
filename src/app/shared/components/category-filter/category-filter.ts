import { Component, inject, input, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth-service';
import { CategoriesService } from '../../../core/services/category-service';
import { Category } from '../../../interfaces/Category';




@Component({
  selector: 'app-categoria-pagina',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './category-filter.html',
  styleUrl: './category-filter.scss'
})
export class CategoriaPagina {
  private authService = inject(AuthService);
  private categoryService = inject(CategoriesService);
  private router = inject(Router);
  idCategory = input<string>();
  
  form = viewChild<NgForm>("newCategoryForm");
  
  categoryOriginal: Category | undefined = undefined;
  isLoading = false;
  errorBack = false;
  isEditing = false;

  async ngOnInit() {
    this.isLoading = true;
    try {
      const userId = String(this.authService.getUserId());

      if (!userId) {
        this.router.navigate(['/login']);
        return;
      }
await this.categoryService.getCategoriesByRestaurant(+userId);
      const allCategories = this.categoryService.categories();


      const idParam = this.idCategory();
      
      if (idParam && idParam !== 'nuevo') {
        this.isEditing = true;

        if (this.categoryOriginal) {
          setTimeout(() => {
            this.form()?.setValue({
              name: this.categoryOriginal!.name,
            });
          });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  async handleFormSubmission(form: NgForm) {
    if (form.invalid) return;

    this.isLoading = true;
    this.errorBack = false;
    let res;

    try {
      const userId = String(this.authService.getUserId());
      
      if (this.isEditing) {
        //MODO EDICIÓN
        const updateData = { name: form.value.name };
       
        res = await this.categoryService.updateCategory(Number(this.idCategory()), updateData);
      } else {
        // MODO CREACIÓN
        const nuevaCategory: Category = {
          name: form.value.name,
          restaurantId: +userId,
          id: ''
        };
        res = await this.categoryService.addCategory(nuevaCategory);
      }

      if (true) {
        this.router.navigate(["/perfiles"]);
      } else {
        this.errorBack = true;
      }

    } catch (error) {
      console.error(error);
      this.errorBack = true;
    } finally {
      this.isLoading = false;
    }
  }
}

