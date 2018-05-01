import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { Bolsista } from './bolsista';
import { BolsistaService } from './bolsista.service';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  public token: string;

  constructor(
  	private bolsistaService: BolsistaService,
  	private messageService: MessageService
  	) {

  }

	login(user:string, password:string): Observable<Boolean> {
	    var autenticado;
	    this.bolsistaService.validateLogin(user, password)
	    	.subscribe(aut => autenticado = aut);
	    if (autenticado) {
	    	this.setSession({user: user, expiraEm: 180});
	    	return of(true);
	    }
	    this.messageService.add("Login e/ou senha inválidos");
	    return of(false);
	}
	      
	private setSession(authResult) {
	    const expiresAt = moment().add(authResult.expiraEm,'second');

	    localStorage.setItem('user', JSON.stringify(authResult.user));
	    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
	}          

	logout() {
	    localStorage.removeItem("user");
	    localStorage.removeItem("expires_at");
	}

	public loggedIn() {
		if (moment().isBefore(this.getExpiration())) {
			this.resetExpiration();
			return true;
		}
		this.logout();
	    return false;
	}

	getLoggedUser(): string {
		let userData = localStorage.getItem("user");
		let user = JSON.parse(userData);
		return user;
	}

	getExpiration() {
	    const expiration = localStorage.getItem("expires_at");
	    const expiresAt = JSON.parse(expiration);
	    return moment(expiresAt);
	}

	private resetExpiration() {
		const expiresAt = moment().add(180,'second');
		localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
	}

}
