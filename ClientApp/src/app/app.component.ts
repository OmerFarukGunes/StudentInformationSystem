import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService:AuthService, private router:Router){}

  title = 'SystemApp';
  logged=false;
  role:string='';
  id:number=0
  ngOnInit(){
    if(this.authService.loggedIn()==false){
      this.router.navigate(['/Home']);
      this.logged=false;
      localStorage.removeItem("token");
    }
    else{
      this.logged=true;
      this.id= this.authService.getId();
      this.role=this.authService.authType();
    }
  }
}
