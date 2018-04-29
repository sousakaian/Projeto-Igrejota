import { Injectable } from '@angular/core';
import { NOTICIAS } from './mock-noticia';
import { Noticia } from './noticia';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';

@Injectable()
export class NoticiaService {

  constructor(private messageService: MessageService) { }

  getNoticias(): Observable<Noticia[]> {
  	return of(NOTICIAS);
  }

  getUltimaNoticia(): Observable<Noticia> {
  	return of(NOTICIAS[0]);
  }

  getNoticia(id: number): Observable<Noticia> {
  	return of(NOTICIAS.find(noticia => noticia.id === id));
  }

  remove(id: number): void {
    let index = NOTICIAS.indexOf(NOTICIAS.find(noticia => noticia.id === id));
    NOTICIAS.splice(index,1);
  }

  update(noticia: Noticia): void {
    let index = NOTICIAS.indexOf(noticia);
    NOTICIAS[index].titulo = noticia.titulo;
    NOTICIAS[index].conteudo = noticia.conteudo;
    NOTICIAS[index].dataEdicao = new Date(Date.now());
    NOTICIAS[index].imagemDestaque = noticia.imagemDestaque;
  }

}
