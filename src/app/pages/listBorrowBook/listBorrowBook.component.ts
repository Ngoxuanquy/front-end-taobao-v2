import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { LoaddingComponent } from '../../components/loadding/loadding.component';

@Component({
  selector: 'app-listBorrowBook',
  templateUrl: './listBorrowBook.component.html',
  styleUrls: ['./listBorrowBook.component.css'],
  standalone: true,
  imports: [
    ListBorrowBookComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzPaginationModule,
    LoaddingComponent,
  ],
})
export class ListBorrowBookComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private message: NzMessageService
  ) {}

  private apiUrl = 'http://localhost:3056/v1/api';
  datas: any[] = [];

  //
  name_search: any;
  type_search: any;
  nameUser_search: any;
  typeBooks: any;
  selectedValue: any;
  newArraySearch: any[] = [];
  isSearch: boolean = true;

  isLoading: boolean = false;
  // xử lý lấy value để sreach/s
  searchs: any = new FormGroup({
    name_search: new FormControl(''),
    name_user: new FormControl(''),
    selectedValue: new FormControl(''),
  });
  //lấy value khi select vào type
  onSelectChange(value: any): void {
    this.selectedValue = value;
    console.log('Selected value:', this.selectedValue);
  }

  //hàm xóa dấu
  removeAccents(str: any): any {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  //tìm kiếm
  handelSearch(): void {
    console.log(this.searchs.value.selectedValue == '');
    if (
      this.searchs.value.name_search != '' &&
      this.searchs.value.name_user != '' &&
      this.searchs.value.selectedValue != ''
    ) {
      this.isSearch = false;

      // Xóa dấu của tên sản phẩm
      const searchWithoutAccents = this.removeAccents(
        this.searchs.value.name_search.toLowerCase()
      );

      // Xóa dấu của tên người mượns
      const searchName = this.removeAccents(
        this.searchs.value.name_user.toLowerCase()
      );

      console.log({ searchWithoutAccents });

      // xử lý tìm kiếm gần đúng và đã xóa dấu
      const results = this.datas.filter(
        (book) =>
          this.removeAccents(book.name_book.toLowerCase()).includes(
            searchWithoutAccents
          ) &&
          book.type === this.searchs.value.selectedValue &&
          this.removeAccents(book.use_name.toLowerCase()).includes(searchName)
      );

      // trả về mảng mới
      this.newArraySearch = [...results];
    } else {
      this.message.create('warning', 'Vui lòng nhập đủ thông tin!!!', {
        nzDuration: 3000,
      });
    }

    console.log(this.newArraySearch);
  }

  handelGetAll(): void {
    this.isSearch = true;
  }
  //lấy type để select
  getDataTypeBook(page: Number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/typeBook/getAll/${page}`).pipe(
      tap((data) => {
        return data;
      }),
      catchError(this.handleError('getData', []))
    );
  }

  //lấy dữ liệu bảng mượn sách
  getData(page: Number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/borrowBook/getAll/${page}`).pipe(
      tap((data) => {
        return data;
      }),
      catchError(this.handleError('getData', []))
    );
  }

  //xứ lý trả sách và tự động tăng laj số lượng lên 1
  hanldeMuon(id: any, bookId: any): void {
    // Use HTTP DELETE request to delete the book
    this.http
      .post<any>(`${this.apiUrl}/borrowBook/updateTraSach`, {
        id,
      })
      .subscribe(
        (response) => {
          this.getData(1).subscribe((data: any) => {
            this.datas = data.metadata;
          });

          this.message.create('success', 'Cập nhật thành công!!!', {
            nzDuration: 3000,
          });

          //tăng sô lượng khi trả sachs
          this.reduceTheNumberOf(bookId);
        },
        (error) => {
          console.error('Error deleting book', error);
        }
      );
  }

  //xử lý trừ số lượng khi trả sách số lượng cộng lên

  reduceTheNumberOf(id: any): void {
    this.http
      .post<any>(`${this.apiUrl}/book/updateBookQuantity`, {
        id,
        quantity: -1,
      })
      .subscribe(
        (response) => {
          this.getData(1).subscribe((data: any) => {
            this.datas = data.metadata;
          });
        },
        (error) => {
          console.error('Error deleting book', error);
        }
      );
  }

  pages: any = 1;
  onPageChange(page: number): void {
    this.isLoading = true;
    this.pages = Number(page);
    this.getData(page).subscribe((data: any) => {
      this.datas = data.metadata;
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.getData(1).subscribe((data: any) => {
      this.datas = data.metadata;
    });

    this.getDataTypeBook(1).subscribe((data: any) => {
      this.typeBooks = data.metadata;
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
