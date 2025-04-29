import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartItemComponent } from './cart-item.component';
import { CartItem } from '../../models/cart.model';
import { Product } from '../../models/product.model';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;

  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 10.0,
    description: 'Test Description',
    category: 'Test Category',
    image: 'test.jpg',
  };

  const mockCartItem: CartItem = {
    product: mockProduct,
    quantity: 1,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    component.item = mockCartItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total price correctly', () => {
    expect(component.totalPrice).toBe(10.0);
  });

  it('should emit quantity change', () => {
    const spy = jest.spyOn(component.quantityChange, 'emit');
    component.updateQuantity(2);
    expect(spy).toHaveBeenCalledWith(2);
  });

  it('should not emit quantity change for negative values', () => {
    const spy = jest.spyOn(component.quantityChange, 'emit');
    component.updateQuantity(-1);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should emit remove event', () => {
    const spy = jest.spyOn(component.remove, 'emit');
    component.removeFromCart();
    expect(spy).toHaveBeenCalled();
  });
});
