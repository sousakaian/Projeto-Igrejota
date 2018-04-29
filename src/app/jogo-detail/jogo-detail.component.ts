import { Component, OnInit, Input } from '@angular/core';
import { Jogo } from '../jogo';
import { JogoService } from '../jogo.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-jogo-detail',
  templateUrl: './jogo-detail.component.html',
  styleUrls: ['./jogo-detail.component.css']
})

export class JogoDetailComponent implements OnInit {
  @Input() jogo: Jogo;

  constructor(
	  private jogoService: JogoService,
	  private route: ActivatedRoute,
	  private location: Location
  ) {
  	
  }

  ngOnInit() {
  	this.getJogo();
  }

  getJogo(): void {
  	const id = +this.route.snapshot.paramMap.get('id');
  	this.jogoService.getJogo(id)
  		.subscribe(jogo => this.jogo = jogo);
  }

}
