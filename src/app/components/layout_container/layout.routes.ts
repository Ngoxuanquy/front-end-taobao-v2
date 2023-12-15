import { Routes } from '@angular/router';
import { HomeComponent } from '../../pages/home/home.component';
import { WelcomeComponent } from '../../pages/welcome/welcome.component';
import { Layout_containerComponent } from './layout_container.component';

export const WELCOME_ROUTES: Routes = [
  {
    path: '',
    component: Layout_containerComponent,
    children: [
      {
        path: '',
        children: [{ path: 'welcome', component: WelcomeComponent }],
      },
    ],
  },
];
