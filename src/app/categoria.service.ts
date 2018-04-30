import { Injectable } from '@angular/core';
import { Categoria } from './categoria';
import { CATEGORIAS } from './mock-categorias';
import { JogoService } from './jogo.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';

@Injectable()
export class CategoriaService {

  constructor(
    private messageService: MessageService,
    private jogoService: JogoService
    ) {

  }

  getCategorias(): Observable<Categoria[]> {
  	return of(CATEGORIAS);
  }

  get(id: number): Observable<Categoria> {
  	return of(CATEGORIAS.find(categoria => categoria.id === id))
  }

  update(categoria: Categoria): void {
  	let index = CATEGORIAS.indexOf(CATEGORIAS.find(item => item.id === categoria.id));
  	CATEGORIAS[index].nome = categoria.nome;
  }

  remove(id: number): void {
  	let index = CATEGORIAS.indexOf(CATEGORIAS.find(item => item.id === id));
  	this.jogoService.removeCategoriaFromAll(CATEGORIAS.splice(index,1)[0]);
  }

  add(categoria: Categoria): void {
    CATEGORIAS.push(categoria);
  }

  generateEmptyCategoria(): Observable<Categoria> {
    return of({id: 0, nome: ""});
  }

}
