import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpHeaders for setting headers

@Injectable({
  providedIn: 'root',
})
export class UpdateBookService {
  private apiUrl = 'http://localhost:3056/v1/api';
  // Initialize isLoading

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private message: NzMessageService,
    private router: Router
  ) {}

  update(id: any, type: any, name_book: any, soluong: any): Observable<any> {
    console.log({ id });
    const requestBody = {
      id: id,
      name_book: name_book,
      original_number: Number(soluong),
      type: type,
    };

    return this.http
      .post<any>(`${this.apiUrl}/book/updateBook`, requestBody)
      .pipe(
        tap((response) => {
          this.message.create('success', 'Cập nhật thành công!!!', {
            nzDuration: 3000,
          });
          // Handle the response if needed
        })
      );
  }

  // Add methods like getDataValueType if they are part of your service
}
