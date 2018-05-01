import { Component, OnInit, Input } from '@angular/core';
import { Noticia } from '../noticia';
import { NoticiaService } from '../noticia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-noticia-edit',
  templateUrl: './noticia-edit.component.html',
  styleUrls: ['./noticia-edit.component.css']
})

export class NoticiaEditComponent implements OnInit {
  @Input() noticia: Noticia;
  enviado: Boolean;

  constructor(
	  private noticiaService: NoticiaService,
	  private route: ActivatedRoute,
	  private router: Router,
	  private location: Location
  ) {
  	
  }

  ngOnInit() {
  	this.getNoticia();
  }

  getNoticia(): void {
  	const id = +this.route.snapshot.paramMap.get('id');
    if (id === -1) {
  	  this.noticiaService.generateEmptyNoticia()
        .subscribe(noticia => this.noticia = noticia);
    } else {
      this.noticiaService.get(id)
        .subscribe(noticia => this.noticia = noticia);
    }
  }

  onDelete(noticia: Noticia) {
  	this.noticiaService.remove(noticia.id);
  	this.router.navigate(["/noticias"]);
  }

  noticiaValida(): Boolean {
    return this.noticia.titulo !== '' && this.noticia.conteudo !== '';
  }

  onSave(noticia: Noticia) {
    this.enviado = true
    if (this.noticiaValida()) {
  	  noticia.id === -1 ? this.noticiaService.add(noticia) : this.noticiaService.update(noticia);
      this.router.navigate(["/noticia/"+noticia.id]);
    }
  }

  onCancel() {
    this.router.navigate(["/noticias"]);
  }

}
