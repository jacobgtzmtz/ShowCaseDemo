import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from "@angular/router";
import { CartService } from '../../../core/services/cart-service';

@Component({
  selector: 'app-nav-bar',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './nav-bar.html',
  styles: ``,
})
export class NavBar {

  public cartService = inject(CartService);

}
