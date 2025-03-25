import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl: string = '';

  constructor(private http: HttpClient) {
  }

  public getApiUrl(): string {
    return this.apiUrl;
  }

  public getAllProduct(): Observable<any> {
    return this.http.get(`http://localhost:3056/v1/api/product/getAll`).pipe(
      tap((data: any) => {
        return data.metadata;
      }),
      catchError((error) => {
        console.error('Error loading app configuration', error);
        throw error; // Rethrow the error to let the app fail gracefully
      })
    );
  }


}
