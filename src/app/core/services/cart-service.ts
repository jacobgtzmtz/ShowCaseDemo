import { computed, Injectable, signal } from '@angular/core';
import { ICartItem } from '../models/icartitem';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItems = signal<ICartItem[]>([]);

  public cartCount = computed( () => this.cartItems().reduce( (acc, item ) => acc + item.quantity, 0) );

  public totalPrice = computed( () => this.cartItems().reduce((acc, item) => acc + (item.product.price * item.quantity), 0 ) )


/**
 * addToCart
*/
public addToCart(product: IProduct) {
  const index = this.cartItems().findIndex( item => item.product.id === product.id  )
  if(index === -1){
      //Add new product
      this.cartItems.update( items => [...items, {product: product, quantity: 1 }]  );
  } else {
    this.cartItems.update(items  => items.map(
      (item, i) => i === index ? {...item, quantity: item.quantity + 1}  : item
      ));
  }
  
}

  
}
