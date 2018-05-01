import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router'
import { NoticiasComponent } from './noticias/noticias.component';
import { NoticiaDetailComponent } from './noticia-detail/noticia-detail.component';
import { NoticiaEditComponent } from './noticia-edit/noticia-edit.component';
import { JogoComponent } from './jogo/jogo.component';
import { JogoDetailComponent } from './jogo-detail/jogo-detail.component';
import { JogoEditComponent } from './jogo-edit/jogo-edit.component';
import { CategoriaEditComponent } from './categoria-edit/categoria-edit.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: MainPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'noticia/:id', component: NoticiaDetailComponent },
  { path: 'noticia/edit/:id', component: NoticiaEditComponent, canActivate: [AuthGuard] },
  { path: 'categorias/edit', component: CategoriaEditComponent, canActivate: [AuthGuard] },
  { path: 'jogos', component: JogoComponent },
  { path: 'jogo/:id', component: JogoDetailComponent },
  { path: 'jogo/edit/:id', component: JogoEditComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
	
}
