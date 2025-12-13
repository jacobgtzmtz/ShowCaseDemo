import { Component, inject } from '@angular/core';
import { IUser } from '../../models/iuser';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInput } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAnchor, MatButton, MatButtonModule } from "@angular/material/button";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login-component',
  imports: [MatCardModule, FormsModule, MatInput, MatFormFieldModule, MatAnchor, MatButtonModule, RouterLink],
  templateUrl: './login-component.html',
  styles: ``,
})
export default class LoginComponent {
public user: IUser = {
  username: '',
  password: '',
};
public error: string | null= null;

private authService= inject(AuthService);
private route = inject(Router);



/**
 * onSubmit
 */
public onSubmit(form: NgForm) {
  if(form.valid){
    this.authService.login(this.user).subscribe({
      next: () => {
        this.route.navigate(['']);
      },
      error: () => { this.error = 'Error trying to login'}
    }
    );
  }
}


}
