import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tp-final-apps');

  constructor() {
    console.log('1. [App] El componente principal se ha construido');
  }

  ngOnInit() {
    console.log('2. [App] ngOnInit: El componente ya está listo en el DOM');
    console.log('Valor del signal title:', this.title());
  }
}
