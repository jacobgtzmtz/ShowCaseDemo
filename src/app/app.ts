import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
  <main class="container mt-4">
    <router-outlet></router-outlet>
  </main>
  `,
})
export class App {
  protected readonly title = signal('showCaseDemo');
}