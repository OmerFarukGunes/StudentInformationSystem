import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from 'src/app/models/Payment';
import { SchoolInfo } from 'src/app/models/SchoolInfo';
import { Student } from 'src/app/models/Student';
import { AlertifyService } from 'src/app/services/alertify/alertify.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { SchoolInfoService } from 'src/app/services/schoolInfo/school-info.service';
import { StudentService } from 'src/app/services/student/student.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth/auth.service';

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@ViewChild('myModal')
@Component({
  selector: 'app-school-payment',
  templateUrl: './school-payment.component.html',
  styleUrls: ['./school-payment.component.css'],
  styles: [
    `
      .dark-modal .modal-content {
        background-color: #292b2c;
        color: white;
      }
      .dark-modal .close {
        color: white;
      }
      .light-blue-backdrop {
        background-color: #5cb3fd;
      }
    `,
  ],
})
export class SchoolPaymentComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private schoolInfoService: SchoolInfoService,
    private studentService: StudentService,
    private paymentService: PaymentService,
    private alertifyService: AlertifyService,
    public authService:AuthService,
    private router:Router
  ) {}
  student: Student[] = [];
  schoolInfo: SchoolInfo = new SchoolInfo();
  info: SchoolInfo = new SchoolInfo();
  paymentInfo: Payment = new Payment();
  id!: number;
  closeModal!: string;
  year: number = new Date().getFullYear();
  month: number = new Date().getMonth();
  remaining: number=0;
  selected = 0;
  _index = 0;

paidOfMonth:number=0;
everyPaifOfMonths:number[]=[];
  ngOnInit(): void {
    if(this.authService.authType()=='Student')
      this.router.navigate(['/Home']);
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.studentService.getStudentById(this.id).subscribe((std) => {
        this.student[0] = std;
      });
    } else {
      this.studentService.getStudents().subscribe((std) => {
        this.student = std;
      });
    }
  }
  getInfo(content: any, index: number) {
    this.schoolInfoService
      .getSchoolInfoById(this.student[index].schoolInfoId)
      .subscribe((info) => {
        this.schoolInfo = info;
        this.paymentService
          .getPaymentById(this.student[index].paymentId)
          .subscribe((data) => {
            this.paymentInfo = data;
            if (data.startMonth > this.month)
              this.remaining = (
                data.installment -
                (data.startMonth - this.month)
              );
            else
              this.remaining = (
                data.installment -
                (this.month - data.startMonth)
              );
              this.everyPaifOfMonths = this.paymentInfoMonth(this.paymentInfo.installment);
            if (content != null)
              this.modalService.open(content, { size: 'xl' });
          });
      });
  }
  openXl(content: any, index: number) {
    this.getInfo(content, index);
  }
  onSubmit() {
    if (this.selected == 1) {
      this.schoolInfoService
        .addSchoolInfo(this.schoolInfo)
        .subscribe((model) => {
          this.schoolInfo = model;
          this.student[this._index].schoolInfoId = model.schoolInfoId;
          this.paymentService.addPayment(this.paymentInfo).subscribe((item) => {
            this.paymentInfo = item;
            this.student[this._index].paymentId = item.paymentId;
            this.studentService
              .updateStudent(this.student[this._index])
              .subscribe(() => {
                this.alertifyService.success('Bilgiler Kaydedildi');
              });
          },error=>{this.alertifyService.error('Tekrar Deneyiniz');});
        },error=>{this.alertifyService.error('Tekrar Deneyiniz');});
    } else {
      this.schoolInfoService
        .updateSchoolInfo(this.schoolInfo)
        .subscribe((model) => {
          this.schoolInfo = model;
          this.paymentService
            .updatePayment(this.paymentInfo)
            .subscribe((item) => {
              this.paymentInfo = item;
              this.alertifyService.success('Bilgiler Kaydedildi');
            },error=>{this.alertifyService.error('Tekrar Deneyiniz');});
        },error=>{this.alertifyService.error('Tekrar Deneyiniz');});
    }
    this.selected = 0;
  }

  selectForm(content: number, index: number) {
    if (content == 1) {
      this.selected = content;
      this._index = index;
    } else {
      this.getInfo(null, index);
      this.selected = content;
      this._index = index;
    }
  }

  exportPdf(){
    const doc = new jsPDF()
    doc.setFont('Times-Roman')
    doc.setFontSize(10);
    autoTable(doc, { html: '#payment' })
    autoTable(doc, { html: '#paymentInfo' })
    doc.save('payment.pdf')

  }
  search(){
    this.schoolInfoService.searchSchool(this.info).subscribe(data=>{
      this.student=data;
    },error=>{
      this.alertifyService.error("Kayıt Bulunamadı");
    })
  }
  counterFor(index: number) {
    let res = [];
    for (let i = 0; i < index; i++) {
        res.push(i);
      }
      return res;
}
paymentInfoMonth(index: number) {
  let res = [];
  this.paidOfMonth=(this.paymentInfo.loan-((this.paymentInfo.loan/100)*this.paymentInfo.discount))/this.paymentInfo.installment;
  let total = this.paymentInfo.paid;
  for (let i = 0; i < index; i++) {
    if(this.paidOfMonth<=total){
      res.push(this.paidOfMonth);
      total-=this.paidOfMonth;
    }
    else if(total<=0){
      res.push(0);
    }
    else
    {
      res.push(total);
      total-=this.paidOfMonth;
    }
    }
    return res;
}
}
