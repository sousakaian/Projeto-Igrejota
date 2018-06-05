import { Component, OnInit, Input } from '@angular/core';
import { Noticia } from '../noticia';
import { NoticiaService } from '../noticia.service';
import { AuthService } from '../auth.service';
import { MessageService } from '../message.service';
import * as moment from 'moment';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})

export class NoticiasComponent implements OnInit {
  noticias: Noticia[] = [];
  noticiaSelecionada: Noticia;

  constructor(
    private noticiaService: NoticiaService,
    private messageService: MessageService,
    public auth: AuthService
    ) {
    
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
