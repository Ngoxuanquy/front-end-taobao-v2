// app-config.service.ts
import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom, tap } from 'rxjs';

export function InitializeApp(http: HttpClient) {
  return firstValueFrom(
    http.get('/assets/config.json').pipe(
      tap((ApiUrl) => {
        console.log({ ApiUrl });
        return ApiUrl;
      })
    )
  );
}
