import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, shareReplay, finalize, retryWhen, mergeMap, take, catchError } from 'rxjs/operators';
import { SpinService } from './spin.service';
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  public cache: any = {};
  private headers = new HttpHeaders({
    'x-api-key': '87eaea1754825b4a90e5207db1bf1b9675d7144f462addac44de9c62f3093180f6c404f6ce4541f50df7ebe35e8f1d01dde1fa1677b4d496f26803e519294000',
    'Content-Type': 'application/json',
  });
  constructor(
    private http: HttpClient,
    private readonly loadingService: SpinService,
  ) { }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url, { headers: this.headers }).pipe(
      tap(res => {
      }),
      catchError((error) => {
        console.error('HTTP GET Error:', error);
        return throwError(() => new Error(`Request failed: ${error.message}`));
      })
    );
  }

  post<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(url, data, { headers: this.headers }).pipe(
      catchError((error) => {
        console.error('HTTP POST Error:', error);
        return throwError(() => new Error(`Request failed: ${error.message}`));
      })
    );
  }
}
