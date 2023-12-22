import { Routes } from '@angular/router';
import { Layout_containerComponent } from './layout_container.component';
// import { CreateBookComponent } from '../../../pages/create/createBook.component';
import { ListBorrowBookComponent } from '../../../pages/listBorrowBook/listBorrowBook.component';
import { authGuard } from '../../interceptor/auth.guard';
import { QlDanhMucSachComponent } from '../../../pages/QlDanhMucSach/QlDanhMucSach.component';
import { CreateComponent } from '../../../pages/Books/create/create.component';
import { ListBookPagesComponent } from '../../../pages/Books/listBookPages/listBookPages.component';
// import { CreateBookComponent } from '../../../Features/books/book.module';

export const WELCOME_ROUTES: Routes = [
  {
    path: 'admin',
    component: Layout_containerComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'listbooks', component: ListBookPagesComponent },
          { path: 'createBooks', component: CreateComponent },
          { path: 'listBorrowBook', component: ListBorrowBookComponent },
          { path: 'qldanhmucsach', component: QlDanhMucSachComponent },
        ],
      },
    ],
  },
];
