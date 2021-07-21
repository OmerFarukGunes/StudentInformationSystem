import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parent } from 'src/app/models/Parent';
@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor(public http:HttpClient) { }
  baseUrl:string="http://localhost:5000";

  getParents():Observable<Parent[]>{
    let newUrl = this.baseUrl+'/api/Parent'
   return this.http.get<Parent[]>(newUrl);
 }
 searchParent(info:Parent):Observable<Parent[]>{
  let newUrl=this.baseUrl+'/api/Parent/filterParent';
  return  this.http.post<Parent[]>(newUrl, info,
          {
              headers : new HttpHeaders({"Content-Type": "application/json"})
          });

}
 deleteParent(id:number):Observable<Parent>{
   let newUrl=this.baseUrl+'/api/Parent/'+id;
   return this.http.delete<Parent>(newUrl);
 }
 updateParent(Parent:Parent){
   let newUrl=this.baseUrl+'/api/Parent/'+Parent.parentId;
   return this.http.put<Parent>(newUrl,Parent);
 }
 getParentById(id:number):Observable<Parent>{
   let newUrl = this.baseUrl+'/api/Parent/'+id;
   return this.http.get<Parent>(newUrl);
 }
 getParentByLoginId(id:number):Observable<Parent>{
  let newUrl = this.baseUrl+'/api/Parent/ByLoginId/'+id;
  return this.http.get<Parent>(newUrl);
}
 addParent(Parent:Parent):Observable<Parent>{
   let newUrl = this.baseUrl+'/api/Parent';
  return this.http.post<Parent>(newUrl,Parent);
 }
}
