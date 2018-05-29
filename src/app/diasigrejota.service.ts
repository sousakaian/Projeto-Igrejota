import { Injectable } from '@angular/core';
import { DiaIgrejota, TipoDia } from './diaigrejota';
import { DIASIGREJOTA } from './mock-diasigrejota';
import { CalendarEvent } from 'angular-calendar';
import { AlunosService } from './alunos.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import * as moment from 'moment';

@Injectable()
export class DiasigrejotaService {

  constructor(
    private alunosService: AlunosService,
    private messageService: MessageService
    ) {

  }

  getEventos(date: Date): Observable<CalendarEvent[]> {
  	var eventosMes: DiaIgrejota[] = [];
  	this.getDias(date)
  		.subscribe(dias => eventosMes = dias);
  	var eventosCalendario: CalendarEvent[] = [];
  	for (let evento of eventosMes) {
      let event: CalendarEvent = {
        start: evento.dia.toDate(),
        title: evento.descricao,
        color: { primary: evento.tipo, secondary: evento.tipo}
      }
	  	eventosCalendario.push(event);
  	}
  	return of(eventosCalendario);
  }

  getDias(mes: Date): Observable<DiaIgrejota[]> {
  	return of(DIASIGREJOTA.filter(data => data.dia.isSame(mes,"month") && data.dia.isSame(mes,"year")));
  }

  getDia(dia: Date): Observable<DiaIgrejota[]> {
  	return of(DIASIGREJOTA.filter(data => data.dia.isSame(dia,"day")));
  }

  add(date: Date) {
    let dia: DiaIgrejota = {dia: moment(date),descricao: "", tipo: TipoDia.Normal};
    DIASIGREJOTA.push(dia);
    this.messageService.add("Dia adicionado com sucesso!");
  }

  edit(evento: DiaIgrejota) {
    let index = DIASIGREJOTA.findIndex(e => e.dia === evento.dia && evento.descricao === e.descricao && evento.tipo === e.tipo)
    DIASIGREJOTA[index].dia = evento.dia;
    DIASIGREJOTA[index].tipo = evento.tipo;
    DIASIGREJOTA[index].descricao = evento.descricao;
    this.messageService.add("Dia editado!");
  }

  remove(evento: DiaIgrejota) {
    let index = DIASIGREJOTA.findIndex(e => e.dia === evento.dia && evento.descricao === e.descricao && evento.tipo === e.tipo)
    DIASIGREJOTA.splice(index,1);
    this.getDia(evento.dia.toDate())
      .subscribe(eventos => {
        if (eventos.length <= 0) {
          this.alunosService.removePresencasFrom(evento.dia.toDate());
        }
      })
    this.messageService.add("Dia removido do sistema!");
  }
}
