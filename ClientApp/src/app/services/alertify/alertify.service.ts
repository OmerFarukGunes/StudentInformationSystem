import { Injectable } from '@angular/core';


declare let alertify:any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  //bu global bir yapıda olur ve bunun heryerde kullanabilirsin
  success(message:string){
    alertify.success(message)
  }
  error(message:string){
    alertify.error(message);
  }
}
