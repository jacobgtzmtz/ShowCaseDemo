import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { IUser } from '../../models/iuser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-register-component',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormField,
    MatInputModule,
    MatCheckboxModule,
    MatAnchor
],
  templateUrl: './register-component.html',
  styles: ``,
})
export default class RegisterComponent {

  private fb = inject(FormBuilder);
  private authService= inject(AuthService);
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  public form!: FormGroup;

  ngOnInit(): void{
    this.createForm();
  }

  /**
   * createForm
   */
  public createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [ Validators.required, Validators.email] ],
      firstName: [''],
      lastName: [''],
      phone: [''],
      acceptterms: [false, Validators.requiredTrue],
    })
  }

  /**
   * onSubmit
   */
  public onSubmit(): void {
    if (this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const payload: IUser = this.form.value as IUser;
    this.authService.register(payload).subscribe({
      next: (res) => {
        this.displayMessage();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log('Error: ', err);
      }
    });

  }


  /**
   * displayMessage
   */
  private displayMessage() {
    this._snackBar.open(`Your account was created successfully.`, 'Close', {
      duration: 3000,
    })
  }





}
