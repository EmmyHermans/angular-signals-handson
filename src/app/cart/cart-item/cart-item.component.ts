import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../models/cart.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  @Input({ required: true }) item!: CartItem;
  @Output() quantityChange = new EventEmitter<number>();
  @Output() remove = new EventEmitter<void>();

  get totalPrice(): number {
    return this.item.product.price * this.item.quantity;
  }

  updateQuantity(quantity: number): void {
    if (quantity >= 0) {
      this.quantityChange.emit(quantity);
    }
  }

  removeFromCart(): void {
    this.remove.emit();
  }
}
