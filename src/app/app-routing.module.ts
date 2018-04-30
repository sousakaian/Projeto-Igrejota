import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { NoticiasComponent } from './noticias/noticias.component';
import { NoticiaDetailComponent } from './noticia-detail/noticia-detail.component';
import { NoticiaEditComponent } from './noticia-edit/noticia-edit.component';
import { JogoComponent } from './jogo/jogo.component';
import { JogoDetailComponent } from './jogo-detail/jogo-detail.component';
import { JogoEditComponent } from './jogo-edit/jogo-edit.component';
import { CategoriaEditComponent } from './categoria-edit/categoria-edit.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: MainPageComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'noticia/:id', component: NoticiaDetailComponent },
  { path: 'noticia/edit/:id', component: NoticiaEditComponent },
  { path: 'categorias/edit', component: CategoriaEditComponent},
  { path: 'jogos', component: JogoComponent },
  { path: 'jogo/:id', component: JogoDetailComponent },
  { path: 'jogo/edit/:id', component: JogoEditComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
	
}
