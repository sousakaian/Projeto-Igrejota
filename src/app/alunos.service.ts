import { Injectable } from '@angular/core';
import { Bolsista } from './bolsista';
import { Aluno } from './aluno';
import { ALUNOS } from './mock-alunos';
import { Presenca } from './presenca';
import { PRESENCAS } from './mock-presencas';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { DiasigrejotaService } from './diasigrejota.service';
import { MessageService } from './message.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class AlunosService {

  constructor(private messageService: MessageService) { }

  getAlunosCadastrados(): Observable<Aluno[]> {
  	return of(ALUNOS);
  }

  getAlunosSemPresenca(dia: Date): Observable<Aluno[]> {
    let presencas = PRESENCAS.filter(presenca => presenca.diaPresenca.isSame(dia, "day"))
    var alunos: Aluno[] = []
    for (let aluno of ALUNOS) {
      if (presencas.findIndex(p => p.aluno.matricula === aluno.matricula) === -1) {
        alunos.push(aluno)
      }
    }
    return of(alunos)
  }

  getPresencas(dia: Date): Observable<Presenca[]> {
  	return of(PRESENCAS.filter(presenca => presenca.diaPresenca.isSame(dia, "day")));
  }

  addPresenca(aluno: Aluno, bolsista: string, dia: Date) {
  	let p: Presenca = {aluno: aluno, bolsista: bolsista, diaPresenca: moment(dia)} ;
  	PRESENCAS.push(p);
    this.messageService.clear();
    this.messageService.add("Presença adicionada com sucesso!");
  }

  removePresenca(aluno: Aluno, dia: Date) {
  	let index = PRESENCAS.findIndex(presenca => presenca.aluno === aluno && presenca.diaPresenca.isSame(dia, "day"));
  	PRESENCAS.splice(index, 1);
    this.messageService.clear();
    this.messageService.add("Presença removida!");
  }

  add(aluno: Aluno) {
  	ALUNOS.push(aluno);
    this.messageService.add("Aluno cadastrado!");
  }

  edit(aluno: Aluno) {
  	let index = ALUNOS.findIndex(a => a.matricula === aluno.matricula);
    this.messageService.add("Aluno editado!");
  }

  remove(matricula: number) {
  	let index = ALUNOS.findIndex(a => a.matricula === matricula);
  	this.removePresencasOf(ALUNOS.splice(index, 1)[0]);
    this.messageService.add("Aluno removido do sistema!");
  }

  removePresencasOf(aluno: Aluno) {
  	for (let presenca of PRESENCAS.filter(presenca => presenca.aluno.matricula === aluno.matricula)) {
  		let index = PRESENCAS.indexOf(PRESENCAS.find(a => a.aluno.matricula === presenca.aluno.matricula));
  		PRESENCAS.splice(index, 1);
  	}
  }

  removePresencasFrom(day: Date) {
  	this.getPresencas(day)
  		.subscribe(presencas => {
  			for (let p of presencas) {
  				let index = PRESENCAS.findIndex(p => p.diaPresenca.isSame(day,"day"))
  				PRESENCAS.splice(index,1)
  			}
  		})

  }
}
