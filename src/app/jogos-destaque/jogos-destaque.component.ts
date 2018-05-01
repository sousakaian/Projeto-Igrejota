import { Component, OnInit } from '@angular/core';
import { Jogo } from '../jogo';
import { JogoService } from '../jogo.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-jogos-destaque',
  templateUrl: './jogos-destaque.component.html',
  styleUrls: ['./jogos-destaque.component.css']
})

export class JogosDestaqueComponent implements OnInit {
  jogos: Jogo[];

  constructor(
  	private jogoService: JogoService,
  	private auth: AuthService
  	) {
  	
  }

  ngOnInit() {
  	this.getJogos();
  }

  getJogos(): void {
  	this.jogoService.getJogosEmDestaque()
  		.subscribe(jogos => this.jogos = jogos);
  }
}
