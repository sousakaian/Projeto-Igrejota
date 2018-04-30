import { Component, OnInit } from '@angular/core';
import { Jogo } from '../jogo';
import { JogoService } from '../jogo.service';
import { Categoria } from '../categoria';
import { CATEGORIAS } from '../mock-categorias';
import { CategoriaSelectComponent } from '../categoria-select/categoria-select.component'

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})

export class JogoComponent implements OnInit {
  jogos: Jogo[];
  jogoSelecionado: Jogo;
  bolsista: Boolean = false;
  metodoOrganizacao: string = "";
  inverterOrdem: Boolean = false;
  mensagemInverter: string = "Normal";
  mostrarFiltros: Boolean = false;
  numeroJogadores: number = 4;
  ignorarJogadores: Boolean = false;
  tempoJogo: number = 40;
  ignorarTempoJogo: Boolean = false;

  constructor(private jogoService: JogoService) { }

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
    this.organizar();
    if (!this.inverterOrdem) {
      this.jogos.reverse();
    }
  }

  toggleFiltros(): void {
    this.mostrarFiltros = !this.mostrarFiltros;
  }

  limparFiltros(): void {
    this.numeroJogadores = 4;
    this.ignorarJogadores = false;
    this.tempoJogo = 40;
    this.ignorarTempoJogo = false;
    this.getJogos();
    this.toggleFiltros();
  }

  filtrar(): void {
    let nJogadores = this.ignorarJogadores ? -1 : this.numeroJogadores;
    let tJogo = this.ignorarTempoJogo ? -1 : this.tempoJogo;
    this.jogoService.getJogosSugeridos(nJogadores,tJogo,CategoriaSelectComponent.categoriasEscolhidas)
      .subscribe(jogos => this.jogos = jogos);
    if (this.jogos.length <= 0) {
      this.jogoService.getJogosPossiveis(nJogadores,tJogo)
        .subscribe(jogos => this.jogos = jogos); 
    }
    this.toggleFiltros();
  }

  newJogo(): void {

  }

}
