import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/models/Payment';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(public http:HttpClient) { }
  baseUrl:string="http://localhost:5000";

  getPayments():Observable<Payment[]>{
    let newUrl = this.baseUrl+'/api/Payment'
   return this.http.get<Payment[]>(newUrl);
 }
 deletePayment(Payment:Payment):Observable<Payment>{
   let newUrl=this.baseUrl+'/api/Payment/'+Payment.paymentId;
   return this.http.delete<Payment>(newUrl);
 }
 updatePayment(Payment:Payment){
   let newUrl=this.baseUrl+'/api/Payment/'+Payment.paymentId;
   return this.http.put<Payment>(newUrl,Payment);
 }
 getPaymentById(id:number):Observable<Payment>{
   let newUrl = this.baseUrl+'/api/Payment/'+id;
   return this.http.get<Payment>(newUrl);
 }
 addPayment(Payment:Payment):Observable<Payment>{
   let newUrl = this.baseUrl+'/api/Payment';
  return this.http.post<Payment>(newUrl,Payment);
 }
}
