import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() products: any;
  constructor() { }

  ngOnInit() {
  }

}
