import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { InitializeAppService } from '../../../core/services/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class BorrowBooksService {
  private apiUrl = '';
  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private message: NzMessageService,
    private router: Router,
    private initializeAppService: InitializeAppService
  ) {
    this.initializeAppService.initializeApp().subscribe(() => {
      this.apiUrl = this.initializeAppService.getApiUrl();
      console.log(this.apiUrl);
    });
  }

  datas: any;

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
        this.datas = data;
        return data;
      }),
      catchError(this.handleError('getData', []))
    );
  }

  //hàm xóa dấu
  removeAccents(str: any): any {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  //tìm kiếm
  search(searchs: any): Observable<any> {
    if (
      searchs.value.name_search !== '' &&
      searchs.value.name_user !== '' &&
      searchs.value.selectedValue !== ''
    ) {
      // Xóa dấu của tên sản phẩm
      const searchWithoutAccents = this.removeAccents(
        searchs.value.name_search.toLowerCase()
      );

      // Xóa dấu của tên người mượns
      const searchName = this.removeAccents(
        searchs.value.name_user.toLowerCase()
      );
      console.log({ datasearch: this.datas });
      // xử lý tìm kiếm gần đúng và đã xóa dấu
      const results = this.datas.metadata.filter(
        (book: any) =>
          this.removeAccents(book.name_book.toLowerCase()).includes(
            searchWithoutAccents
          ) &&
          book.type === searchs.value.selectedValue &&
          this.removeAccents(book.use_name.toLowerCase()).includes(searchName)
      );

      // trả về mảng mới
      return of([...results]);
    } else {
      // Handle the case when not all information is provided
      this.message.create('warning', 'Vui lòng nhập đủ thông tin!!!', {
        nzDuration: 3000,
      });
      return of([]);
    }
  }

  borrowBooks(payload: any): Observable<any> {
    // Removed unused parameter

    return this.http
      .post<any>(`${this.apiUrl}/borrowBook/createBorrowBook`, {
        bookId: payload.bookId,
        name_book: payload.name_book,
        phone_number: Number(payload.phone_number),
        type: payload.type,
        use_name: payload.use_name,
        paymentDate: payload.paymentDate,
      })
      .pipe(
        tap((response) => {
          // Handle the response if needed
          // window.location.reload();
          console.log('Successfully borrowed books', response);
        }),
        catchError(this.handleError('borrowBooks'))
      );
  }

  giveBookBack(id: any, bookId: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/borrowBook/updateTraSach`, {
        id, // Use bookId instead of id
      })
      .pipe(
        tap(
          (response) => {
            this.message.create('success', 'Cập nhật thành công!!!', {
              nzDuration: 3000,
            });

            this.reduceTheNumberOf(bookId, -1);
          },
          (error) => {
            console.error('Error updating book', error);
          }
        )
      );
  }

  reduceTheNumberOf(id: any, quantity: Number): void {
    this.http
      .post<any>(
        `${this.apiUrl}/book/updateBookQuantity`,
        {
          id,
          quantity: quantity,
        }
        // { headers: headers }
      )
      .subscribe(
        (response) => {},
        (error) => {
          // Handle error if needed
          console.error('Error deleting book', error);
        }
      );
  }

  private handleError(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      console.error(`Error in ${operation}:`, error);
      // Let the app keep running by returning an empty result.
      return throwError(result);
    };
  }
}
