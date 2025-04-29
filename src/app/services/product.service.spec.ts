import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProducts: Product[] = [
    {
      id: 1,
      title: 'Test Product 1',
      price: 99.99,
      description: 'Test Description 1',
      category: 'Test Category',
      image: 'test-image-1.jpg',
    },
    {
      id: 2,
      title: 'Test Product 2',
      price: 149.99,
      description: 'Test Description 2',
      category: 'Test Category',
      image: 'test-image-2.jpg',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    // Handle initial HTTP request from constructor
    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    req.flush(mockProducts);
  });

  it('should load products on initialization', () => {
    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);

    service.products$.subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });
  });

  it('should handle error when loading products', () => {
    const consoleSpy = jest.spyOn(console, 'error');

    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    req.error(new ErrorEvent('Network error'));

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should get a single product by id', () => {
    // Handle initial HTTP request from constructor
    const initialReq = httpMock.expectOne('https://fakestoreapi.com/products');
    initialReq.flush(mockProducts);

    const productId = 1;

    service.getProduct(productId).subscribe((product) => {
      expect(product).toEqual(mockProducts[0]);
    });

    const req = httpMock.expectOne(`https://fakestoreapi.com/products/${productId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts[0]);
  });

  it('should refresh products', () => {
    // Handle initial HTTP request from constructor
    const initialReq = httpMock.expectOne('https://fakestoreapi.com/products');
    initialReq.flush(mockProducts);

    // Call refresh
    service.refreshProducts();

    // Handle refresh request
    const refreshReq = httpMock.expectOne('https://fakestoreapi.com/products');
    expect(refreshReq.request.method).toBe('GET');
    refreshReq.flush(mockProducts);

    service.products$.subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });
  });
});
