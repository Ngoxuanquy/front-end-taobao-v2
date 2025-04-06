import { Routes } from '@angular/router';
// import { CreateBookComponent } from '../../../pages/create/createBook.component';
import { authGuard } from '../../../auth/auth.guard';
import { LayoutClientComponent } from './layout-client.component';
import { HomeComponent } from '../../../pages/home/home.component';
import { ShopComponent } from '../../../pages/shop/shop.component';
import { ProductDetailComponent } from '../../../pages/product-detail/product-detail.component';
// import { CreateBookComponent } from '../../../Features/books/book.module';

export const CLIENT_ROUTES: Routes = [
  {
    path: '',
    component: LayoutClientComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'product/:productId', component: ProductDetailComponent },


    ],
  },
];
