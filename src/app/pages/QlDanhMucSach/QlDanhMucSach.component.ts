import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-QlDanhMucSach',
  templateUrl: './QlDanhMucSach.component.html',
  styleUrls: ['./QlDanhMucSach.component.css'],
  standalone: true,
  imports: [QlDanhMucSachComponent, CommonModule, NzModalModule, FormsModule],
})
export class QlDanhMucSachComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private message: NzMessageService,
    private renderer: Renderer2
  ) {}
  private apiUrl = 'http://localhost:3056/v1/api';
  datas: any[] = [];
  apiBooks: any[] = [];

  name_type: String = '';
  isVisible = false;

  //lấy dữ liệu sách
  getDataBooks(page: Number): Observable<any> {
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
      .get<any>(`${this.apiUrl}/book/getAll/${page}`, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.handleError('getData', []))
      );
  }

  //Hàm tạo kiểu sách
  handleOk(): void {
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
        `${this.apiUrl}/typeBook/createTypeBook`,
        {
          name_type: this.name_type,
        },
        { headers: headers }
      )
      .subscribe(
        (response) => {
          this.getDataValueType(1);

          this.isVisible = false;

          this.message.create('success', 'Thêm thành công!!!', {
            nzDuration: 3000,
          });
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

  //mở modal
  ModalThem(): void {
    this.isVisible = true;
  }
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

  //check dữ liệu nếu có type hay để xóa
  getDataValueType(page: any): void {
    forkJoin([
      this.getData(page !== '' ? page : 1),
      this.getDataBooks(1),
    ]).subscribe(
      ([typeData, data]) => {
        this.datas = typeData.metadata;
        this.apiBooks = data.metadata;

        console.log(this.datas);

        // nếu có thì thêm 1 trường tên là TRạng thái nếu có thì là Không được xóa và ngược lại
        this.datas = this.datas.map((item1) => {
          const correspondingItem2 = this.apiBooks.find((item2) => {
            console.log(item1._id == item2.type);
            return item1._id == item2.type;
          });

          if (correspondingItem2) {
            return {
              ...item1,
              TrangThai: 'Không được xóa',
            };
          } else {
            return {
              ...item1,
              TrangThai: 'Được xóa',
            };
          }
        });

        console.log(this.datas);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  //XỬ lý xóa đầu sách
  handleDelete(id: number): void {
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
      .delete<any>(`${this.apiUrl}/typeBook/deleteTypeBook/${id}`, {
        headers: headers,
      })
      .subscribe(
        (response) => {
          const elementToRemove = document.getElementById(`book-row-${id}`);

          if (elementToRemove) {
            // Sử dụng Renderer2 để xóa element khỏi DOM
            this.renderer.removeChild(
              elementToRemove.parentNode,
              elementToRemove
            );
          }

          this.isVisible = false;

          this.message.create('success', 'Xoá thành công!!!', {
            nzDuration: 3000,
          });
          // Handle the response if needed
        },
        (error) => {
          // Handle error if needed
          console.error('Error deleting book', error);
        }
      );
  }

  ngOnInit() {
    this.getData(1).subscribe((data: any) => {
      this.datas = data.metadata;
    });

    this.getDataValueType(1);
  }

  // Xử lý lỗi
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
