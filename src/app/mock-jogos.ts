import { Jogo } from './jogo'
import { Categoria } from './categoria'
import { CATEGORIAS } from './mock-categorias'

export var JOGOS: Jogo[] = [
	{id: 1, nome: "A", minJogadores: 2, maxJogadores:4, tempoJogo: 150, categorias: [CATEGORIAS[0],CATEGORIAS[3]], descricao: "Esse jogo é bom!", imagemJogo: "" ,linkDesenvolvedor: "http://www.google.com.br", linkManual:"http://www.wikipedia.org", emDestaque: false},
	{id: 2, nome: "B", minJogadores: 8, maxJogadores:15, tempoJogo: 45, categorias: [CATEGORIAS[2],CATEGORIAS[4],CATEGORIAS[5]], descricao: "Não sei muito sobre esse...", imagemJogo: "" ,linkDesenvolvedor: "http://www.google.com.br", linkManual:"http://www.wikipedia.org", emDestaque: true},
	{id: 3, nome: "C", minJogadores: 4, maxJogadores:8, tempoJogo: 300, categorias: [CATEGORIAS[1],CATEGORIAS[4]], descricao: "Demora demais.", imagemJogo: "" ,linkDesenvolvedor: "http://www.google.com.br", linkManual:"http://www.wikipedia.org", emDestaque: false},
	{id: 4, nome: "D", minJogadores: 3, maxJogadores:8, tempoJogo: 20, categorias: [], descricao: "Poderia ser mais rápido", imagemJogo: "" ,linkDesenvolvedor: "http://www.google.com.br", linkManual:"http://www.wikipedia.org", emDestaque: true},
	{id: 5, nome: "E", minJogadores: 6, maxJogadores:6, tempoJogo: 80, categorias: [CATEGORIAS[2]], descricao: "Saiba de uma coisa: esse jogo é um lixo!", imagemJogo: "" ,linkDesenvolvedor: "http://www.google.com.br", linkManual:"http://www.wikipedia.org", emDestaque: false}
]