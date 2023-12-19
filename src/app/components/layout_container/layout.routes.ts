import { Routes } from '@angular/router';
import { HomeComponent } from '../../pages/home/home.component';
import { Layout_containerComponent } from './layout_container.component';
import { CreateBookComponent } from '../../pages/createBook/createBook.component';
import { ListBorrowBookComponent } from '../../pages/listBorrowBook/listBorrowBook.component';
import { authGuard } from '../../auth/auth.guard';
import { QlDanhMucSachComponent } from '../../pages/QlDanhMucSach/QlDanhMucSach.component';

export const WELCOME_ROUTES: Routes = [
  {
    path: '',
    component: Layout_containerComponent,
    // canActivate: [authGuard],

    children: [
      {
        path: '',
        children: [
          { path: 'listbooks', component: HomeComponent },
          { path: 'createBooks', component: CreateBookComponent },
          { path: 'listBorrowBook', component: ListBorrowBookComponent },
          { path: 'qldanhmucsach', component: QlDanhMucSachComponent },
        ],
      },
    ],
  },
];
