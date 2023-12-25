import { Injectable, Renderer2 } from '@angular/core';
import { Observable, forkJoin, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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
    return this.http.get<any>(`${this.apiUrl}/typeBook/getAll/${page}`);
  }

  //lấy dữ liệu sách
  getDataBooks(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/book/getAll/${page}`);
  }

  //check dữ liệu nếu có type hay để xóa
  getDataValueType(page: any): Observable<any[]> {
    return new Observable((observer) => {
      forkJoin([this.getData(page !== '' ? page : 1), this.getDataBooks(1)])
        .pipe(
          map(([typeData, data]) => {
            this.datas = typeData.metadata;
            this.apiBooks = data.metadata;

            // Add a new property "TrangThai" based on the condition
            this.datas = this.datas.map((item1) => {
              const correspondingItem2 = this.apiBooks.find((item2) => {
                return item1._id == item2.type;
              });

              return {
                ...item1,
                TrangThai: correspondingItem2 ? 'Không được xóa' : 'Được xóa',
              };
            });

            return this.datas;
          }),
          catchError((error) => {
            console.error('Error fetching data:', error);
            return throwError(error);
          })
        )
        .subscribe(
          (result) => {
            observer.next(result);
            observer.complete();
          },
          (error) => {
            observer.error(error);
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
