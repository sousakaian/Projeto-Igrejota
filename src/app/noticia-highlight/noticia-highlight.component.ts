import { Component, OnInit, Input } from '@angular/core';
import { Noticia } from '../noticia';
import { NoticiaService } from '../noticia.service';
import { MessageService } from '../message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noticia-highlight',
  templateUrl: './noticia-highlight.component.html',
  styleUrls: ['./noticia-highlight.component.css']
})

export class NoticiaHighlightComponent implements OnInit {
  noticiaDestacada: Noticia;

  constructor(
    private noticiaService: NoticiaService,
    private messageService: MessageService,
    private router: Router
    ) {
  	
  }

  ngOnInit() {
    this.getNoticia();
  }

  getNoticia(): void {
    this.noticiaService.getUltimaNoticia().subscribe(noticia => this.noticiaDestacada = noticia);
  }

  goToNoticia() {
    this.router.navigate(['noticia/'+this.noticiaDestacada.id]);
    this.messageService.clear();
  }

}
