import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Jogo } from '../jogo';
import { CategoriaSelectComponent } from '../categoria-select/categoria-select.component'
import { JogoService } from '../jogo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IonRangeSliderComponent } from "ng2-ion-range-slider";
import { MessageService } from "../message.service";

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
	  private router: Router,
    private messageService: MessageService
  ) {
  	
  }

  ngOnInit() {
  	this.getJogo();
    this.maisDe30 = this.jogo.maxJogadores > 30;
    CategoriaSelectComponent.categoriasEscolhidas = this.jogo.categorias;
  }

  getJogo(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id < -1) {
      return
    } else if (id === -1) {
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
    if (this.jogo.id <= 0) {
      this.messageService.add("Id do jogo inválido!");
    } else if (this.jogo.nome === "") {
      this.messageService.add("Nome do jogo inválido!");
    } else if (this.jogo.minJogadores >= 0 && this.jogo.maxJogadores >= this.jogo.minJogadores && this.jogo.maxJogadores <= 31) {
      this.messageService.add("Número de jogadores inválido!");
    } else if (this.jogo.tempoJogo >= 0 && this.jogo.tempoJogo <= 610) {
      this.messageService.add("Tempo do jogo inválido!");
    } else if (this.jogo.descricao === "") {
      this.messageService.add("Descrição inválida");
    } else {
      return true
    }
    return false
  }

  onSave(): void {
    this.enviado = true;
    if (this.validarJogo()) {
      this.jogo.id === -1 ? this.jogoService.add(this.jogo) : this.jogoService.edit(this.jogo);
      this.router.navigate(['/jogo/'+this.jogo.id]);
    }
  }

  static alertCancel(sender: JogoEditComponent) {
    sender.messageService.clear();
  }

  onDelete(): void {
  	this.messageService.displayAlert("Você têm certeza que deseja deletar esse jogo?", JogoEditComponent.confirmDelete, JogoEditComponent.alertCancel, this);
  }

  static confirmDelete(sender: JogoEditComponent) {
    sender.jogoService.remove(sender.jogo.id);
    sender.router.navigate(['/jogos']);
  }

  onCancel(): void {
    this.messageService.displayAlert("Você têm certeza que deseja cancelar a edição? As alterações feitas não serão salvas.", JogoEditComponent.confirmCancel, JogoEditComponent.alertCancel, this);
  }

  static confirmCancel(sender: JogoEditComponent) {
    sender.router.navigate(['/jogos']);
    sender.messageService.clear();
  }
}
