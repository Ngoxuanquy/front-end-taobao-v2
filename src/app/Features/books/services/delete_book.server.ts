import { Injectable, Renderer2 } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DeleteBookService {
  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private message: NzMessageService,
    private router: Router
  ) {}

  private apiUrl = 'http://localhost:3056/v1/api';

  deleteBook(id: number): Observable<boolean> {
    const confirmation = confirm('Bạn có xác nhận xóa không?');
    if (confirmation === true) {
      return this.http.delete<any>(`${this.apiUrl}/book/deleteBook/${id}`).pipe(
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
