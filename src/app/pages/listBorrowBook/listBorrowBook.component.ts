import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listBorrowBook',
  templateUrl: './listBorrowBook.component.html',
  styleUrls: ['./listBorrowBook.component.css'],
  standalone: true,
  imports: [ListBorrowBookComponent, CommonModule, FormsModule],
})
export class ListBorrowBookComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private message: NzMessageService
  ) {}

  private apiUrl = 'http://localhost:3056/v1/api';
  datas: any[] = [];

  name_search: any;
  type_search: any;
  nameUser_search: any;

  //lấy dữ liệu mguwoif mượn
  getData(page: Number): Observable<any> {
    const accessToken = this.cookieService.get('token');

    console.log(accessToken);
    // Thêm header vào yêu cầu
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key':
        'de940ac5e7f01350b62ade467f356e3bfb1461304e227ca7084a77ce7859233e83643644860dbb64edbed99f936d79f1a8d82cf6513aaa90fbfd27b61195ab7a', // Thay thế bằng token của bạn
      'x-client-id': '657d3e90d1ac32569255dd26',
      authorization: `${accessToken}`,
    });

    return this.http
      .get<any>(`${this.apiUrl}/borrowBook/getAll/${page}`, {
        headers: headers,
      })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.handleError('getData', []))
      );
  }

  hanldeMuon(id: any, bookId: any): void {
    const accessToken = this.cookieService.get('token');

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
        `${this.apiUrl}/borrowBook/updateTraSach`,
        {
          id,
        },
        { headers: headers }
      )
      .subscribe(
        (response) => {
          this.getData(1).subscribe((data: any) => {
            this.datas = data.metadata;
          });

          this.message.create('success', 'Cập nhật thành công!!!', {
            nzDuration: 3000,
          });

          this.reduceTheNumberOf(bookId);
          // Handle the response if needed
        },
        (error) => {
          // Handle error if needed
          console.error('Error deleting book', error);
        }
      );
  }

  //xử lý tìm kiếm theo tên
  hanldeSearchNameBook(): any {
    console.log(this.name_search == '');
    if (this.name_search !== '') {
      const accessToken = this.cookieService.get('token');
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
        .get<any>(
          `${this.apiUrl}/borrowBook/searchNameBook/${this.name_search}`,
          {
            headers: headers,
          }
        )
        .subscribe(
          (response) => {
            // Handle the response if needed
            this.datas = response.metadata;
          },
          (error) => {
            // Handle error if needed
            console.error('Error deleting book', error);
          }
        );
    } else {
      this.getData(1).subscribe((data: any) => {
        this.datas = data.metadata;
      });
    }
  }

  //xử lý trừ số lượng khi trả sách số lượng cộng lên

  reduceTheNumberOf(id: any): void {
    const accessToken = this.cookieService.get('token');

    console.log(id);

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
        `${this.apiUrl}/book/updateBookQuantity`,
        {
          id,
          quantity: -1,
        },
        { headers: headers }
      )
      .subscribe(
        (response) => {
          this.getData(1).subscribe((data: any) => {
            this.datas = data.metadata;
          });
        },
        (error) => {
          // Handle error if needed
          console.error('Error deleting book', error);
        }
      );
  }

  //xử lý tìm kiếm theo tên người mượn
  hanldeSearchNameUser(): any {
    if (this.nameUser_search !== '') {
      const accessToken = this.cookieService.get('token');
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
        .get<any>(
          `${this.apiUrl}/borrowBook/searchNameUser/${this.nameUser_search}`,
          {
            headers: headers,
          }
        )
        .subscribe(
          (response) => {
            // Handle the response if needed
            this.datas = response.metadata;
          },
          (error) => {
            // Handle error if needed
            console.error('Error deleting book', error);
          }
        );
    } else {
      this.getData(1).subscribe((data: any) => {
        this.datas = data.metadata;
      });
    }
  }

  //xử lý tìm kiếm theo kiểu sách
  hanldeSearchTypeBook(): any {
    console.log('abcbcb');
    if (this.type_search !== '') {
      const accessToken = this.cookieService.get('token');
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
        .get<any>(
          `${this.apiUrl}/borrowBook/searchTypeBook/${this.type_search}`,
          {
            headers: headers,
          }
        )
        .subscribe(
          (response) => {
            // Handle the response if needed
            this.datas = response.metadata;
          },
          (error) => {
            // Handle error if needed
            console.error('Error deleting book', error);
          }
        );
    } else {
      this.getData(1).subscribe((data: any) => {
        this.datas = data.metadata;
      });
    }
  }

  ngOnInit() {
    this.getData(1).subscribe((data: any) => {
      this.datas = data.metadata;
      console.log(data.metadata);
    });
  }

  // Xử lý lỗi
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
