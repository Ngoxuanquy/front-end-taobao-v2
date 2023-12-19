import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterModule, Routes } from '@angular/router';
import { QlDanhMucSachComponent } from '../../pages/QlDanhMucSach/QlDanhMucSach.component';
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
  ],
  templateUrl: './layout_container.component.html',
  styleUrls: ['./layout_container.component.css'],
})
export class Layout_containerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  isCollapsed = false;
}
