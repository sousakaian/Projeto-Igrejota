import { Injectable } from '@angular/core';
import { Bolsista } from './bolsista';
import { Aluno } from './aluno';
import { ALUNOS } from './mock-alunos';
import { Presenca } from './presenca';
import { PRESENCAS } from './mock-presencas';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { DiasigrejotaService } from './diasigrejota.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  constructor() { }

  getAlunosCadastrados(): Observable<Aluno[]> {
  	return of(ALUNOS);
  }

  getPresencas(dia: Date): Observable<Presenca[]> {
  	return of(PRESENCAS.filter(presenca => presenca.diaPresenca.isSame(dia, "day")));
  }

  addPresenca(aluno: Aluno, bolsista: Bolsista, dia: Date) {
  	let p: Presenca = {aluno: aluno, bolsista: bolsista, diaPresenca: moment(dia)} ;
  	PRESENCAS.push(p);
  }

  removePresenca(aluno: Aluno, dia: Date) {
  	let index = PRESENCAS.indexOf(PRESENCAS.find(presenca => presenca.aluno === aluno && presenca.diaPresenca.isSame(dia, "day")));
  	PRESENCAS.splice(index, 1);
  }

  add(aluno: Aluno) {
  	ALUNOS.push(aluno);
  }

  edit(aluno: Aluno) {
  	let index = ALUNOS.indexOf(ALUNOS.find(a => a.matricula === aluno.matricula));
  }

  remove(matricula: number) {
  	let index = ALUNOS.indexOf(ALUNOS.find(a => a.matricula === matricula));
  	this.removePresencasOf(ALUNOS.splice(index, 1)[0]);
  }

  removePresencasOf(aluno: Aluno) {
  	for (let presenca of PRESENCAS.filter(presenca => presenca.aluno.matricula === aluno.matricula)) {
  		let index = PRESENCAS.indexOf(PRESENCAS.find(a => a.aluno.matricula === presenca.aluno.matricula));
  		PRESENCAS.splice(index, 1);
  	}
  }
}
