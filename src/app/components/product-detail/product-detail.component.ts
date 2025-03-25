import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

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
  productEx!: Product;
  selectedSize = 'S';
  selectedColor: any;
  selectedMaterial: any;
  quantity = 1;
  ngOnInit(): void {
    // Ở đây bạn có thể gọi API để lấy dữ liệu sản phẩm dựa trên _id
    // Ví dụ: this.productService.getProductById(this.product._id).subscribe(data => this.product = data);
    this.productEx = {
      id: 'aaaaa',
      product_name: 'Váy trắng cúp ngực đẹp kiểu dáng đơn giản, hiện đại #3151',
      product_thumb: 'https://bizweb.dktcdn.net/100/368/426/products/vay-trang-cup-nguc-dep.jpg?v=1739251870663', // Ảnh placeholder
      product_description: 'Váy trắng thanh lịch, phù hợp cho các buổi tiệc hoặc sự kiện.',
      product_price: 890000,
      product_quantity: 1,
      product_attributes: {
        color: 'Trắng',
        sizes: ['S', 'M', 'L'],
        material: 'Tafta Hàn cao cấp'
      },
      product_discount: 0,
      product_ratingsAverage: 4.5,
      product_variations: [
        { color: 'Trắng', available: true },
        { color: 'Đỏ', available: true }
      ],
      isDraft: false,
      isPublished: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.selectedColor = this.productEx.product_attributes.color;
    this.selectedMaterial = this.productEx.product_attributes.material;
  }

  increaseQuantity() {
    if (this.quantity < this.productEx.product_quantity) {
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
    alert(`Đã thêm ${this.productEx.product_name} vào giỏ hàng!`);
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
    if (this.productEx.product_discount && this.productEx.product_discount > 0) {
      return this.productEx.product_price * (1 - this.productEx.product_discount / 100);
    }
    return this.productEx.product_price;
  }



}
