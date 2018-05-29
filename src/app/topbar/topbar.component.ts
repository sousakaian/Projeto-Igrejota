import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  mostrarMenu: Boolean = false

  constructor(
  	private router: Router,
    private messageService: MessageService,
  	public auth: AuthService,
  	) {

  }

  ngOnInit() {
  	
  }

  toggleMenu(): void {
    this.mostrarMenu = !this.mostrarMenu
  }

  goToGerenciarPerfil(): void {
    this.messageService.clear();
  }

  goToGerenciarApp(): void {
    this.messageService.clear();
  }

  sair(): void {
  	this.auth.logout();
    this.mostrarMenu = false
  	this.router.navigate(['/inicio']);
    this.messageService.clear();
  }

}
