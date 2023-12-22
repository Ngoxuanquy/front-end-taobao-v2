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
import { DeleteTypeBookService } from '../../Features/books/services/delete_type_book.server';

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
    private renderer: Renderer2,
    private deleteTypeBookService: DeleteTypeBookService
  ) {}
  private apiUrl = 'http://localhost:3056/v1/api';
  datas: any[] = [];
  apiBooks: any[] = [];

  name_type: String = '';
  isVisible = false;

  //lấy dữ liệu sách
  getDataBooks(page: Number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/book/getAll/${page}`).pipe(
      tap((data) => {
        return data;
      }),
      catchError(this.handleError('getData', []))
    );
  }

  //Hàm tạo kiểu sách
  handleOk(): void {
    // Use HTTP DELETE request to delete the book
    this.http
      .post<any>(`${this.apiUrl}/typeBook/createTypeBook`, {
        name_type: this.name_type,
      })
      .subscribe(
        (response) => {
          this.getDataValueType(1);

          this.isVisible = false;
          this.name_type = '';
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
    return this.http.get<any>(`${this.apiUrl}/typeBook/getAll/${page}`).pipe(
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
    // Use HTTP DELETE request to delete the book

    this.deleteTypeBookService.deleteBook(id).subscribe(
      (success) => {
        // Handle success if needed
        const elementToRemove = document.getElementById(`book-row-${id}`);

        if (elementToRemove) {
          // Sử dụng Renderer2 để xóa element khỏi DOM
          this.renderer.removeChild(
            elementToRemove.parentNode,
            elementToRemove
          );
        }
      },
      (error) => {
        // Handle error if needed
        console.error('Error delete book', error);
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
