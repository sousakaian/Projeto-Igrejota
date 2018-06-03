import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Categoria } from '../categoria';
import { CategoriaService } from '../categoria.service'
import { CATEGORIAS } from '../mock-categorias';

@Component({
  selector: 'app-categoria-select',
  templateUrl: './categoria-select.component.html',
  styleUrls: ['./categoria-select.component.css']
})
export class CategoriaSelectComponent implements OnInit {
  static categoriasEscolhidas: Categoria[] = [];
  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
  	this.getCategorias();
  }

  categoriaChecada(categoria: Categoria): Boolean {
    return CategoriaSelectComponent.categoriasEscolhidas.includes(categoria);
  }

  getCategorias(): void {
  	this.categoriaService.getCategorias()
  		.subscribe(categorias => this.categorias = categorias);
  }

  addCategoriaToSearch(categoria: Categoria): void {
  	CategoriaSelectComponent.categoriasEscolhidas.push(categoria);
  }

  removeCategoriaToSearch(categoria: Categoria): void {
  	let index = CategoriaSelectComponent.categoriasEscolhidas.indexOf(categoria);
  	CategoriaSelectComponent.categoriasEscolhidas.splice(index,1);
  }

  toggleCategoria(categoria: Categoria): void {
  	CategoriaSelectComponent.categoriasEscolhidas.includes(categoria) ? this.removeCategoriaToSearch(categoria) : this.addCategoriaToSearch(categoria);
  }

}
