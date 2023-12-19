import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterModule, Routes } from '@angular/router';
import { QlDanhMucSachComponent } from '../../pages/QlDanhMucSach/QlDanhMucSach.component';
import { CookieService } from 'ngx-cookie-service';
import { NavigationExtras, Router } from '@angular/router';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
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
    QlDanhMucSachComponent,
    NzPopoverModule,
  ],
  templateUrl: './layout_container.component.html',
  styleUrls: ['./layout_container.component.css'],
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
    if (isVisible) {
      // Popover is opened
      console.log('Popover opened');
      // Add your logic for when the popover is opened
    } else {
      // Popover is closed
      console.log('Popover closed');
      // Add your logic for when the popover is closed
    }
  }

  handleContentClick(): void {
    // Handle click inside the contentTemplate
    this.cookieService.delete('token');
    this.cookieService.delete('name');

    this.router.navigate(['auth/login']);
  }
}
