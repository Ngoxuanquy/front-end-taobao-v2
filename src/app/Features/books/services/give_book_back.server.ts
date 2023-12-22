// import { Injectable } from '@angular/core';
// import { Observable, throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
// import { CookieService } from 'ngx-cookie-service';
// import { NzMessageService } from 'ng-zorro-antd/message';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root',
// })
// export class GiveBookBackService {
//   private apiUrl = 'http://localhost:3056/v1/api';

//   constructor(
//     private cookieService: CookieService,
//     private http: HttpClient,
//     private message: NzMessageService,
//     private router: Router
//   ) {}

//   reduceTheNumberOf(id: any): Observable<any> {
//     return this.http
//       .post<any>(`${this.apiUrl}/book/updateBookQuantity`, {
//         id,
//         quantity: -1,
//       })
//       .pipe(
//         tap((response) => {
//           // this.getData(1).subscribe((data: any) => {
//             this.datas = data.metadata;
//           });
//         }),
//         catchError(this.handleError('reduceTheNumberOf'))
//       );
//   }

//   deleteBook(id: number): Observable<boolean> {
//     return this.http
//       .post<any>(`${this.apiUrl}/borrowBook/updateTraSach`, { id })
//       .pipe(
//         tap((response) => {

//           this.message.create('success', 'Cập nhật thành công!!!', {
//             nzDuration: 3000,
//           });

//           // Assuming bookId is defined somewhere
//           this.reduceTheNumberOf(bookId).subscribe(() => {
//             // Do something after reducing the number
//           });
//         }),
//         catchError(this.handleError('deleteBook', false))
//       );
//   }

//   private handleError(operation = 'operation', result?: any) {
//     return (error: any): Observable<any> => {
//       console.error(`${operation} failed: ${error.message}`);
//       return throwError(result);
//     };
//   }
// }
