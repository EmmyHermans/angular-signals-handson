import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../services/cart.service';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../models/cart.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CartItem } from '../models/cart.model';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: jest.Mocked<CartService>;
  const mockCart: Cart = {
    items: [],
    total: 0,
  };
  const cartSubject = new BehaviorSubject<Cart>(mockCart);

  beforeEach(async () => {
    cartService = {
      getCart: jest.fn().mockReturnValue(cartSubject),
      updateQuantity: jest.fn(),
      removeFromCart: jest.fn(),
      getCartItems: jest.fn(),
      getTotal: jest.fn(),
      getCartItemsCount: jest.fn(),
      addToCart: jest.fn(),
      clearCart: jest.fn(),
    } as unknown as jest.Mocked<CartService>;

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule, CartComponent],
      providers: [{ provide: CartService, useValue: cartService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display empty cart message when cart is empty', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Your cart is empty');
  });

  it('should display cart items when cart is not empty', () => {
    const mockCartWithItems: Cart = {
      items: [
        {
          product: {
            id: 1,
            title: 'Test Product',
            price: 10,
            description: 'Test Description',
            category: 'test',
            image: 'test.jpg',
          },
          quantity: 2,
        },
      ],
      total: 20,
    };
    cartSubject.next(mockCartWithItems);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Product');
    expect(compiled.textContent).toContain('$20.00');
  });

  it('should call updateQuantity when quantity buttons are clicked', () => {
    const mockCartItem: CartItem = {
      product: {
        id: 1,
        title: 'Test Product',
        price: 10,
        description: 'Test Description',
        category: 'test',
        image: 'test.jpg',
      },
      quantity: 2,
    };
    cartSubject.next({
      items: [mockCartItem],
      total: 20,
    });
    fixture.detectChanges();

    component.updateQuantity(1, 3);
    expect(cartService.updateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it('should call removeFromCart when remove button is clicked', () => {
    const mockCartItem: CartItem = {
      product: {
        id: 1,
        title: 'Test Product',
        price: 10,
        description: 'Test Description',
        category: 'test',
        image: 'test.jpg',
      },
      quantity: 2,
    };
    cartSubject.next({
      items: [mockCartItem],
      total: 20,
    });
    fixture.detectChanges();

    component.removeFromCart(1);
    expect(cartService.removeFromCart).toHaveBeenCalledWith(1);
  });
});
