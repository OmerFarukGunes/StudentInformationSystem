import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SchoolInfo } from 'src/app/models/SchoolInfo';
import { Student } from 'src/app/models/Student';
@Injectable({
  providedIn: 'root'
})
export class SchoolInfoService {

  constructor(public http:HttpClient) { }
  baseUrl:string="http://localhost:5000";

  getSchoolInfos():Observable<SchoolInfo[]>{
    let newUrl = this.baseUrl+'/api/SchoolInfo'
   return this.http.get<SchoolInfo[]>(newUrl);
 }
 searchSchool(info:SchoolInfo):Observable<Student[]>{
  let newUrl=this.baseUrl+'/api/SchoolInfo/filterSchool';
  return  this.http.post<Student[]>(newUrl, info,
          {
              headers : new HttpHeaders({"Content-Type": "application/json"})
          });

}
 deleteSchoolInfo(SchoolInfo:SchoolInfo):Observable<SchoolInfo>{
   let newUrl=this.baseUrl+'/api/SchoolInfo/'+SchoolInfo.schoolInfoId;
   return this.http.delete<SchoolInfo>(newUrl);
 }
 updateSchoolInfo(SchoolInfo:SchoolInfo){
   let newUrl=this.baseUrl+'/api/SchoolInfo/'+SchoolInfo.schoolInfoId;
   return this.http.put<SchoolInfo>(newUrl,SchoolInfo);
 }
 getSchoolInfoById(id:number):Observable<SchoolInfo>{
   let newUrl = this.baseUrl+'/api/SchoolInfo/'+id;
   return this.http.get<SchoolInfo>(newUrl);
 }
 addSchoolInfo(SchoolInfo:SchoolInfo):Observable<SchoolInfo>{
   let newUrl = this.baseUrl+'/api/SchoolInfo';
  return this.http.post<SchoolInfo>(newUrl,SchoolInfo);
 }
}
