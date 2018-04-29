import { Component, OnInit, Input } from '@angular/core';
import { Noticia } from '../noticia';
import { NoticiaService } from '../noticia.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})

export class NoticiasComponent implements OnInit {
  noticias: Noticia[] = [];
  noticiaSelecionada: Noticia;
  bolsista: Boolean = true;

  constructor(private noticiaService: NoticiaService) {
  }

  ngOnInit() {
    this.getNoticias();
  }

  getNoticias(): void {
    this.noticiaService.getNoticias()
      .subscribe(noticias => this.noticias = noticias);
  }

  onSelect(noticia: Noticia) {
  	this.noticiaSelecionada = noticia;
  }

}
