import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import books from './assets/docs/books.json'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'reading_list';

  library=books.library // libros del json

  libros:string|null = this.getLibraryLS()
  libross:any[] = [];

  constructor(){
    this.setLibraryLS()
    this.getLibraryLS()

  // valido y busco guardar la lista de libros en una variable
  if(this.libros !== null){this.libross = JSON.parse(this.libros)}

  }

  // set localstorage
  setLibraryLS(){
    localStorage.setItem("libros",JSON.stringify(this.library))
    localStorage.setItem("wishList","")
  }

  // get localstore
  getLibraryLS(): string|null{
    let libros=localStorage.getItem("libros")
    return libros
  }



}
