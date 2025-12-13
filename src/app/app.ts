import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './shared/components/nav-bar/nav-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar],
  template: `
   <app-nav-bar></app-nav-bar>
  <main class="container mt-4">
    <router-outlet></router-outlet>
  </main>
  `,
})
export class App {
  protected readonly title = signal('showCaseDemo');

  public translate = inject(TranslateService);


  constructor(){
    this.translate.addLangs(['en', 'es']);
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|es/) ? browserLang : 'en');

  }
}