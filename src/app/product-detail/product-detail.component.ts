import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  product$!: Observable<Product>;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  goBack() {
    this.router.navigate(['/products']);
  }

  @Input()
  set id(value: string) {
    const numId = Number(value);
    if (isNaN(numId)) {
      this.error = 'Invalid product ID';
      this.product$ = of();
      return;
    }

    this.error = null;
    this.product$ = this.productService.getProduct(numId);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
