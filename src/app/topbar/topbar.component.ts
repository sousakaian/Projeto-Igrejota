import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(
  	private router: Router,
  	public auth: AuthService
  	) {

  }

  ngOnInit() {
  	
  }

  goToInicio(): void {
  	this.router.navigate(['/inicio']);
  }

  entrar():void {
  	this.router.navigate(['/login']);
  }

  sair(): void {
  	this.auth.logout();
  	this.router.navigate(['/inicio']);
  }

}
