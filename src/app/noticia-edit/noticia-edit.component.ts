import { Component, OnInit, Input } from '@angular/core';
import { Noticia } from '../noticia';
import { NoticiaService } from '../noticia.service';
import { MessageService } from '../message.service';
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
    private messageService: MessageService,
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
    if (id < -1) {
      return
    } else if (id === -1) {
  	  this.noticiaService.generateEmptyNoticia()
        .subscribe(noticia => this.noticia = noticia);
    } else {
      this.noticiaService.get(id)
        .subscribe(noticia => this.noticia = noticia);
    }
  }

  onDelete(noticia: Noticia) {
  	this.messageService.displayAlert("Você têm certeza que deseja deletar a notícia?",NoticiaEditComponent.confirmDelete,NoticiaEditComponent.cancelAlert,this);
  }

  static cancelAlert(sender: NoticiaEditComponent) {

  }

  static confirmDelete(sender: NoticiaEditComponent) {
    sender.noticiaService.remove(sender.noticia.id);
    sender.router.navigate(["/noticias"]);
  }

  noticiaValida(): Boolean {
    return this.noticia.titulo !== '' && this.noticia.conteudo !== '';
  }

  onSave() {
    this.enviado = true;
    if (this.noticiaValida()) {
      this.messageService.clear();
  	  this.noticia.id === -1 ? this.noticiaService.add(this.noticia) : this.noticiaService.update(this.noticia);
      this.router.navigate(["/noticia/"+this.noticia.id]);
    }
  }

  onCancel() {
    this.messageService.displayAlert("Você têm certeza que deseja cancelar a notícia?",NoticiaEditComponent.confirmCancel,NoticiaEditComponent.cancelAlert,this);
  }

  static confirmCancel(sender: any) {
    sender.router.navigate(["/noticias"]);
    sender.messageService.clear();
  }

  update(imagePath: string, event) {
    imagePath = event.target.files[0];
  }
}
