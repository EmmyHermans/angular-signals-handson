import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProductDetailComponent } from './product-detail.component';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { RouterModule } from '@angular/router';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let mockProductService: Partial<ProductService>;
  let router: Router;

  const mockProduct: Product = {
    id: 1,
    title: 'Test Product 1',
    price: 99.99,
    description: 'Test Description 1',
    category: 'Test Category',
    image: 'test-image-1.jpg',
  };

  beforeEach(async () => {
    mockProductService = {
      products$: of([mockProduct]),
      getProduct: jest.fn((id: number) => of(mockProduct)),
    };

    const routerSpy = { navigate: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent, MatButtonModule, MatIconModule, NoopAnimationsModule, RouterModule],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load product when id is set', () => {
    component.id = '1';

    component.product$.subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    expect(mockProductService.getProduct).toHaveBeenCalledWith(1);
  });

  it('should navigate back when goBack is called', () => {
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should handle numeric conversion in id setter', () => {
    const getProductSpy = jest.spyOn(mockProductService, 'getProduct');

    // Valid numeric ID
    component.id = '1';
    expect(getProductSpy).toHaveBeenCalledWith(1);
    expect(component.error).toBeNull();

    // Reset spy calls
    getProductSpy.mockClear();

    // Invalid non-numeric ID
    component.id = 'abc';
    expect(getProductSpy).not.toHaveBeenCalled();
    expect(component.error).toBe('Invalid product ID');
  });
});
