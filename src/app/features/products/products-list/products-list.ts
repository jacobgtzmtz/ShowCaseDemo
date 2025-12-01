import { Component, inject } from '@angular/core';
import { ProductService } from '../../../core/services/product-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { MatIcon } from "@angular/material/icon";
import { IProduct } from '../../../core/models/iproduct';
import { CartService } from '../../../core/services/cart-service';

@Component({
  selector: 'app-products-list',
  imports: [MatProgressSpinnerModule, MatCardModule, MatButtonModule, CurrencyPipe, MatIcon],
  templateUrl: './products-list.html',
  styles: ``,
})
export default class ProductsList {

  public productsService = inject(ProductService);
  private cartService = inject(CartService)

  /**
   * addToCart
   */
  public addToCart(product: IProduct) {
    this.cartService.addToCart(product);
  }

}
