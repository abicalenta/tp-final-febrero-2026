import { Component, inject, input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../../interfaces/user';
import { AuthService } from '../../core/services/auth-service';
import { UsersService } from '../../core/services/user-service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-restaurants-page',
  imports: [RouterModule, FormsModule ],
  templateUrl: './restaurant-list.html',
  styleUrl: './restaurant-list.scss',
})
export class Restaurante implements OnInit{
 
    ngOnInit(): void {
      this.userService.getusers();
    }
    authservice = inject(AuthService);
    userService = inject(UsersService);
    user = input.required<User>();
    router = inject (Router)
  
    volver() {
  console.log('volviendo al home...');
  this.router.navigate(['/home']); 
}
  

  viewMenu(id: number) {
    Swal.fire({
      title: " ¿Desea ver el menu?",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Sí, ver menú",
      cancelButtonText: "Cancelar"
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.router.navigate(['/ver-restaurante', id]);
      }
    });


  }
}