import { Component, OnInit } from '@angular/core';
import { DiaIgrejota, TipoDia } from '../diaigrejota';

@Component({
  selector: 'app-dia-presenca',
  templateUrl: './dia-presenca.component.html',
  styleUrls: ['./dia-presenca.component.css']
})
export class DiaPresencaComponent implements OnInit {
  isIgrejotaDay: boolean;
  eventosDiaIgrejota: DiaIgrejota[];

  constructor() { }

  ngOnInit() {
  }

  getEventos() {

  }

  adicionarEvento() {

  }

  deletar(evento: DiaIgrejota) {

  }
}
