import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, shareReplay, finalize, retryWhen, mergeMap, take, catchError } from 'rxjs/operators';
import { HttpClientService } from './http-client.serivce';
@Injectable({
    providedIn: 'root'
  })
export class ProductService {
  private apiUrl: string = 'http://localhost:3056/v1/api';
  constructor(
    private httpClient: HttpClientService
  ) {

  }
  public getApiUrl(): string {
    return this.apiUrl;
  }
  
  public getDetailProduct(productId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/product/getDetail/${productId}`).pipe(
      tap((response) => console.log('Product Detail Loaded:', response.metadata)),
      catchError((error) => {
        console.error('Error fetching product details:', error);
        return throwError(() => new Error('Failed to load product details'));
      })
    );
  }
    
}