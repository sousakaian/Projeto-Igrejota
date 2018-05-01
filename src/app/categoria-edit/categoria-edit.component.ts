import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['./categoria-edit.component.css']
})
export class CategoriaEditComponent implements OnInit {
  @Input() categorias: Categoria[];
  enviado: Boolean;

  constructor(
  	private categoriaService: CategoriaService,
	  private router: Router
	) {

  }

  ngOnInit() {
  	this.getCategorias();
  }

  getCategorias(): void {
  	this.categoriaService.getCategorias()
  		.subscribe(categorias => this.categorias = categorias);
  }

  categoriasValidas(): Boolean {
    for (let categoria of this.categorias) {
      if (categoria.nome === "") {
        return false;
      }
    }
    return true;
  }

  saveAll(): void {
    this.enviado = true;
    if (this.categoriasValidas()) {
    	for (let categoria of this.categorias) {
    		this.onSave(categoria);
    	}
    	this.router.navigate(['/inicio']);
    }
  }

  onSave(categoria: Categoria): void {
  	categoria.id === -1 ? this.categoriaService.add(categoria) : this.categoriaService.update(categoria);
  }

  onDelete(categoria: Categoria): void {
  	this.categoriaService.remove(categoria.id);
  	this.getCategorias();
  }

  addCategoria(): void {
  	this.categoriaService.generateEmptyCategoria()
  		.subscribe(categoria => this.categorias.push(categoria));
  }

}
