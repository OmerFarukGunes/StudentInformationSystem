import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/Student';
import { User } from 'src/app/models/user';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(public http:HttpClient) { }
  baseUrl:string="http://localhost:5000";

  getStudents():Observable<Student[]>{
    let newUrl = this.baseUrl+'/api/Student'
   return this.http.get<Student[]>(newUrl);
 }
 getStudentByLoginId(id:number):Observable<Student>{
  let newUrl = this.baseUrl+'/api/Student/ByLoginId/'+id;
 return this.http.get<Student>(newUrl);
}
 deleteStudent(id:number):Observable<Student>{
   let newUrl=this.baseUrl+'/api/Student/'+id;
   return this.http.delete<Student>(newUrl);
 }
 searchStudent(info:Student):Observable<Student[]>{
  let newUrl=this.baseUrl+'/api/Student/filterStudent';
  return  this.http.post<Student[]>(newUrl, info,
          {
              headers : new HttpHeaders({"Content-Type": "application/json"})
          });

}
 updateStudent(student:Student){
   let newUrl=this.baseUrl+'/api/Student/'+student.studentId;
   return this.http.put<Student>(newUrl,student);
 }
 getStudentById(id:number):Observable<Student>{
   let newUrl = this.baseUrl+'/api/Student/'+id;
   return this.http.get<Student>(newUrl);
 }
 addStudent(student:Student):Observable<Student>{
   let newUrl = this.baseUrl+'/api/Student';
  return this.http.post<Student>(newUrl,student);
 }
}
