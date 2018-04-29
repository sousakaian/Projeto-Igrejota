import { Component, OnInit, Input } from '@angular/core';
import { Jogo } from '../jogo';
import { JogoService } from '../jogo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-jogo-edit',
  templateUrl: './jogo-edit.component.html',
  styleUrls: ['./jogo-edit.component.css']
})
export class JogoEditComponent implements OnInit {
  @Input() jogo: Jogo;

  constructor(
	  private jogoService: JogoService,
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
  	this.jogoService.getJogo(id)
  		.subscribe(jogo => this.jogo = jogo);
  }

  onSave(jogo: Jogo): void {
  	this.jogoService.editJogo(jogo);
  	this.router.navigate(['/jogo/'+jogo.id]);
  }

  onDelete(jogo: Jogo): void {
  	this.jogoService.removeJogo(jogo.id);
  	this.router.navigate(['/jogos'])
  }

}
