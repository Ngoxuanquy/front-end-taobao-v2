import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../core/services/home.service';
import { ProductDetailComponent } from '../../components/product-detail/product-detail.component';
import { ProductComponent } from '../../components/product/product.component';
import { catchError, map, throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductDetailComponent, ProductComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any = null;
  constructor(public homeService : HomeService) { }

  ngOnInit() {
    setTimeout(() => {
    this.getAllProduct();
  }, 100);
  }

  getAllProduct() {
     this.homeService.getAllProduct().pipe(
          map(response => response.metadata), // Giả sử API trả về metadata chứa danh sách sản phẩm
          catchError(error => {
            console.error('Failed to fetch products:', error);
            return throwError(() => new Error(error));
          })
        ).subscribe({
          next: (products) => {
            console.log(products);
            this.products = products;
          },
          error: (error) => {
            console.error('Error:', error);
          }
});

  }
}
