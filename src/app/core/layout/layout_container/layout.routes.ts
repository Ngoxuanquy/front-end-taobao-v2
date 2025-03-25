import { Routes } from '@angular/router';
import { Layout_containerComponent } from './layout_container.component';
// import { CreateBookComponent } from '../../../pages/create/createBook.component';
import { authGuard } from '../../../auth/auth.guard';
// import { CreateBookComponent } from '../../../Features/books/book.module';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: Layout_containerComponent,
    children: [

    ],
  },
];
