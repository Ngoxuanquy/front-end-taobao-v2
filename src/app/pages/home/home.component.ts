import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../core/services/home.service';
import { ProductDetailComponent } from '../../components/product-detail/product-detail.component';
import { ProductComponent } from '../../components/product/product.component';
import { catchError, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent, 
    HttpClientModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any = null;
  constructor(public homeService : HomeService) { }

  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct() {
    this.homeService.getAllProducts().subscribe({
      next: res => {
        if (res && res.metadata) {
          this.products = res.metadata;
        } else {
          console.error('Lỗi: API không trả về metadata');
        }
      },
      error: err => console.error('Lỗi xảy ra:', err)
    });
  };
}
