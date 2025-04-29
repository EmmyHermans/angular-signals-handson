import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-overview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatGridListModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './product-overview.component.html',
  styleUrl: './product-overview.component.scss',
})
export class ProductOverviewComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = 'all';
  displayedProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.products$.subscribe((products) => {
      this.products = products;
      this.displayedProducts = products;
      this.categories = ['all', ...new Set(products.map((product) => product.category))];
      this.filterProducts();
    });
  }

  filterProducts(): void {
    this.displayedProducts =
      this.selectedCategory === 'all'
        ? this.products
        : this.products.filter((product) => product.category === this.selectedCategory);
  }

  onCategoryChange(): void {
    this.filterProducts();
  }
}
