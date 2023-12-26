import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinService {
  private isLoadingSubject = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoadingSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  setIsLoad(state: boolean) {
    this.isLoadingSubject.next(state);
  }
}
