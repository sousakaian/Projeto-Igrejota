import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['./categoria-edit.component.css']
})
export class CategoriaEditComponent implements OnInit {
  @Input() categorias: Categoria[];

  constructor(
  	  private categoriaService: CategoriaService,
  	  private route: ActivatedRoute,
	  private router: Router,
	  private location: Location
	) {

  }

  ngOnInit() {
  	this.getCategorias();
  }

  getCategorias(): void {
  	this.categoriaService.getCategorias()
  		.subscribe(categorias => this.categorias = categorias);
  }

  saveAll(): void {
  	for (let categoria of this.categorias) {
  		this.onSave(categoria);
  	}
  	this.router.navigate(['/inicio']);
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
