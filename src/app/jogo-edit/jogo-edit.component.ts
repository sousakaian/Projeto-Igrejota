import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Jogo } from '../jogo';
import { JogoService } from '../jogo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { IonRangeSliderComponent } from "ng2-ion-range-slider";

@Component({
  selector: 'app-jogo-edit',
  templateUrl: './jogo-edit.component.html',
  styleUrls: ['./jogo-edit.component.css']
})
export class JogoEditComponent implements OnInit {
  @Input() jogo: Jogo;
  @ViewChild('sliderJogadores') sliderJogadores: IonRangeSliderComponent;
  maisDe30: Boolean;

  constructor(
	  private jogoService: JogoService,
	  private route: ActivatedRoute,
	  private router: Router,
	  private location: Location
  ) {
  	
  }

  ngOnInit() {
  	this.getJogo();
    this.maisDe30 = this.jogo.maxJogadores > 30;
  }

  getJogo(): void {
  	const id = +this.route.snapshot.paramMap.get('id');
  	this.jogoService.getJogo(id)
  		.subscribe(jogo => this.jogo = jogo);
  }

  adjustNumeroJogadores(minJogadores: number, maxJogadores: number): void {
    console.log(minJogadores,maxJogadores);
    this.jogo.minJogadores = minJogadores;
    this.jogo.maxJogadores = this.maisDe30 ? 31 : maxJogadores;
  }

  onSave(jogo: Jogo): void {
  	this.jogoService.editJogo(jogo);
  	this.router.navigate(['/jogo/'+jogo.id]);
  }

  onDelete(jogo: Jogo): void {
  	this.jogoService.removeJogo(jogo.id);
  	this.router.navigate(['/jogos'])
  }

}
