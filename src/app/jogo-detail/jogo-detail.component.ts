import { Component, OnInit, Input } from '@angular/core';
import { Jogo } from '../jogo';
import { JogoService } from '../jogo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-jogo-detail',
  templateUrl: './jogo-detail.component.html',
  styleUrls: ['./jogo-detail.component.css']
})

export class JogoDetailComponent implements OnInit {
  @Input() jogo: Jogo;

  constructor(
    public auth: AuthService,
	  private jogoService: JogoService,
    private messageService: MessageService,
	  private route: ActivatedRoute,
    private router: Router,
	  private location: Location
  ) {
  	
  }

  ngOnInit() {
  	this.getJogo();
  }

  getJogo(): void {
  	const id = +this.route.snapshot.paramMap.get('id');
  	this.jogoService.get(id)
  		.subscribe(jogo => this.jogo = jogo);
  }

}
