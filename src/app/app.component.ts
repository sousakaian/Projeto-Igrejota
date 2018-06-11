import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BottomComponent } from './bottom/bottom.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Igrejota';

  constructor(private router: Router) {
    
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        this.setBottomMenu();
        window.scrollTo(0, 0);
    });
  }

  setBottomMenu() {
    let path = this.router.url;
    if (this.router.url.includes("inicio")) {
      BottomComponent.component.selected = "inicio";
    } else if (this.router.url.includes("jogo")) {
      BottomComponent.component.selected = "jogos";
    } else if (this.router.url.includes("noticia")) {
      BottomComponent.component.selected = "noticias";
    } else if (this.router.url.includes("calendario")) {
      BottomComponent.component.selected = "calendario";
    } else {
      BottomComponent.component.selected = ""
    }
  }
}
