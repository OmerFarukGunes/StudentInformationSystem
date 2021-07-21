import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/models/user';
import { Email } from 'src/app/models/Email';
import { sha256 } from 'js-sha256';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  baseUrl:string="http://localhost:5000/api/user/";
  jwtHelper = new JwtHelperService();
  email:Email = new Email();
  constructor(public http:HttpClient) { }
  login(model:User){
    return this.http.post(this.baseUrl+'login',model).pipe(
      map((response:any)=>{
       const result=response;
        if (result) {
          localStorage.setItem("token",result.token);
        }
      })
    );

  }

  register(model:User):Observable<User>{
    model.password = this.getRandomString();
    return this.http.post<User>(this.baseUrl+'register',model);
  }
  authType():string{
    let token = localStorage.getItem('token');
    let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));
    return decodedJWT.role;
  }
  getId():number{
    let token = localStorage.getItem('token');
    let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));
    return decodedJWT.nameid;
  }
  loggedIn(){
    const token =localStorage.getItem("token")!;
    return !this.jwtHelper.isTokenExpired(token);
  }
  getRandomString() {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var randomLowChars = 'abcdefghijklmnopqrstuvwxyz';
    var randomNum = '0123456789';
    var randomNonAlpha = '-. _ @ +$!%*#?&';
    var result = '';
    for ( var i = 0; i < 5; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        result += randomLowChars.charAt(Math.floor(Math.random() * randomLowChars.length));
        result += randomNum.charAt(Math.floor(Math.random() * randomNum.length));
        result += randomNonAlpha.charAt(Math.floor(Math.random() * randomNonAlpha.length));
    }
    return result;
  }
}
