import { Injectable } from '@angular/core';
import { Observable, forkJoin, from, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Remove this line, as it's not needed in a service
import { InitializeAppService } from '../../../core/services/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  public apiUrl = '';

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private message: NzMessageService,
    private router: Router,
    private initializeAppService: InitializeAppService,
  ) {
    // Assuming this code is part of a component
    this.apiUrl = this.initializeAppService.getApiUrl();
  }

  Arrays: any;
  types: any;
  books: any;
  searchedBooks: any;
  newArray: any;
  dataTypes: any;
  datas: any;

  create(createValue: any): Observable<boolean> {
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
          this.router.navigate(['admin/listbooks']);
          // Process or log the data here
        }),
      );
  }

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
      );
    } else {
      // Handle cancel or do nothing
      return throwError('Deletion canceled');
    }
  }

  update(id: any, type: any, name_book: any, soluong: any): Observable<any> {
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
        }),
      );
  }

  getData(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/book/getAll/${page}`).pipe(
      tap((data) => {
        // You can perform any side effects here
      }),
      catchError((error) => {
        console.error('Error fetching book data:', error);
        return throwError(error);
      }),
    );
  }

  getTypeData(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/typeBook/getAll/${page}`).pipe(
      tap((data) => {
        // You can perform any side effects here
      }),
      catchError((error) => {
        console.error('Error fetching type data:', error);
        return throwError(error);
      }),
    );
  }

  loadData(): Observable<any[]> {
    return forkJoin([this.getData(1), this.getTypeData(1)]).pipe(
      map(([data, typeData]) => {
        this.datas = data.metadata;
        this.dataTypes = typeData.metadata;

        this.newArray = this.datas.map((item1: any) => {
          const correspondingItem2 = this.dataTypes.find(
            (item2: any) => item1.type === item2._id,
          );

          if (correspondingItem2) {
            return {
              ...item1,
              type_Book: correspondingItem2.type_Book,
            };
          }

          return item1;
        });

        return this.newArray;
      }),
      catchError((error) => {
        console.error('Error fetching data:', error);
        return throwError(error);
      }),
    );
  }
  getDataValueType(page: any): Observable<any[]> {
    return new Observable((observer) => {
      forkJoin([this.getData(page !== '' ? page : 1), this.getTypeData(1)])
        .pipe(
          map(([bookData, typeData]) => {
            this.books = bookData.metadata;
            this.types = typeData.metadata;

            this.Arrays = this.books.map((book: any) => {
              const correspondingType = this.types.find(
                (type: any) => book.type === type._id,
              );

              if (correspondingType) {
                return {
                  ...book,
                  type_Book: correspondingType.type_Book,
                };
              }

              console.log({ book: this.Arrays });

              return book;
            });

            // Emit the result using next() method
            observer.next(this.Arrays);
            observer.complete();
          }),
          catchError((error) => {
            console.error('Error fetching data:', error);
            // Emit the error using error() method
            observer.error(error);
            return throwError(error);
          }),
        )
        .subscribe();
    });
  }

  removeAccents(str: any): any {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  search(name_text: string, type_text: string): Observable<any[]> {
    return this.getDataValueType(1).pipe(
      switchMap((data) => {
        const searchWithoutAccents = this.removeAccents(
          name_text.toLowerCase(),
        );

        const results = data.filter(
          (book) =>
            this.removeAccents(book.name_book.toLowerCase()).includes(
              searchWithoutAccents,
            ) && book.type === type_text,
        );

        console.log({ results });

        return from([results]);
      }),
      catchError((error) => {
        console.error('Error searching:', error);
        // You may want to throw the error here or handle it appropriately
        return throwError(error);
      }),
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
