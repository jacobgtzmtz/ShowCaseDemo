import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-form',
  imports: [
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    TranslatePipe
  ],
  templateUrl: './product-form.html',
  styles: ``,
})
export default class ProductForm implements OnInit {
  private productService = inject(ProductService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  public translate = inject(TranslateService);

  public productForm!: FormGroup;


  ngOnInit() {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]],
      description: [''],
      category: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  /**
   * onSubmit
   */
  public onSubmit() {

    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value).subscribe({
        next: (newProduct) => {
          this.productService.addewProductToState(newProduct);
          this.router.navigate(['/products']);
        },
        error: (err) => console.log('Error creating product', err)
      })

    }


  }



}
