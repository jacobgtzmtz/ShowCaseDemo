import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { IState } from '../models/istate';
import { IProduct } from '../models/iproduct';
import { environment } from '../../../environments/environment.development';
import { catchError, Observable } from 'rxjs';
import { handleError } from '../utils/http-error.handler';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private http = inject(HttpClient);
  private productsEndpoint = `${environment.APIURL}products`;
  private productsState = signal<IState<IProduct[]>>(
    {
      data: [],
      loading: true,
      error: false
    }
  );

  public products = computed(() => this.productsState().data);
  public loading = computed(() => this.productsState().loading);
  public gotError = computed(() => this.productsState().error);

constructor(){
  this.getProducts()
}

/**
 * getProducts
 */
private getProducts(): void {
  this.http.get<IProduct[]>(this.productsEndpoint)
  .pipe(
    catchError(err => {
      this.productsState.set({ data: [], loading: false, error: true});
      return handleError(err);
    })
  )
  .subscribe(res => {
    this.productsState.set({
      data: res,
      loading: false,
      error: false
    })
  })
}


/**
 * addProduct
 */
public addProduct(product: Omit<IProduct, 'id' | 'rating'>): Observable<IProduct> {
  return this.http.post<IProduct>(this.productsEndpoint, product).pipe(
    catchError(err => {
      this.productsState.update(state => ({ ...state, error: true}));
      return handleError(err);
    })
  )
}

/**
 * addewProductToState
 */
public addewProductToState(product: IProduct) {
  this.productsState.update(state => ({ ...state, data: [...state.data, product] }) );

}

/**
 * deleteProduct
 */
public deleteProduct(id: string): void {
  this.http.delete(`${this.productsEndpoint}/${id}`).subscribe({
    next: () => {
      this.productsState.update(state => {
        const updatedData = state.data.filter(p => p.id !== id);
        return { ...state, data: updatedData}
      })
    },
    error: (err) => {
      this.productsState.update(state => ({...state, error: true}))
      handleError(err);
    }
  })
}




}
