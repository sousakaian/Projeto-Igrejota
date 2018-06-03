import { Component, OnInit, Input } from '@angular/core';
import { Noticia } from '../noticia';
import { NoticiaService } from '../noticia.service';
import { MessageService } from '../message.service';
import { Router } from '@angular/router';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-noticia-highlight',
  templateUrl: './noticia-highlight.component.html',
  styleUrls: ['./noticia-highlight.component.css']
})

export class NoticiaHighlightComponent implements OnInit {
  noticiaDestacada: Noticia;
  noticiaSelecionada: Noticia;
  noticias: Noticia[];

  constructor(
    private noticiaService: NoticiaService,
    private messageService: MessageService,
    private router: Router,
    public auth: AuthService
    ) {
  	
  }

  ngOnInit() {
    this.getNoticia();
  }

  getNoticia(): void {
    this.noticiaService.getNoticias().subscribe(noticias => {
      this.noticiaDestacada = noticias[0];
      this.noticias = noticias.slice(1);
    });
  }

  goToNoticia() {
    this.router.navigate(['noticia/'+this.noticiaDestacada.id]);
    this.messageService.clear();
  }

  onSelect(noticia: Noticia) {
    this.noticiaSelecionada = noticia;
  }

}
