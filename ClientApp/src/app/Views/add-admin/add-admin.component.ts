import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify/alertify.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css'],
})
export class AddAdminComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private router:Router
  ) {}
  user: User = new User();
  ngOnInit(): void {
    if (this.authService.authType() != 'Admin') this.router.navigate(['/Home']);
  }
  add() {
    this.user.userName = this.user.email;
    this.user.role = 'Admin';
    this.authService.register(this.user).subscribe((usr) => {
      this.alertifyService.success('Admin başarıyla ekledi');
    },error=>{
      this.alertifyService.error('Farklı bir gmail adresi giriniz veya daha sonra tekrar deneyiniz.');
    });
  }
}
