import {
  ApplicationConfig,
  importProvidersFrom,
  APP_INITIALIZER,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideNzIcons } from './icons-provider';
import { vi_VN, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { HeaderInterceptor } from './core/pipes/header-Http-Token/header-Http-Token.component';
import { Observable, firstValueFrom, tap } from 'rxjs';
import { InitializeAppService } from './core/services/app-config.service';
registerLocaleData(vi);

// export function initializeApp(http: HttpClient) {
//   return (): Promise<any> =>
//     firstValueFrom(
//       http.get('./assets/config.json').pipe(
//         tap((ApiUrl) => {
//           console.log({ ApiUrl });
//         })
//       )
//     );

// }

export function initializeApp(initializeAppService: InitializeAppService) {
  return (): Observable<any> => {
    return initializeAppService.initializeApp();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideNzIcons(),
    provideNzI18n(vi_VN),
    importProvidersFrom(FormsModule),
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    provideHttpClient(withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      // deps: [HttpClient],
      deps: [InitializeAppService],
    },
  ],
};
