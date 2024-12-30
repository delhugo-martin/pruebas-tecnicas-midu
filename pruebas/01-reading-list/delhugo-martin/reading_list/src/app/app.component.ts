import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import books from './assets/docs/books.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'reading_list';

  library = books.library; // libros del json

  librosArray: any

  wishListArrayPrint:any[]=[];


  constructor() {
    // comprobamos si el localstorage esta en null, si lo está carga los datos en el mismo
    this.initLS();

    // pasamos el string de los libros y de la wishlist a array para pintarlos
    this.getLibraryLS();
    this.getWishListLS();
  }///



  ////////////////////////////////////////////////////////////
  //inicializacion, carga de library en el local storage
  initLS() {
    // si el local storage es null entonces carga los libros
    if (localStorage.getItem('libros') == null) {
      localStorage.setItem('libros', JSON.stringify(this.library));
    }
  }

  // carga de libros del local storage al print
  getLibraryLS() {
    let libros = localStorage.getItem('libros');
    if(libros !== null){
    // si o si hay que hacer esta verificacion, si no me da error de tipo
    this.librosArray = JSON.parse(libros);}
  }

  getWishListLS(){
    let wishList = localStorage.getItem('wishList');
    if(wishList !== null){
      this.wishListArrayPrint = JSON.parse(wishList)
      //console.log("la wishlist orint es")
      //console.log(this.wishListArrayPrint)
    }
  }

  //////////////////////////////////////////////////////////////
  // eventos

  addToWishList(book: string) {
    this.getWishListLS()

    // vamos a comprobar si el libro ya esta en la wishlist
    let verfBook = this.wishListArrayPrint.find((b)=> b === book)
    console.log(this.wishListArrayPrint)

    console.log("el libro si sta")
    console.log(verfBook)

    // conviene trabajar con el array
    // primero guardo el objeto book en el array wishListArray
    this.wishListArrayPrint.push(book)
        //console.log("w arrary") OK
        //console.log(this.wishListArray)

    // convierto el array el string
    let wishListStr = JSON.stringify(this.wishListArrayPrint)
        //console.log("w string")
        //console.log(wishListStr)
        //console.log(typeof(wishListStr)) OK

    localStorage.setItem('wishList',wishListStr)
    this.getWishListLS()

  }

  removeToWishList(isbn: string) {}
}
