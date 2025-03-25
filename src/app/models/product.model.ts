export interface Product {
  id: string;
  product_name: string;
  product_thumb: string; // Ảnh đại diện sản phẩm
  product_description?: string;
  product_slug?: string;
  product_price: number;
  product_quantity: number;
  product_type?: string;
  product_shop?: string; // ID của shop
  product_attributes: any; // Vì backend sử dụng Schema.Types.Mixed
  product_discount?: number;
  product_ratingsAverage?: number;
  product_variations?: any[]; // Danh sách các biến thể sản phẩm
  isDraft?: boolean;
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
