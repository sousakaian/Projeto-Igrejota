import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  mostrarMenu: Boolean = false

  constructor(
  	private router: Router,
  	public auth: AuthService
  	) {

  }

  ngOnInit() {
  	
  }

  toggleMenu(): void {
    this.mostrarMenu = !this.mostrarMenu
  }

  goToGerenciarPerfil(): void {
    
  }

  goToGerenciarApp(): void {

  }

  sair(): void {
  	this.auth.logout();
    this.mostrarMenu = false
  	this.router.navigate(['/inicio']);
  }

}
