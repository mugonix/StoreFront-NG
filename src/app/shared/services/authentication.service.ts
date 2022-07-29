import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/login-response.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  _isAuthenticated:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  _user:BehaviorSubject<User| null> = new BehaviorSubject<User | null>(null);

  constructor(private http:HttpClient) { 
    this.getAuthenticatedUser();
  }

  setCsrfCookie(){
    return this.http.get(environment.sanctumCsrfCookieUrl);
  }
  
  getAuthenticatedUser(){
    return this.http.get<User>(environment.authenticatedUserUrl)
    .subscribe({next: (user:User)=> {
      this._user.next(user);
      this._isAuthenticated.next(true);
    }, error: (err)=>{
      this._user.next(null);
      this._isAuthenticated.next(false);
    }});
  }

  get isAuthenticated():Observable<boolean>{
    return this._isAuthenticated.pipe(distinctUntilChanged());
  }

  get user():User|null {
    return this._user.getValue();
  }

  login(username:string,password:string):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(environment.loginUrl,{email:username,password:password})
    .pipe(tap((response:LoginResponse)=>{
      this._user.next(response.data);
      this._isAuthenticated.next(true);
    }));
  }
  // 
  logout(){
    return this.http.post(environment.logoutUrl,{})
    .pipe(tap({next:()=>{
      this._user.next(null);
      this._isAuthenticated.next(false);
    }}));
  }
}
