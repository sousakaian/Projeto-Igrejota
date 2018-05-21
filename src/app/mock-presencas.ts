import { BOLSISTAS } from './mock-bolsistas';
import { ALUNOS } from './mock-alunos';
import { Presenca } from './presenca';
import * as moment from 'moment';

export var PRESENCAS: Presenca[] = [
	{aluno: ALUNOS[0], bolsista: BOLSISTAS[0], diaPresenca: moment("20180507", "YYYYMMDD")},
	{aluno: ALUNOS[1], bolsista: BOLSISTAS[0], diaPresenca: moment("20180507", "YYYYMMDD")},
	{aluno: ALUNOS[2], bolsista: BOLSISTAS[1], diaPresenca: moment("20180507", "YYYYMMDD")},
	{aluno: ALUNOS[3], bolsista: BOLSISTAS[1], diaPresenca: moment("20180507", "YYYYMMDD")},
	{aluno: ALUNOS[4], bolsista: BOLSISTAS[0], diaPresenca: moment("20180507", "YYYYMMDD")},
	{aluno: ALUNOS[5], bolsista: BOLSISTAS[0], diaPresenca: moment("20180514", "YYYYMMDD")},
	{aluno: ALUNOS[6], bolsista: BOLSISTAS[1], diaPresenca: moment("20180514", "YYYYMMDD")},
	{aluno: ALUNOS[7], bolsista: BOLSISTAS[1], diaPresenca: moment("20180514", "YYYYMMDD")},
	{aluno: ALUNOS[8], bolsista: BOLSISTAS[0], diaPresenca: moment("20180514", "YYYYMMDD")},
	{aluno: ALUNOS[9], bolsista: BOLSISTAS[0], diaPresenca: moment("20180514", "YYYYMMDD")},
	{aluno: ALUNOS[0], bolsista: BOLSISTAS[1], diaPresenca: moment("20180521", "YYYYMMDD")},
	{aluno: ALUNOS[1], bolsista: BOLSISTAS[1], diaPresenca: moment("20180521", "YYYYMMDD")},
	{aluno: ALUNOS[2], bolsista: BOLSISTAS[0], diaPresenca: moment("20180521", "YYYYMMDD")},
	{aluno: ALUNOS[3], bolsista: BOLSISTAS[0], diaPresenca: moment("20180521", "YYYYMMDD")},
	{aluno: ALUNOS[4], bolsista: BOLSISTAS[1], diaPresenca: moment("20180521", "YYYYMMDD")},
	{aluno: ALUNOS[5], bolsista: BOLSISTAS[1], diaPresenca: moment("20180521", "YYYYMMDD")}
]