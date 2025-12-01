import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart-service';
import { MatListModule } from '@angular/material/list';
import { CurrencyPipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-cart-list',
  imports: [MatListModule, CurrencyPipe, MatDividerModule, MatCardModule],
  templateUrl: './cart-list.html',
  styles: ``,
})
export default class CartListComponent {

  public cartService = inject(CartService);

}
