import { Component, computed, inject, input } from '@angular/core';
import { ProductService } from '../../../core/services/product-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { MatIcon } from "@angular/material/icon";
import { IProduct } from '../../../core/models/iproduct';
import { CartService } from '../../../core/services/cart-service';
import { HighlightDirective } from '../../../shared/directives/highlight-directive';
import { RouterLink } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogcomponent } from '../../../shared/components/confirm-dialogcomponent/confirm-dialogcomponent';
import { AuthService } from '../../auth/services/auth-service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-products-list',
  imports: [
    MatProgressSpinnerModule, 
    MatCardModule, 
    MatButtonModule, 
    CurrencyPipe, 
    MatIcon, 
    HighlightDirective, 
    RouterLink, 
    TranslatePipe],
  templateUrl: './products-list.html',
  styles: `
  .a-card-link {
    all: unset;
    cursor: pointer;
  }
  `,
})
export default class ProductsList {
  public latest = input<boolean>(false);

  public productsService = inject(ProductService);
  private cartService = inject(CartService)
  private dialog = inject(MatDialog);
  public authService= inject(AuthService);
  public translate = inject(TranslateService);


  protected filteredProducts = computed ( () => {
    const list = this.productsService.products();
    return this.latest() ? list.slice(0, 3) : list;
  })

  /**
   * addToCart
   */
  public addToCart(product: IProduct) {
    this.cartService.addToCart(product);
  }

  /**
   * deleteProduct
   */
  public deleteProduct(id: string) {
      const product = this.productsService.products().find(p => p.id === id );
      if(!product) return;

      const dialogRef = this.dialog.open(ConfirmDialogcomponent, {
        data: {productName: product.title }
      });

      dialogRef.afterClosed().subscribe( result => {
        if (result) {
          this.productsService.deleteProduct(id);
        }
      } )


      


  }
}
