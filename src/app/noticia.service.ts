import { Injectable } from '@angular/core';
import { NOTICIAS } from './mock-noticia';
import { Noticia } from './noticia';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import * as moment from 'moment';

@Injectable()
export class NoticiaService {

  constructor(private messageService: MessageService) { }

  getNoticias(): Observable<Noticia[]> {
  	return of(NOTICIAS);
  }

  getUltimaNoticia(): Observable<Noticia> {
  	return of(NOTICIAS[0]);
  }

  get(id: number): Observable<Noticia> {
  	return of(NOTICIAS.find(noticia => noticia.id === id));
  }

  remove(id: number): void {
    let index = NOTICIAS.indexOf(NOTICIAS.find(noticia => noticia.id === id));
    NOTICIAS.splice(index,1);
    this.messageService.add("Notícia removida!");
  }

  update(noticia: Noticia): void {
    let index = NOTICIAS.indexOf(noticia);
    NOTICIAS[index].titulo = noticia.titulo;
    NOTICIAS[index].conteudo = noticia.conteudo;
    NOTICIAS[index].dataEdicao = moment();
    NOTICIAS[index].imagemDestaque = noticia.imagemDestaque;
    this.messageService.add("Notícia editada!");
  }

  add(noticia: Noticia): void {
    noticia.id = Date.now() + Math.random();
    NOTICIAS.push(noticia);
    this.messageService.add("Notícia adicionada!");
  }

  generateEmptyNoticia(): Observable<Noticia> {
    let momento = moment();
    return of({id: -1, titulo: "", conteudo: "", dataCriacao: momento, dataEdicao: momento, imagemDestaque: ""});
  }

}
