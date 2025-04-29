import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private initialCart: Cart = {
    items: [],
    total: 0,
  };

  private cartState = new BehaviorSubject<Cart>(this.initialCart);

  getCart(): Observable<Cart> {
    return this.cartState.asObservable();
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartState.pipe(map((cart) => cart.items));
  }

  getTotal(): Observable<number> {
    return this.cartState.pipe(map((cart) => cart.total));
  }

  getCartItemsCount(): Observable<number> {
    return this.cartState.pipe(map((cart) => cart.items.reduce((total, item) => total + item.quantity, 0)));
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentCart = this.cartState.getValue();
    const existingItem = currentCart.items.find((item) => item.product.id === product.id);

    let updatedItems: CartItem[];

    if (existingItem) {
      updatedItems = currentCart.items.map((item) =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      updatedItems = [...currentCart.items, { product, quantity }];
    }

    const total = this.calculateTotal(updatedItems);

    this.cartState.next({
      items: updatedItems,
      total,
    });
  }

  removeFromCart(productId: number): void {
    const currentCart = this.cartState.getValue();
    const updatedItems = currentCart.items.filter((item) => item.product.id !== productId);
    const total = this.calculateTotal(updatedItems);

    this.cartState.next({
      items: updatedItems,
      total,
    });
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity < 0) return;

    const currentCart = this.cartState.getValue();
    const updatedItems = currentCart.items.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    const total = this.calculateTotal(updatedItems);

    this.cartState.next({
      items: updatedItems,
      total,
    });
  }

  clearCart(): void {
    this.cartState.next(this.initialCart);
  }

  private calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}
