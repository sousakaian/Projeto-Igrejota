import { Injectable } from '@angular/core';
import { JOGOS } from './mock-jogos';
import { Jogo } from './jogo';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';

@Injectable()
export class JogoService {

  constructor(private messageService: MessageService) { }

  private checarTempo(tempoDisponivel: number, margem: number, jogo: Jogo): Boolean {
	return tempoDisponivel >= (jogo.tempoJogo - margem) && tempoDisponivel <= (jogo.tempoJogo + margem);
  }

  private checarJogadores(nJogadores: number, jogo: Jogo): Boolean {
	return nJogadores >= jogo.minJogadores || nJogadores <= jogo.maxJogadores;
  }

  getJogos(): Observable<Jogo[]> {
  	return of(JOGOS);
  }

  getJogo(id: number): Observable<Jogo> {
  	return of(JOGOS[id]);
  }

  editJogo(jogo: Jogo): void {
  	let index = JOGOS.indexOf(JOGOS.find(item => item.id === jogo.id));
  	JOGOS[index].nome = jogo.nome;
  	JOGOS[index].tempoJogo = jogo.tempoJogo;
  	JOGOS[index].minJogadores = jogo.minJogadores;
  	JOGOS[index].maxJogadores = jogo.maxJogadores;
  	JOGOS[index].categorias = jogo.categorias;
  	JOGOS[index].imagemJogo = jogo.imagemJogo;
  	JOGOS[index].descricao = jogo.descricao;
  	JOGOS[index].linkManual = jogo.linkManual;
  	JOGOS[index].linkDesenvolvedor = jogo.linkDesenvolvedor;
  }

  removeJogo(id: number): void {
  	let index = JOGOS.indexOf(JOGOS.find(jogo => jogo.id === id));
  	JOGOS.splice(index, 1);
  }

  getJogosSugeridos(nJogadores: number, tempoEscolhido: number, categorias: string[]): Observable<Jogo[]> {
    var jogosSugeridos: Jogo[] = [];
    for (let jogo of JOGOS) {
    	if (this.checarJogadores(nJogadores, jogo)) {
			jogosSugeridos.push(jogo);
		}
    }

    for (let i in jogosSugeridos) {
		let jogo = jogosSugeridos[i];
		if (!this.checarTempo(tempoEscolhido, 10, jogo)) {
			jogosSugeridos.splice(jogosSugeridos.indexOf(jogo), 1);
		}
	}

	var maxEquivalente: number = 0;

	for (let i in jogosSugeridos) {
		let jogo = jogosSugeridos[i];
		var nEquivalente = 0;
		for (let categoria of jogo.categorias) {
			if (categorias.includes(categoria)) {
				nEquivalente++;
			}
		}
		if (nEquivalente <= 0) {
			jogosSugeridos.splice(jogosSugeridos.indexOf(jogo),1);
		} else if (nEquivalente > maxEquivalente) {
			jogosSugeridos.unshift(jogosSugeridos.splice(jogosSugeridos.indexOf(jogo),1)[0]);
			maxEquivalente = nEquivalente;
		}
	}

	this.messageService.add("Temos "+jogosSugeridos.length+" sugestões!");
	return of(jogosSugeridos);
  }

  getJogosPossiveis(nJogadores: number, tempoEscolhido: number, categorias: string[]): Observable<Jogo[]> {
	var jogosPossiveis: Jogo[] = [];

	for (let jogo of JOGOS) {
		if (this.checarJogadores(nJogadores, jogo)) {
			jogosPossiveis.push(jogo);
		}
	}

	for (let i in jogosPossiveis) {
		let jogo = jogosPossiveis[i];
		if (!this.checarTempo(tempoEscolhido, 30, jogo)) {
			jogosPossiveis.splice(jogosPossiveis.indexOf(jogo), 1);
		}
	}

	this.messageService.add(jogosPossiveis.length+" jogos possíveis encontrados!");
	return of(jogosPossiveis);
  }
}
