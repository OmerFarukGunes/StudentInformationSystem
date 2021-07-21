import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Connection } from 'src/app/models/Connection';
@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(public http:HttpClient) { }
  baseUrl:string="http://localhost:5000";
 deleteConnection(Connection:Connection):Observable<Connection>{
   let newUrl=this.baseUrl+'/api/Connection/'+Connection.connectionId;
   return this.http.delete<Connection>(newUrl);
 }
 updateConnection(Connection:Connection){
   let newUrl=this.baseUrl+'/api/Connection/'+Connection.connectionId;
   return this.http.put<Connection>(newUrl,Connection);
 }
 getConnectionById(id:number):Observable<Connection>{
   let newUrl = this.baseUrl+'/api/Connection/'+id;
   return this.http.get<Connection>(newUrl);
 }
 getConnectionByFamilyId(id:number):Observable<Connection[]>{
  let newUrl = this.baseUrl+'/api/Connection/ByFamilyId/'+id;
  return this.http.get<Connection[]>(newUrl);
}
getConnectionByStudentId(id:number):Observable<Connection>{

  let newUrl = this.baseUrl+'/api/Connection/ByStudentId/'+id;
  console.log(newUrl);
  return this.http.get<Connection>(newUrl);
}
 addConnection(Connection:Connection):Observable<Connection>{
   let newUrl = this.baseUrl+'/api/Connection';
  return this.http.post<Connection>(newUrl,Connection);
 }
}
