import { Component, OnInit } from '@angular/core';
import { Jogo } from '../jogo';
import { JogoService } from '../jogo.service';
import { AuthService } from '../auth.service';
import { Categoria } from '../categoria';
import { CATEGORIAS } from '../mock-categorias';
import { CategoriaSelectComponent } from '../categoria-select/categoria-select.component'
import { MessageService } from '../message.service';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})

export class JogoComponent implements OnInit {
  jogos: Jogo[];
  jogoSelecionado: Jogo;
  termoBusca: "";
  metodoOrganizacao: string = "";
  inverterOrdem: Boolean = false;
  mensagemInverter: string = "Normal";
  mostrarFiltros: Boolean = false;
  numeroJogadores: number = -1;
  ignorarJogadores: Boolean = false;
  tempoJogo: number = -1;
  ignorarTempoJogo: Boolean = false;

  constructor(
    private jogoService: JogoService,
    private messageService: MessageService,
    public auth: AuthService
    ) {

  }

  ngOnInit() {
  	this.getJogos();
  }

  getJogos(): void {
  	this.jogoService.getJogos()
  		.subscribe(jogos => this.jogos = jogos);
    this.organizar();
  }

  onSelect(jogo: Jogo): void {
  	this.jogoSelecionado = jogo;
  }

  pesquisaAvancada(termo: string): void {
    this.messageService.clear();
    this.jogoService.getBuscaJogos(termo)
      .subscribe(jogos => this.jogos = jogos);
    this.metodoOrganizacao = "";
    this.filtrar();
  }

  organizar(): void {
    if (this.metodoOrganizacao === "A-Z") {
      this.jogos.sort((a,b) => {
        if (a.nome > b.nome) {
          return 1;
        }

        if (a.nome < b.nome) {
          return -1;
        }

        return 0;
      });
    } else if (this.metodoOrganizacao === "Min. Jogadores") {
      this.jogos.sort((a,b) => {
        if (a.minJogadores > b.minJogadores) {
          return 1;
        }

        if (a.minJogadores < b.minJogadores) {
          return -1;
        }

        return 0;
      });
    } else if (this.metodoOrganizacao === "Max. Jogadores") {
      this.jogos.sort((a,b) => {
        if (a.maxJogadores > b.maxJogadores) {
          return 1;
        }

        if (a.maxJogadores < b.maxJogadores) {
          return -1;
        }

        return 0;
      });
    } else if (this.metodoOrganizacao === "Tempo de Jogo") {
      this.jogos.sort((a,b) => {
        if (a.tempoJogo > b.tempoJogo) {
          return 1;
        }

        if (a.tempoJogo < b.tempoJogo) {
          return -1;
        }

        return 0;
      });
    }

    if (this.inverterOrdem) {
      this.jogos.reverse();
    }

  }

  toggleInverter(): void {
    this.inverterOrdem = !this.inverterOrdem;
    this.mensagemInverter = this.inverterOrdem ? "Inversa" : "Normal"
    this.jogos.reverse()
  }

  toggleFiltros(): void {
    this.mostrarFiltros = !this.mostrarFiltros;
  }

  limparFiltros(): void {
    this.numeroJogadores = -1;
    this.ignorarJogadores = false;
    this.tempoJogo = -1;
    this.ignorarTempoJogo = false;
    CategoriaSelectComponent.categoriasEscolhidas = [];
    this.mostrarFiltros = false;
    this.getJogos();
  }

  filtrar(): void {
    this.messageService.clear();
    let nJogadores = this.ignorarJogadores ? -1 : this.numeroJogadores;
    let tJogo = this.ignorarTempoJogo ? -1 : this.tempoJogo;
    this.jogoService.getJogosSugeridos(nJogadores,tJogo,CategoriaSelectComponent.categoriasEscolhidas,this.jogos)
      .subscribe(jogos => this.jogos = jogos);
    if (this.jogos.length <= 0) {
      this.jogoService.getJogosPossiveis(nJogadores,tJogo,this.jogos)
        .subscribe(jogos => this.jogos = jogos); 
    }
    this.mostrarFiltros = false;
  }
}
