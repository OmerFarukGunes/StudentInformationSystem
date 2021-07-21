import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public  authService:AuthService,private router:Router,private appComponent:AppComponent) { }
  model:User=new User();
  ngOnInit(): void {
  }
  login(){
    this.authService.login(this.model).subscribe(user=>{
      this.router.navigate(['Home'])
  .then(() => {
    window.location.reload();
  });
    },error=>{

    });
  }
  loggedIn(){
    return this.authService.loggedIn();
  }
  logout(){
    localStorage.removeItem("token");
    this.appComponent.ngOnInit();
    this.router.navigate(['/Home']);
  }
}
