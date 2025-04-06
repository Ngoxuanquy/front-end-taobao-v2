import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClientService } from './http-client.serivce';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl: string = 'http://localhost:3056/v1/api';

  constructor(
    private httpClient: HttpClientService,
  ) {}

  public getApiUrl(): string {
    return this.apiUrl;
  }

  public getAllProducts(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/product/getAll`).pipe(
      tap((response) => console.log('Products Loaded:', response.metadata)),
      catchError((error) => {
        console.error('Error fetching products:', error);
        return throwError(() => new Error('Failed to load products'));
      })
    );
  }
}
