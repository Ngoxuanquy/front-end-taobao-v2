import { ProductService } from './../../core/services/product.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class ProductDetailComponent implements OnInit{
  productId = '';
  productDetail!: any;
  selectedSize = 'S';
  selectedColor: any;
  selectedMaterial: any;
  quantity = 1;
  constructor(
    private productService : ProductService,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    this.getProductDetail();
    this.selectedColor = this.productDetail.product_attributes.color;
    this.selectedMaterial = this.productDetail.product_attributes.material;
  }

  increaseQuantity() {
    if (this.quantity < this.productDetail.product_quantity) {
      this.quantity++;
    }
  }

  // Giảm số lượng
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    alert(`Đã thêm ${this.productDetail.product_name} vào giỏ hàng!`);
    // Ở đây bạn có thể gọi một service để thêm sản phẩm vào giỏ hàng
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  selectMaterial(material: string) {
    this.selectedMaterial = material;
  }

  // Tính giá sau khi giảm (nếu có)
  getDiscountedPrice(): number {
    if (this.productDetail.product_discount && this.productDetail.product_discount > 0) {
      return this.productDetail.product_price * (1 - this.productDetail.product_discount / 100);
    }
    return this.productDetail.product_price;
  }

  getProductDetail(): void {
    this.productService.getDetailProduct(this.productId).subscribe(
      (data) => {
        this.productDetail = data.metadata;
        console.log(this.productDetail);
      },
      (error) => {
        console.error('Error loading product details:', error);
      }
    );
  }



}
