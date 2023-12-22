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
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-create_book',
  templateUrl: './create_book.component.html',
  styleUrls: ['./create_book.component.css'],
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
    private router: Router,
    private booksService: BooksService
  ) {}

  datas: any[] = [];
  selectedValue: any;

  // lấy kiểu (đầu sách)
  onSelectChange(value: any): void {
    this.selectedValue = value;
  }

  //dữ liệu khi tạo thêm sách lấy từ form
  create_value: any = new FormGroup({
    name: new FormControl(''),
    selectedValue: new FormControl(''),
    quantity: new FormControl(''),
  });

  ngOnInit() {
    this.booksService
      .getTypeData(1)
      .then((data) => {
        // Handle successful response data here
        this.datas = data.metadata;

        console.log('Data:', data);
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error:', error);
      });
  }

  // xử lý nút Gửi request dùng subscribe để chạy hàm postBook
  CreateBook(): any {
    this.booksService.create(this.create_value.value).subscribe(
      (success) => {
        // Handle success if needed
        console.log('Book created successfully');
      },
      (error) => {
        // Handle error if needed
        console.error('Error creating book', error);
      }
    );
  }
}
