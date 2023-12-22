import { Injectable, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchBookService {
  private apiUrl = 'http://localhost:3056/v1/api';

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private message: NzMessageService,
    private router: Router
  ) {}

  books: any[] = [];
  types: any[] = [];
  searchedBooks: any[] = [];
  Arrays: any[] = [];

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

  async getDataValueType(page: any): Promise<void> {
    try {
      const [bookData, typeData] = await Promise.all([
        this.getData(page !== '' ? page : 1),
        this.getTypeData(1),
      ]);

      this.books = bookData.metadata;
      console.log(bookData.metadata);
      this.types = typeData.metadata;

      this.Arrays = this.books.map((book) => {
        const correspondingType = this.types.find(
          (type) => book.type === type._id
        );

        if (correspondingType) {
          return {
            ...book,
            type_Book: correspondingType.type_Book,
          };
        }

        return book;
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
        (book) =>
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
}
