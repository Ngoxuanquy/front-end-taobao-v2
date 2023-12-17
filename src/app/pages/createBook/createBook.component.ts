import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createBook',
  templateUrl: './createBook.component.html',
  styleUrls: ['./createBook.component.css'],
  standalone: true,
  imports: [CreateBookComponent, ReactiveFormsModule],
})
export class CreateBookComponent implements OnInit {
  constructor(
    private http: HttpClient, // Injecting the HttpClient service,
    private cookieService: CookieService,
    private message: NzMessageService,
    private router: Router
  ) {}

  private apiUrl = 'http://localhost:3056/v1/api';

  login_value: any = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    quantity: new FormControl(''),
  });

  ngOnInit() {
    console.log(this.login_value.value.email);
  }

  // Xử lý lỗi
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  postBook(): any {
    const accessToken = this.cookieService.get('token');

    console.log({ accessToken });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key':
        'de940ac5e7f01350b62ade467f356e3bfb1461304e227ca7084a77ce7859233e83643644860dbb64edbed99f936d79f1a8d82cf6513aaa90fbfd27b61195ab7a', // Thay thế bằng token của bạn
      'x-client-id': '657d3e90d1ac32569255dd26',
      authorization: `${accessToken}`,
    });

    return this.http
      .post<any>(
        `${this.apiUrl}/book/createBook`,
        {
          name_book: this.login_value.value.name,
          number_of_remaining: Number(this.login_value.value.quantity),
          original_number: Number(this.login_value.value.quantity),
          type: this.login_value.value.type,
        },
        { headers: headers }
      )
      .pipe(
        tap((data) => {
          this.message.create('success', 'Tạo thành công!!!', {
            nzDuration: 5000,
          });
          this.router.navigate(['/listbooks']);
          // Process or log the data here
        }),
        catchError(this.handleError('login', []))
      );
  }

  CreateBook(): any {
    this.postBook().subscribe((response: any) => {
      console.log(response);
    });
  }
}
