import { Noticia } from './noticia'
import * as moment from 'moment';

moment.locale('pt-br');
let momento = moment();

export var NOTICIAS: Noticia[] = [
	{id: 1, titulo: "Novo jogo em teste na próxima semana", conteudo: "Amanha teremos um novo jogo, conhecido como Formas Injustas", dataCriacao: momento, dataEdicao: momento, imagemDestaque: ""},
	{id: 2, titulo: "Próxima semana não haverá Igrejota", conteudo: "Devido ao Dia do Trabalho, resolvemos cancelar as atividades do Igrejota", dataCriacao: moment("2018-04-13 12:00:56"), dataEdicao: moment("2018-04-28 12:30:23"), imagemDestaque: ""},
	{id: 3, titulo: "Nós vamos estar na bienal de 2019", conteudo: "Se você for para a Bienal entre os dias 15 e 20 de abril", dataCriacao: moment("2018-04-13 04:00:22"), dataEdicao: moment("2018-04-14 08:41:04"), imagemDestaque: ""},
	{id: 4, titulo: "Amanhã será o dia dos party-games", conteudo: "", dataCriacao: moment("2018-04-06 21:14:33"), dataEdicao: moment("2018-04-06 21:14:33"), imagemDestaque: ""}
]