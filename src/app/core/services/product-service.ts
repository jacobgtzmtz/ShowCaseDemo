import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { IState } from '../models/istate';
import { IProduct } from '../models/iproduct';
import { environment } from '../../../environments/environment.development';
import { catchError } from 'rxjs';
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


}
