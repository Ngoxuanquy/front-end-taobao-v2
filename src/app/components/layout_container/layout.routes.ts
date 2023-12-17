import { Routes } from '@angular/router';
import { HomeComponent } from '../../pages/home/home.component';
import { Layout_containerComponent } from './layout_container.component';
import { CreateBookComponent } from '../../pages/createBook/createBook.component';

export const WELCOME_ROUTES: Routes = [
  {
    path: '',
    component: Layout_containerComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'listbooks', component: HomeComponent },
          { path: 'createBooks', component: CreateBookComponent },
        ],
      },
    ],
  },
];
