import { Component, OnInit, Input } from '@angular/core';
import { Noticia } from '../noticia';
import { NoticiaService } from '../noticia.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-noticia-detail',
  templateUrl: './noticia-detail.component.html',
  styleUrls: ['./noticia-detail.component.css']
})

export class NoticiaDetailComponent implements OnInit {
  @Input() noticia: Noticia

  constructor(
	  private noticiaService: NoticiaService,
	  private route: ActivatedRoute,
	  private location: Location
  ) {
  	
  }

  ngOnInit() {
  	this.getNoticia();
  }

  getNoticia(): void {
  	const id = +this.route.snapshot.paramMap.get('id');
  	this.noticiaService.get(id)
  		.subscribe(noticia => this.noticia = noticia);
  }

}
