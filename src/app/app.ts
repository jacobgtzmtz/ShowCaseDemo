import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './shared/components/nav-bar/nav-bar';

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
}