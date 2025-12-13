import { inject, Injectable } from '@angular/core';
import { IUser } from '../models/iuser';
import { catchError, Observable, tap } from 'rxjs';
import { ILoginResponse } from '../models/iloginresponse';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { handleError } from '../../../core/utils/http-error.handler';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authURL = environment.AUTHURL;
  private http = inject(HttpClient);
  private route = inject(Router);

  

  /**
   * login
   * 
   */
  public login(user: IUser): Observable<ILoginResponse> {
    const { username, password } = user;

    return this.http.post<ILoginResponse>(`${this.authURL}/auth/login`, {username, password}).pipe(
      catchError(handleError),
      tap(response =>{
        if(!response) return;
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('isLoggedIn', 'true');
      })
    );
  }

  /**
   * logout
   */
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    this.route.navigate(['/']);
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public isLoggedIn(){
    return localStorage.getItem('isLoggedIn');
  }
  
}
