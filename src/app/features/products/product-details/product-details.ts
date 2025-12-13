import { Component, effect, inject, input } from '@angular/core';
import { ProductService } from '../../../core/services/product-service';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from "@angular/router";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-details',
  imports: [
    MatCardModule, 
    CurrencyPipe, 
    MatButtonModule, 
    MatIconModule, 
    RouterLink, 
    MatProgressSpinnerModule,
    TranslatePipe],
  templateUrl: './product-details.html',
  styles: ``,
})
export default class ProductDetails {
  public productService = inject(ProductService);
  private _snackBar = inject(MatSnackBar);
  public translate = inject(TranslateService);

  //para que funcione, obtner el valor de la URL en propiedades Input, hay que usar 'withComponentInputBinding()' en el router (app.config.ts);
  public id = input.required<string>();

  constructor() {
    effect(() => {
      this.productService.setSelectProductID(this.id());
    });
  }

  /**
   * rateProduct
   */
  public rateProduct(rating: number): void {
    const productId = this.id();
    this.productService.updateProductRating(productId, rating);
    this.openSnackBar(rating);
  }

  /**
   * openSnackBar
   */
  private openSnackBar(rating: number) {
    this._snackBar.open(`Thanks for rating with ${rating} stars!`, 'Close', {
      duration: 2000,
    });
  }

}
