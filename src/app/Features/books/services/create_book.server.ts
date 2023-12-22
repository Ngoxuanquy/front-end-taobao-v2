import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Remove this line, as it's not needed in a service

@Injectable({
  providedIn: 'root',
})
export class CreateBookService {
  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private message: NzMessageService,
    private router: Router
  ) {}

  private apiUrl = 'http://localhost:3056/v1/api';

  create(createValue: any): Observable<boolean> {
    console.log({ createValue });
    return this.http
      .post<any>(`${this.apiUrl}/book/createBook`, {
        name_book: createValue.name,
        number_of_remaining: Number(createValue.quantity),
        original_number: Number(createValue.quantity),
        type: createValue.selectedValue,
      })
      .pipe(
        tap((data) => {
          this.message.create('success', 'Tạo thành công!!!', {
            nzDuration: 5000,
          });
          this.router.navigate(['/listbooks']);
          // Process or log the data here
        }),
        catchError(this.handleError('create', false))
      );
  }

  private handleError(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return throwError(result);
    };
  }
}
