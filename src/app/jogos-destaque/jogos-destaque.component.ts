import { Component, OnInit } from '@angular/core';
import { Jogo } from '../jogo';
import { JogoService } from '../jogo.service';
import { AuthService } from '../auth.service';
import { MessageService } from '../message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jogos-destaque',
  templateUrl: './jogos-destaque.component.html',
  styleUrls: ['./jogos-destaque.component.css']
})

export class JogosDestaqueComponent implements OnInit {
  jogos: Jogo[];

  constructor(
  	private jogoService: JogoService,
    private router: Router,
    private messageService: MessageService,
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

  goToJogoEmDestaque(jogo: Jogo) {
     this.router.navigate([this.auth.loggedIn() ? '/jogo/edit/'+jogo.id : '/jogo/'+jogo.id]);
     this.messageService.clear();
  }
}
