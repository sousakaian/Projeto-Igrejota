import { DiaIgrejota, TipoDia } from "./diaigrejota";
import * as moment from 'moment';

export const DIASIGREJOTA: DiaIgrejota[] = [
	{dia: moment("20180507", "YYYYMMDD"),descricao: "Dia temático: Jogos de Ação", tipo:TipoDia.Normal},
	{dia: moment("20180514", "YYYYMMDD"),descricao: "Dia normal", tipo:TipoDia.Normal},
	{dia: moment("20180521", "YYYYMMDD"),descricao: "Teste do protótipo 'Legnes'", tipo:TipoDia.Evento},
	{dia: moment("20180521", "YYYYMMDD"),descricao: "Dia normal", tipo:TipoDia.Normal},
	{dia: moment("20180525", "YYYYMMDD"),descricao: "Igrejota na Bienal", tipo:TipoDia.Evento},
	{dia: moment("20180528", "YYYYMMDD"),descricao: "Dia normal", tipo:TipoDia.Normal},
]