import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
@Component({
  selector: 'app-createBook',
  templateUrl: './createBook.component.html',
  styleUrls: ['./createBook.component.css'],
  standalone: true,
  imports: [
    CreateBookComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NzSelectModule,
  ],
})
export class CreateBookComponent implements OnInit {
  constructor(
    private http: HttpClient, // Injecting the HttpClient service,
    private cookieService: CookieService,
    private message: NzMessageService,
    private router: Router
  ) {}

  private apiUrl = 'http://localhost:3056/v1/api';
  datas: any[] = [];
  selectedValue: any;

  // lấy kiểu (đầu sách)
  onSelectChange(value: any): void {
    this.selectedValue = value;
    console.log('Selected value:', this.selectedValue);
  }

  //dữ liệu khi tạo thêm sách lấy từ form
  create_value: any = new FormGroup({
    name: new FormControl(''),
    selectedValue: new FormControl(''),
    quantity: new FormControl(''),
  });

  ngOnInit() {
    this.getData(1).subscribe((data: any) => {
      this.datas = data.metadata;
      console.log({ data });
      console.log('test data');
    });
  }

  // Xử lý lỗi
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  //lấy kiểu để select (kiểu sách)
  getData(page: Number): Observable<any> {
    const accessToken = this.cookieService.get('token');

    // Thêm header vào yêu cầu
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key':
        'de940ac5e7f01350b62ade467f356e3bfb1461304e227ca7084a77ce7859233e83643644860dbb64edbed99f936d79f1a8d82cf6513aaa90fbfd27b61195ab7a', // Thay thế bằng token của bạn
      'x-client-id': '657d3e90d1ac32569255dd26',
      authorization: `${accessToken}`,
    });

    return this.http
      .get<any>(`${this.apiUrl}/typeBook/getAll/${page}`, {
        headers: headers,
      })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.handleError('getData', []))
      );
  }

  // hàm create sách
  postBook(): any {
    const accessToken = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key':
        'de940ac5e7f01350b62ade467f356e3bfb1461304e227ca7084a77ce7859233e83643644860dbb64edbed99f936d79f1a8d82cf6513aaa90fbfd27b61195ab7a', // Thay thế bằng token của bạn
      'x-client-id': '657d3e90d1ac32569255dd26',
      authorization: `${accessToken}`,
    });

    return this.http
      .post<any>(
        `${this.apiUrl}/book/createBook`,
        {
          name_book: this.create_value.value.name,
          number_of_remaining: Number(this.create_value.value.quantity),
          original_number: Number(this.create_value.value.quantity),
          type: this.create_value.value.selectedValue,
        },
        { headers: headers }
      )
      .pipe(
        tap((data) => {
          this.message.create('success', 'Tạo thành công!!!', {
            nzDuration: 5000,
          });
          this.router.navigate(['/listbooks']);
          // Process or log the data here
        }),
        catchError(this.handleError('login', []))
      );
  }

  // xử lý nút Gửi request dùng subscribe để chạy hàm postBook
  CreateBook(): any {
    if (
      this.create_value.value.name != '' &&
      this.create_value.value.quantity != null &&
      this.create_value.value.selectedValue
    ) {
      this.postBook().subscribe((response: any) => {
        console.log(response);
      });
    } else {
      alert('Vui lòng nhập đủ thông tin');
    }
  }
}
