import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http:HttpClient) { }
  baseUrl:string="http://localhost:5000";

 getUserById(id:number):Observable<User>{
   let newUrl = this.baseUrl+'/api/User/'+id;
   return this.http.get<User>(newUrl);
 }
}
