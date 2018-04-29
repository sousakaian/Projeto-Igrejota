import { Component, OnInit, Input } from '@angular/core';
import { Noticia } from '../noticia';
import { NoticiaService } from '../noticia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-noticia-edit',
  templateUrl: './noticia-edit.component.html',
  styleUrls: ['./noticia-edit.component.css']
})

export class NoticiaEditComponent implements OnInit {
  @Input() noticia: Noticia;

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
  	this.noticiaService.getNoticia(id)
  		.subscribe(noticia => this.noticia = noticia);
  }

  onDelete(noticia: Noticia) {
  	this.noticiaService.remove(noticia.id);
  	this.router.navigate(["/noticias"]);
  }

  onSave(noticia: Noticia) {
  	this.noticiaService.update(noticia);
  	this.router.navigate(["/noticias"]);
  }
}
