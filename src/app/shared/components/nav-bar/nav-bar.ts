import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from "@angular/router";
import { CartService } from '../../../core/services/cart-service';
import { AuthService } from '../../../features/auth/services/auth-service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-nav-bar',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink, TranslatePipe, MatMenuModule],
  templateUrl: './nav-bar.html',
  styles: ``,
})
export class NavBar {

  public cartService = inject(CartService);
  public authService = inject(AuthService);

  public translate = inject(TranslateService);


  /**
   * changeLang
   */
  public changeLang(lang: string) {
    this.translate.use(lang);
  }

 

}
