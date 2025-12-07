import { Component } from '@angular/core';
import ProductsList from '../features/products/products-list/products-list';

@Component({
  selector: 'app-landing-page',
  imports: [ProductsList],
  template: `
    <section>
      <app-products-list [latest]="true"></app-products-list>
    </section>
  `,
  styles: ``,
})
export class LandingPage {

}
