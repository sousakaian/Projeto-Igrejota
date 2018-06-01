import { Injectable } from '@angular/core';
import { JOGOS } from './mock-jogos';
import { Jogo } from './jogo';
import { Categoria } from './categoria';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';

@Injectable()
export class JogoService {

  constructor(private messageService: MessageService) { }

  private isUniqueJogo(jogo: Jogo): Boolean {
    this.messageService.add("Jogo já existente");
    return JOGOS.findIndex(j => j.id === jogo.id) === -1;
  }

  private checarTempo(tempoDisponivel: number, margem: number, jogo: Jogo): Boolean {
	  return tempoDisponivel >= (jogo.tempoJogo - margem) && tempoDisponivel <= (jogo.tempoJogo + margem);
  }

  private checarJogadores(nJogadores: number, jogo: Jogo): Boolean {
	  return nJogadores >= jogo.minJogadores && nJogadores <= jogo.maxJogadores;
  }

  removeCategoriaFromAll(categoria: Categoria) {
    for (let jogo of JOGOS) {
      if (jogo.categorias.includes(categoria)) {
        let indexCategoria = jogo.categorias.indexOf(categoria);
        jogo.categorias.splice(indexCategoria,1);
      }
    }
  }

  getJogos(): Observable<Jogo[]> {
  	return of(JOGOS);
  }

  getJogosEmDestaque(): Observable<Jogo[]> {
  	return of(JOGOS.filter(jogo => jogo.emDestaque));
  }

  get(id: number): Observable<Jogo> {
  	return of(JOGOS.find(jogo => jogo.id === id));
  }

  getBuscaJogos(termoBusca: string): Observable<Jogo[]> {
    var jogosEncontrados: Jogo[] = [];
    let termo = termoBusca.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    
    for(let jogo of JOGOS) {
      if (jogo.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(termo)) {
        jogosEncontrados.unshift(jogo);
      } else if (jogo.descricao.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(termo) || jogo.categorias.find(categoria => categoria.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(termo))) {
        jogosEncontrados.push(jogo);
      }
    }

    if (jogosEncontrados.length > 0) {
      this.messageService.add(jogosEncontrados.length +" resultados para '"+termo+"'");
    } else {
      this.messageService.add("Não foram encontrados resultados para '"+termo+"'");
    }
    return of(jogosEncontrados);
  }

  edit(jogo: Jogo): void {
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
    this.messageService.add("Jogo editado!");
  }

  remove(id: number): void {
  	let index = JOGOS.indexOf(JOGOS.find(jogo => jogo.id === id));
  	JOGOS.splice(index, 1);
    this.messageService.add("Jogo deletado!");
  }

  add(jogo: Jogo): void {
    JOGOS.push(jogo);
    this.messageService.add("Jogo adicionado!");
  }

  generateEmptyJogo(): Observable<Jogo> {
    return of({id: -1, nome: "", minJogadores: 0, maxJogadores: 0, tempoJogo: 0, categorias: [], descricao: "", imagemJogo: "" ,linkDesenvolvedor: "", linkManual:"", emDestaque: false});
  }

  getJogosSugeridos(nJogadores: number, tempoEscolhido: number, categorias: Categoria[], jogos: Jogo[]): Observable<Jogo[]> {
    var jogosSugeridos: Jogo[] = [];
    if (nJogadores === -1 && tempoEscolhido === -1 && categorias.length <= 0) {
      return of(jogos);
    }

    for (let jogo of jogos) {
    	if (this.checarJogadores(nJogadores, jogo) || nJogadores === -1) {
  			jogosSugeridos.push(jogo);
  		}
    }

    for (let i in jogosSugeridos) {
  		let jogo = jogosSugeridos[i];
  		if (!this.checarTempo(tempoEscolhido, 10, jogo) && tempoEscolhido !== -1) {
  			jogosSugeridos.splice(jogosSugeridos.indexOf(jogo), 1);
  		}
  	}

  	var maxEquivalente: number = 0;

  	if (categorias.length > 0) {
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
  	}

    if (jogosSugeridos.length > 0) {
  	  this.messageService.add("Temos "+jogosSugeridos.length+" sugestões!");
    }
  	return of(jogosSugeridos);
  }

  getJogosPossiveis(nJogadores: number, tempoEscolhido: number, jogos: Jogo[]): Observable<Jogo[]> {
	  var jogosPossiveis: Jogo[] = [];
	  if (nJogadores === -1 && tempoEscolhido === -1) {
      return of(jogos);
    }

  	for (let jogo of jogos) {
  		if (this.checarJogadores(nJogadores, jogo) || nJogadores === -1) {
  			jogosPossiveis.push(jogo);
  		}
  	}

  	for (let i in jogosPossiveis) {
  		let jogo = jogosPossiveis[i];
  		if (!this.checarTempo(tempoEscolhido, 30, jogo) && tempoEscolhido !== -1) {
  			jogosPossiveis.splice(jogosPossiveis.indexOf(jogo), 1);
  		}
  	}
    if (jogosPossiveis.length > 0) {
  	  this.messageService.add(jogosPossiveis.length+" jogos possíveis encontrados!");
    }
  	return of(jogosPossiveis);
  }
}
