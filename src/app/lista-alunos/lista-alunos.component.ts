import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AlunosService } from '../alunos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Aluno } from '../aluno';
import * as moment from 'moment';

@Component({
  selector: 'app-lista-alunos',
  templateUrl: './lista-alunos.component.html',
  styleUrls: ['./lista-alunos.component.css']
})
export class ListaAlunosComponent implements OnInit {
  date: moment.Moment
  termoBusca: string;
  listaAlunos: Aluno[] = [];
  listaSelecionados: Aluno[] = [];

  constructor(
  	public auth: AuthService,
  	private alunosService: AlunosService,
  	private router: Router,
  	private route: ActivatedRoute
  	) {

  }

  ngOnInit() {
  	this.date = moment(this.route.snapshot.paramMap.get("data"),"DD-MM-YYYY")
  	this.getAlunos()
  }

  getAlunos() {
  	this.alunosService.getAlunosSemPresenca(this.date.toDate())
  		.subscribe(alunos => this.listaAlunos = alunos)
  	this.listaAlunos.sort((a,b) => {
      if (a.nome > b.nome) {
          return 1;
        }

        if (a.nome < b.nome) {
          return -1;
        }
    })
  }

  adicionarPresencas() {
  	for (let aluno of this.listaSelecionados) {
  		this.alunosService.addPresenca(aluno,this.auth.getLoggedUser(),this.date.toDate())
  	}
  	this.listaSelecionados = []
  	this.router.navigate(['calendario/'+this.date.format("DD-MM-YYYY")])
  }

  alunoChecado(aluno: Aluno): Boolean {
  	return this.listaSelecionados.includes(aluno)
  }

  addAlunoToSelecionados(categoria: Aluno): void {
  	this.listaSelecionados.push(categoria);
  }

  removeAlunoToSelecionados(categoria: Aluno): void {
  	let index = this.listaSelecionados.indexOf(categoria);
  	this.listaSelecionados.splice(index,1);
  }

  toggleAluno(aluno: Aluno): void {
  	this.listaSelecionados.includes(aluno) ? this.removeAlunoToSelecionados(aluno) : this.addAlunoToSelecionados(aluno);
    console.log(this.listaSelecionados);
  }
}
