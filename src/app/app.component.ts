import { Component, OnInit, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterModule, Routes } from '@angular/router';
import { Layout_containerComponent } from './core/layout/layout_container/layout_container.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
// import { AuthService } from './core/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import { ChildrenOutletContexts, RouterLink } from '@angular/router';
import { slideInAnimation } from './shared/animations';
import { AuthService } from './auth/services/auth.service';
import { LoaddingComponent } from './components/loadding/loadding.component';
import { BehaviorSubject } from 'rxjs';
import { SpinService } from './core/services/spin.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    RouterModule,
    Layout_containerComponent,
    LoaddingComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation,
    // animation triggers go here
  ],
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  public isLoading: any;

  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private router: Router,
    private contexts: ChildrenOutletContexts,
    private spinService: SpinService,

    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}
  @HostBinding('@.disabled')
  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }

  ngOnInit() {
    // const hasToken = this.cookieService.check('token');

    if (isPlatformBrowser(this.platformId)) {
      const hasToken = sessionStorage.getItem('token') !== null;

      this.authService.setIsLogin(hasToken);
    }
  }
}
