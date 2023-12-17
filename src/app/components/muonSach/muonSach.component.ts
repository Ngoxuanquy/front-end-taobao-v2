import { Component, OnInit } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-muonSach',
  templateUrl: './muonSach.component.html',
  styleUrls: ['./muonSach.component.css'],
  standalone: true,
  imports: [NzModalModule, MuonSachComponent, FormsModule],
})
export class MuonSachComponent implements OnInit {
  constructor(private cookieService: CookieService, private http: HttpClient) {}

  private apiUrl = 'http://localhost:3056/v1/api';

  isVisible: any = true;

  handleOk(): void {
    this.isVisible = false;
    const accessToken = this.cookieService.get('token');

    console.log(accessToken);

    // Add headers to the request
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key':
        'de940ac5e7f01350b62ade467f356e3bfb1461304e227ca7084a77ce7859233e83643644860dbb64edbed99f936d79f1a8d82cf6513aaa90fbfd27b61195ab7a', // Replace with your token
      'x-client-id': '657d3e90d1ac32569255dd26',
      authorization: `${accessToken}`,
    });

    // Use HTTP DELETE request to delete the book
    this.http
      .post<any>(
        `${this.apiUrl}/book/updateBook`,
        {
          // id: this.idDetail,
          // name_book: this.nameDetail,
          // number_of_remaining: Number(this.SoluongDetail),
          // type: this.typeDetail,
        },
        { headers: headers }
      )
      .subscribe(
        (response) => {
          // Handle the response if needed
        },
        (error) => {
          // Handle error if needed
          console.error('Error deleting book', error);
        }
      );
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  ngOnInit() {}
}
