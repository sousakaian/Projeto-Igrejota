import * as moment from 'moment';

export enum TipoDia {
	Normal = "#00CED1",
	Evento = "#FFD700"
}

export class DiaIgrejota {
	dia: moment.Moment;
	descricao: string;
	tipo: TipoDia;
}