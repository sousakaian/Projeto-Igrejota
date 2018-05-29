import { Component, OnInit, Input } from '@angular/core';
import { Noticia } from '../noticia';
import { NoticiaService } from '../noticia.service';
import { AuthService } from '../auth.service';
import { MessageService } from '../message.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-noticia-detail',
  templateUrl: './noticia-detail.component.html',
  styleUrls: ['./noticia-detail.component.css']
})

export class NoticiaDetailComponent implements OnInit {
  @Input() noticia: Noticia

  constructor(
    public auth: AuthService,
	  private noticiaService: NoticiaService,
    private messageService: MessageService,
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
