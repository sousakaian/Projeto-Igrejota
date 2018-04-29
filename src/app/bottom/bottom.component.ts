import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom',
  templateUrl: './bottom.component.html',
  styleUrls: ['./bottom.component.css']
})
export class BottomComponent implements OnInit {
  bolsista: Boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToAcervo(): void {
  	this.router.navigate(['/jogos']);
  }

  goToNoticias(): void {
  	this.router.navigate(['/noticias']);
  }

  goToCalendario(): void {

  }

  goToEdit(): void {
  	
  }

}
