import { Injectable, Renderer2 } from '@angular/core';
import { Observable, forkJoin, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { InitializeAppService } from '../../../core/services/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class TypeBookService {
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
    });
  }

  datas: any[] = [];
  apiBooks: any[] = [];

  name_type: String = '';
  isVisible = false;

  //lấy dữ liệu mguwoif mượn
  getData(page: Number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/typeBook/getAll/${page}`).pipe(
      tap((data) => {
        return data;
      }),
      catchError(this.handleError('getData', []))
    );
  }

  //lấy dữ liệu sách
  getDataBooks(page: Number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/book/getAll/${page}`).pipe(
      tap((data) => {
        return data;
      }),
      catchError(this.handleError('getData', []))
    );
  }

  //check dữ liệu nếu có type hay để xóa
  getDataValueType(page: any): any {
    return new Observable((observer) => {
      forkJoin([
        this.getData(page !== '' ? page : 1),
        this.getDataBooks(1),
      ]).subscribe(
        ([typeData, data]) => {
          this.datas = typeData.metadata;
          this.apiBooks = data.metadata;

          // nếu có thì thêm 1 trường tên là TRạng thái nếu có thì là Không được xóa và ngược lại
          this.datas = this.datas.map((item1) => {
            const correspondingItem2 = this.apiBooks.find((item2) => {
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
          observer.next(this.datas);
          observer.complete();
          console.log(this.datas);
          return this.datas;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    });
  }
  create(name_type: any): Observable<boolean> {
    return this.http
      .post<any>(`${this.apiUrl}/typeBook/createTypeBook`, {
        name_type: name_type,
      })
      .pipe(
        tap((data) => {
          this.message.create('success', 'Tạo thành công!!!', {
            nzDuration: 5000,
          });
          // Process or log the data here
        }),
        catchError(this.handleError('create', false))
      );
  }

  deleteBook(id: number): Observable<boolean> {
    const confirmation = confirm('Bạn có xác nhận xóa không?');
    if (confirmation === true) {
      return this.http
        .delete<any>(`${this.apiUrl}/typeBook/deleteTypeBook/${id}`)
        .pipe(
          tap(() => {
            // Remove the DOM element after successful deletion

            this.message.create('success', 'Xóa thành công!!!', {
              nzDuration: 3000,
            });
          }),
          catchError(this.handleError('deleteBook', false))
        );
    } else {
      // Handle cancel or do nothing
      return throwError('Deletion canceled');
    }
  }

  private handleError(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      console.error(error);
      return throwError(result);
    };
  }
}
