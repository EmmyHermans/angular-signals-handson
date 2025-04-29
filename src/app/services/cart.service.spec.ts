import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product } from '../models/product.model';

describe('CartService', () => {
  let service: CartService;
  const mockProduct1: Product = {
    id: 1,
    title: 'Test Product 1',
    price: 10,
    description: 'Test Description 1',
    category: 'Test Category',
    image: 'test-image-1.jpg',
  };
  const mockProduct2: Product = {
    id: 2,
    title: 'Test Product 2',
    price: 20,
    description: 'Test Description 2',
    category: 'Test Category',
    image: 'test-image-2.jpg',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with empty cart', (done) => {
    service.getCart().subscribe((cart) => {
      expect(cart.items).toEqual([]);
      expect(cart.total).toBe(0);
      done();
    });
  });

  it('should add item to cart', (done) => {
    service.addToCart(mockProduct1);

    service.getCart().subscribe((cart) => {
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].product).toEqual(mockProduct1);
      expect(cart.items[0].quantity).toBe(1);
      expect(cart.total).toBe(10);
      done();
    });
  });

  it('should update quantity when adding existing item', (done) => {
    service.addToCart(mockProduct1);
    service.addToCart(mockProduct1);

    service.getCart().subscribe((cart) => {
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].quantity).toBe(2);
      expect(cart.total).toBe(20);
      done();
    });
  });

  it('should add different items separately', (done) => {
    service.addToCart(mockProduct1);
    service.addToCart(mockProduct2);

    service.getCart().subscribe((cart) => {
      expect(cart.items.length).toBe(2);
      expect(cart.total).toBe(30);
      done();
    });
  });

  it('should remove item from cart', (done) => {
    service.addToCart(mockProduct1);
    service.addToCart(mockProduct2);
    service.removeFromCart(mockProduct1.id);

    service.getCart().subscribe((cart) => {
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].product).toEqual(mockProduct2);
      expect(cart.total).toBe(20);
      done();
    });
  });

  it('should update item quantity', (done) => {
    service.addToCart(mockProduct1);
    service.updateQuantity(mockProduct1.id, 3);

    service.getCart().subscribe((cart) => {
      expect(cart.items[0].quantity).toBe(3);
      expect(cart.total).toBe(30);
      done();
    });
  });

  it('should not update quantity to negative value', (done) => {
    service.addToCart(mockProduct1);
    service.updateQuantity(mockProduct1.id, -1);

    service.getCart().subscribe((cart) => {
      expect(cart.items[0].quantity).toBe(1);
      expect(cart.total).toBe(10);
      done();
    });
  });

  it('should clear cart', (done) => {
    service.addToCart(mockProduct1);
    service.addToCart(mockProduct2);
    service.clearCart();

    service.getCart().subscribe((cart) => {
      expect(cart.items).toEqual([]);
      expect(cart.total).toBe(0);
      done();
    });
  });

  it('should get cart items', (done) => {
    service.addToCart(mockProduct1);
    service.addToCart(mockProduct2);

    service.getCartItems().subscribe((items) => {
      expect(items.length).toBe(2);
      expect(items[0].product).toEqual(mockProduct1);
      expect(items[1].product).toEqual(mockProduct2);
      done();
    });
  });

  it('should get total', (done) => {
    service.addToCart(mockProduct1, 2);
    service.addToCart(mockProduct2);

    service.getTotal().subscribe((total) => {
      expect(total).toBe(40); // (10 * 2) + (20 * 1)
      done();
    });
  });
});
