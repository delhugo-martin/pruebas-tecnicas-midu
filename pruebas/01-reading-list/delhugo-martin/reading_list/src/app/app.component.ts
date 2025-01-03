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

  librosArray: any[]=[]

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
      //wishListArrayPrint queda con la lista actualizada
    }
  }

  //////////////////////////////////////////////////////////////
  // EVENTOS

  addToWishList(book:any) {
    // 1) conviene trabajar con el array
    // primero guardo el objeto book en el array wishListArrayPrint
    console.log(book)
    let bbook:any = {book}

    bbook.book = book


    this.wishListArrayPrint.push(bbook)

    // convierto el array el string
    let wishListStr = JSON.stringify(this.wishListArrayPrint)

    // guardamos en el local storage el objeto wishList pasado como string
    localStorage.setItem('wishList',wishListStr)
    this.getWishListLS()


    // 2) ahora tengo que borrar el libro de la libreria
    // creo un nuevo array sin el libro seleccionado
    let librosArrayNuevo = this.librosArray.filter(b => b.book !== book)
    this.librosArray = librosArrayNuevo

    // lo paso a string y seteo en el localstorage
    let librosArrayStr = JSON.stringify(this.librosArray)
    localStorage.setItem('libros', librosArrayStr)
  }//


  removeToWishList(book:any) {

    // 1) conviene trabajar con el array
    // primero guardo el objeto book en el array librosArray
    this.librosArray.push(book)
    console.log(book)

    // convierto el array el string
    let librosArrayStr = JSON.stringify(this.librosArray)

    // guardamos en el local storage el objeto wishList pasado como string
    localStorage.setItem('libros',librosArrayStr)
    this.getLibraryLS()

    // 2)creo un nuevo array sin el libro seleccionado
    let wishListNuevo = this.wishListArrayPrint.filter(b => b !== book)
    this.wishListArrayPrint = wishListNuevo

    // lo paso a string y seteo en el localstorage
    let wishListStr = JSON.stringify(this.wishListArrayPrint)
    localStorage.setItem('wishList', wishListStr)





  }//
}
