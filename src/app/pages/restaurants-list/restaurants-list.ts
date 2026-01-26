import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './restaurant-list.html'
})
