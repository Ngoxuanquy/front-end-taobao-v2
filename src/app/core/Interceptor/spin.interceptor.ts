import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinService } from '../services/spin.service';

@Injectable({
  providedIn: 'root',
})
export class RepeatRequestInterceptor implements HttpInterceptor {
  constructor(private spinService: SpinService) {}

  number = 0;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    this.number++;

    return next.handle(request).pipe(
      finalize(() => {
        this.number--;
        console.log('còn');
        this.spinService.setIsLoad(true);

        if (this.number === 0) {
          console.log('hết');
          this.spinService.setIsLoad(false);
        }
      }),
    );
  }
}
