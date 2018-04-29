import { Component, OnInit, Input } from '@angular/core';
import { Noticia } from '../noticia';
import { NoticiaService } from '../noticia.service';

@Component({
  selector: 'app-noticia-highlight',
  templateUrl: './noticia-highlight.component.html',
  styleUrls: ['./noticia-highlight.component.css']
})

export class NoticiaHighlightComponent implements OnInit {
  noticiaDestacada: Noticia;

  constructor(private noticiaService: NoticiaService) {
  	
  }

  ngOnInit() {
    this.getNoticia();
  }

  getNoticia(): void {
    this.noticiaService.getUltimaNoticia().subscribe(noticia => this.noticiaDestacada = noticia);
  }

}
