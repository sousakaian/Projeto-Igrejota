import { Component, OnInit } from '@angular/core';
import { Jogo } from '../jogo';
import { JogoService } from '../jogo.service';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {
  jogos: Jogo[];
  jogoSelecionado: Jogo;
  bolsista: Boolean = false;

  constructor(private jogoService: JogoService) { }

  ngOnInit() {
  	this.getJogos();
  }

  getJogos(): void {
  	this.jogoService.getJogos()
  		.subscribe(jogos => this.jogos = jogos);
  }

  onSelect(jogo: Jogo): void {
  	this.jogoSelecionado = jogo;
  }

}
