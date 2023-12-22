import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BorrowBooksService {
  // Adjusted class name to follow Angular conventions
  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private message: NzMessageService,
    private router: Router
  ) {}

  private apiUrl = 'http://localhost:3056/v1/api';

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

  reduceTheNumberOf(id: any): void {
    this.http
      .post<any>(
        `${this.apiUrl}/book/updateBookQuantity`,
        {
          id,
          quantity: 1,
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
