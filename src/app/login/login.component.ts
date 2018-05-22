import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { AuthService } from '../auth.service';
import { TopbarComponent } from '../topbar/topbar.component';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  enviado: boolean = false;
  login: string;
  loginValido: boolean;
  senha: string;
  senhaValida: boolean;

  constructor(
    public auth: AuthService,
    public router: Router
    ) {

  }

  ngOnInit() {
  }

  entrar() {
  	this.enviado = true;
  	this.auth.login(this.login,this.senha)
      .subscribe(login => login ? this.router.navigate([this.router.url]) : this.router.navigate(['/inicio']));
  }

}
