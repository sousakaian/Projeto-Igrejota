import { Component, OnInit } from '@angular/core';
import { DiaIgrejota, TipoDia } from '../diaigrejota';
import { Aluno } from '../aluno';
import { Presenca } from '../presenca';
import { AuthService } from '../auth.service';
import { AlunosService } from '../alunos.service';
import { DiasigrejotaService } from '../diasigrejota.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-dia-presenca',
  templateUrl: './dia-presenca.component.html',
  styleUrls: ['./dia-presenca.component.css']
})

export class DiaPresencaComponent implements OnInit {
  isIgrejotaDay: boolean;
  selectedDay: moment.Moment;
  tiposDia = {Normal: TipoDia.Normal, Evento: TipoDia.Evento}
  eventosDiaIgrejota: DiaIgrejota[] = [];
  alunosDiaIgrejota: Presenca[] = [];

  constructor(
  	public auth: AuthService,
  	private router: Router,
  	private route: ActivatedRoute,
  	private alunosService: AlunosService,
  	private diasIgrejotaService: DiasigrejotaService
  	) {

  }

  ngOnInit() {
  	let date = this.route.snapshot.paramMap.get("data");
  	this.selectedDay = moment(date, "DD-MM-YYYY");
  	this.getEventos();
  	this.getAlunos();
  }

  getAlunos() {
  	this.alunosService.getPresencas(this.selectedDay.toDate())
  		.subscribe(alunos => this.alunosDiaIgrejota = alunos);
    this.alunosDiaIgrejota.sort((a,b) => {
      if (a.aluno.nome > b.aluno.nome) {
          return 1;
        }

        if (a.aluno.nome < b.aluno.nome) {
          return -1;
        }
    })
  }

  getEventos() {
  	this.diasIgrejotaService.getDia(this.selectedDay.toDate())
  		.subscribe(eventos => this.eventosDiaIgrejota = eventos);
  	this.isIgrejotaDay = this.eventosDiaIgrejota.filter(e => e.tipo == TipoDia.Normal).length > 0;
  }

  adicionarPresenca() {
  	this.router.navigate(['calendario/add/'+this.selectedDay.format("DD-MM-YYYY")]);
  }

  adicionarEvento() {
  	this.diasIgrejotaService.add(this.selectedDay.toDate());
  	this.getEventos();
  }

  deletar(evento: DiaIgrejota) {
  	this.diasIgrejotaService.remove(evento);
  	this.getEventos();
  }

  remover(presenca: Presenca) {
  	this.alunosService.removePresenca(presenca.aluno,presenca.diaPresenca.toDate());
  	this.getAlunos()
  }
}
