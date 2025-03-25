import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterModule, Routes } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NavigationExtras, Router } from '@angular/router';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import {
  trigger,
  transition,
  animate,
  style,
  query,
  stagger,
} from '@angular/animations';
@Component({
  selector: 'app-layout_container',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    RouterModule,
    NzPopoverModule,
  ],
  templateUrl: './layout_container.component.html',
  styleUrls: ['./layout_container.component.css'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('.hero', [
          style({ opacity: 0, transform: 'translateY(-100px)' }),
          stagger(30, [
            animate(
              '500ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 1, transform: 'none' })
            ),
          ]),
        ]),
      ]),
    ]),
    trigger('filterAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(
          ':enter',
          [
            style({ opacity: 0, width: 0 }),
            stagger(50, [
              animate('300ms ease-out', style({ opacity: 1, width: '*' })),
            ]),
          ],
          { optional: true }
        ),
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, width: 0 })),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class Layout_containerComponent implements OnInit {
  constructor(private cookieService: CookieService, public router: Router) {}

  name: String = '';
  contentTemplate: any = 'Đăng xuất';
  ngOnInit() {
    this.name = this.cookieService.get('name');
  }

  isCollapsed = false;

  handlePopoverVisibility(isVisible: any): void {
    // if (isVisible) {
    //   // Popover is opened
    //   console.log('Popover opened');
    //   // Add your logic for when the popover is opened
    // } else {
    //   // Popover is closed
    //   console.log('Popover closed');
    //   // Add your logic for when the popover is closed
    // }
  }

  handleContentClick(): void {
    // Handle click inside the contentTemplate
    this.cookieService.delete('token');
    this.cookieService.delete('name');

    // localStorage.clear();
    sessionStorage.clear();

    this.router.navigate(['/auth/login']);
  }
}
