import { Injectable } from '@angular/core';
import { Observable, forkJoin, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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
    private initializeAppService: InitializeAppService
  ) {
    // Assuming this code is part of a component
    this.initializeAppService.initializeApp().subscribe(() => {
      this.apiUrl = this.initializeAppService.getApiUrl();
      console.log(this.apiUrl);
    });
  }

  Arrays: any;
  types: any;
  books: any;
  searchedBooks: any;
  newArray: any;
  dataTypes: any;
  datas: any;

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
          this.router.navigate(['admin/listbooks']);
          // Process or log the data here
        }),
        catchError(this.handleError('create', false))
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
        catchError(this.handleError('deleteBook', false))
      );
    } else {
      // Handle cancel or do nothing
      return throwError('Deletion canceled');
    }
  }

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

  getData(page: number): Promise<any> {
    return this.http
      .get<any>(`${this.apiUrl}/book/getAll/${page}`)
      .pipe(
        tap((data) => {
          console.log({ data });
          // You might want to return data here if needed
        }),
        catchError((error) => {
          console.error('Error fetching book data:', error);
          throw error;
        })
      )
      .toPromise();
  }

  getTypeData(page: number): Promise<any> {
    return this.http
      .get<any>(`${this.apiUrl}/typeBook/getAll/${page}`)
      .pipe(
        tap((data) => {
          // You might want to return data here if needed
        }),
        catchError((error) => {
          console.error('Error fetching type data:', error);
          throw error;
        })
      )
      .toPromise();
  }

  loadData() {
    return Promise.all([this.getData(1), this.getTypeData(1)])
      .then(([data, typeData]) => {
        this.datas = data.metadata;
        this.dataTypes = typeData.metadata;

        this.newArray = this.datas.map((item1: any) => {
          const correspondingItem2 = this.dataTypes.find(
            (item2: any) => item1.type === item2._id
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
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        throw error; // rethrow the error to propagate it to the caller
      });
  }
  getDataValueType(page: any): Promise<any> {
    return new Promise((resolve, reject) => {
      Promise.all([this.getData(page !== '' ? page : 1), this.getTypeData(1)])
        .then(([bookData, typeData]) => {
          this.books = bookData.metadata;
          this.types = typeData.metadata;

          this.Arrays = this.books.map((book: any) => {
            const correspondingType = this.types.find(
              (type: any) => book.type === type._id
            );

            if (correspondingType) {
              return {
                ...book,
                type_Book: correspondingType.type_Book,
              };
            }

            return book;
          });

          // Resolve the Promise with the data you want to retrieve
          resolve(this.Arrays);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          // Reject the Promise if there's an error
          reject(error);
        });
    });
  }

  removeAccents(str: any): any {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  async search(name_text: string, type_text: string): Promise<any[]> {
    try {
      await this.getDataValueType(1);

      console.log(this.Arrays);
      const searchWithoutAccents = this.removeAccents(name_text.toLowerCase());

      const results = this.Arrays.filter(
        (book: any) =>
          this.removeAccents(book.name_book.toLowerCase()).includes(
            searchWithoutAccents
          ) && book.type === type_text
      );

      this.searchedBooks = [...results];
      console.log(this.searchedBooks);

      return this.searchedBooks;
    } catch (error) {
      console.error('Error searching:', error);
      // You may want to throw the error here or handle it appropriately
      throw error;
    }
  }

  private handleError(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return throwError(result);
    };
  }
}
