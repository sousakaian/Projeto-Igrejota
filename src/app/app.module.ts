import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { NoticiaDetailComponent } from './noticia-detail/noticia-detail.component';
import { NoticiaEditComponent } from './noticia-edit/noticia-edit.component';
import { NoticiaHighlightComponent } from './noticia-highlight/noticia-highlight.component';
import { TopbarComponent } from './topbar/topbar.component';
import { BottomComponent } from './bottom/bottom.component';
import { JogoComponent } from './jogo/jogo.component';
import { JogoDetailComponent } from './jogo-detail/jogo-detail.component';
import { JogoEditComponent } from './jogo-edit/jogo-edit.component';
import { CategoriaSelectComponent } from './categoria-select/categoria-select.component';
import { CategoriaEditComponent } from './categoria-edit/categoria-edit.component';

import { NoticiaService } from './noticia.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './/app-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { JogoService } from './jogo.service';


@NgModule({
  declarations: [
    AppComponent,
    NoticiasComponent,
    NoticiaDetailComponent,
    NoticiaEditComponent,
    NoticiaHighlightComponent,
    TopbarComponent,
    BottomComponent,
    JogoComponent,
    JogoDetailComponent,
    JogoEditComponent,
    CategoriaSelectComponent,
    CategoriaEditComponent,
    MessagesComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    NoticiaService,
    MessageService,
    JogoService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
