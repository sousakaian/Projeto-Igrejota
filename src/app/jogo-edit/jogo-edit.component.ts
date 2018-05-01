import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Jogo } from '../jogo';
import { CategoriaSelectComponent } from '../categoria-select/categoria-select.component'
import { JogoService } from '../jogo.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  enviado: Boolean;

  constructor(
	  private jogoService: JogoService,
	  private route: ActivatedRoute,
	  private router: Router
  ) {
  	
  }

  ngOnInit() {
  	this.getJogo();
    this.maisDe30 = this.jogo.maxJogadores > 30;
    CategoriaSelectComponent.categoriasEscolhidas = this.jogo.categorias;
  }

  getJogo(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id === -1) {
      this.jogoService.generateEmptyJogo()
        .subscribe(jogo => this.jogo = jogo);
    } else {
  	  this.jogoService.get(id)
  		  .subscribe(jogo => this.jogo = jogo);
    }
  }

  adjustNumeroJogadores(minJogadores: number, maxJogadores: number): void {
    this.jogo.minJogadores = minJogadores;
    this.jogo.maxJogadores = this.maisDe30 ? 31 : maxJogadores;
  }

  validarJogo(): Boolean {
    return this.jogo.nome !== '' && this.jogo.descricao !== ''
  }

  onSave(jogo: Jogo): void {
    this.enviado = true;
    if (this.validarJogo()) {
      jogo.id === -1 ? this.jogoService.add(jogo) : this.jogoService.edit(jogo);
    	this.router.navigate(['/jogo/'+jogo.id]);
    }
  }

  onDelete(jogo: Jogo): void {
  	this.jogoService.remove(jogo.id);
  	this.router.navigate(['/jogos']);
  }

  onCancel(): void {
    this.router.navigate(['/jogos']);
  }
}
