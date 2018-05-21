import { Injectable } from '@angular/core';
import { DiaIgrejota } from './diaigrejota';
import { DIASIGREJOTA } from './mock-diasigrejota';
import { CalendarEvent } from 'angular-calendar';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import * as moment from 'moment';

@Injectable()
export class DiasigrejotaService {

  constructor() { }

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

  getDia(dia: Date): Observable<DiaIgrejota> {
  	return of(DIASIGREJOTA.find(data => data.dia.isSame(dia,"day")));
  }
}
