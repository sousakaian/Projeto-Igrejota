import { Noticia } from './noticia'

export var NOTICIAS: Noticia[] = [
	{id: 1, titulo: "Novo jogo em teste na próxima semana", conteudo: "Amanha teremos um novo jogo, conhecido como Formas Injustas", dataCriacao: new Date(Date.now()), dataEdicao: undefined, imagemDestaque: ""},
	{id: 2, titulo: "Próxima semana não haverá Igrejota", conteudo: "Devido ao Dia do Trabalho, resolvemos cancelar as atividades do Igrejota", dataCriacao: new Date("2018-04-13T12:00:56"), dataEdicao: new Date("2018-04-28T12:30:23"), imagemDestaque: ""},
	{id: 3, titulo: "Nós vamos estar na bienal de 2019", conteudo: "Se você for para a Bienal entre os dias 15 e 20 de abril", dataCriacao: new Date("2018-04-13T04:00:22"), dataEdicao: new Date("2018-04-14T08:41:04"), imagemDestaque: ""},
	{id: 4, titulo: "Amanhã será o dia dos party-games", conteudo: "", dataCriacao: new Date("2018-04-06T21:14:33"), dataEdicao: new Date("2018-04-06T21:14:33"), imagemDestaque: ""}
]