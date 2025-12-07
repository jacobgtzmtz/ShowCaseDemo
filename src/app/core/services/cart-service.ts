import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { ICartItem } from '../models/icartitem';
import { IProduct } from '../models/iproduct';
import { ProductService } from './product-service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private productService = inject(ProductService);
  private cartKey = 'my-app-cart';

  private cartItemsInternal = signal<ICartItem[]>(this.getCartFromstorage());

  public cartItems = computed(() => {
    const products = this.productService.products();
    const cartItems = this.cartItemsInternal();

    if (!products.length) {
      return [];
    }

    return cartItems.map(item => {
      const product = products.find(p => p.id === item.productId);
      return { product: product!, quantity: item.quantity }
    }).filter(item => item.product != null);
  }

  );

  public cartCount = computed(() => this.cartItems().reduce((acc, item) => acc + item.quantity, 0));
  public totalPrice = computed(() => this.cartItems().reduce((acc, item) => acc + (item.product.price * item.quantity), 0));

  constructor() {
    effect(() => {
      this.saveCartToStorage(this.cartItemsInternal());
    });
  }


  /**
   ptivate
   */
  private saveCartToStorage(cart: ICartItem[]) {
    try {
      sessionStorage.setItem(this.cartKey, JSON.stringify(cart))
    } catch (e) {
      console.log('Error saving cart to session storage', e);
    }
  }

  private getCartFromstorage(): ICartItem[] {
    try {
      return JSON.parse(sessionStorage.getItem(this.cartKey) || '[]');
    } catch {
      console.log('Error getting cart from session storage');
      return [];
    }
  }


  /**
   * addToCart
  */
  public addToCart(product: IProduct) {
    this.cartItemsInternal.update( items => {
      const index = items.findIndex(item => item.productId === product.id);
      if (index === -1 ){
        return [...items, { productId: product.id, quantity: 1 }];
      } else {
      return items.map((item, i) => {
        i === index ? item.quantity++ : item;
        return item;  
      });
      }

    }

    );

  }



}
