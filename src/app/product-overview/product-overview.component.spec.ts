import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductOverviewComponent } from './product-overview.component';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

describe('ProductOverviewComponent', () => {
  let component: ProductOverviewComponent;
  let fixture: ComponentFixture<ProductOverviewComponent>;
  let mockProductService: jest.Mocked<ProductService>;
  let productsSubject: BehaviorSubject<Product[]>;

  const mockProducts: Product[] = [
    {
      id: 1,
      title: 'Product 1',
      price: 10.99,
      description: 'Description 1',
      category: 'electronics',
      image: 'image1.jpg',
    },
    {
      id: 2,
      title: 'Product 2',
      price: 20.99,
      description: 'Description 2',
      category: 'clothing',
      image: 'image2.jpg',
    },
    {
      id: 3,
      title: 'Product 3',
      price: 15.99,
      description: 'Description 3',
      category: 'electronics',
      image: 'image3.jpg',
    },
  ];

  beforeEach(async () => {
    productsSubject = new BehaviorSubject<Product[]>(mockProducts);

    const mockService = {
      products$: productsSubject.asObservable(),
    };

    await TestBed.configureTestingModule({
      imports: [
        ProductOverviewComponent,
        NoopAnimationsModule,
        FormsModule,
        MatGridListModule,
        MatSelectModule,
        MatFormFieldModule,
        MatCardModule,
        RouterModule,
      ],
      providers: [
        { provide: ProductService, useValue: mockService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {} },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with all products', () => {
    expect(component.products).toEqual(mockProducts);
    expect(component.displayedProducts).toEqual(mockProducts);
  });

  it('should initialize categories correctly', () => {
    const expectedCategories = ['all', 'electronics', 'clothing'];
    expect(component.categories).toEqual(expectedCategories);
  });

  it('should start with "all" as selected category', () => {
    expect(component.selectedCategory).toBe('all');
  });

  it('should filter products when category changes', () => {
    // When selecting 'electronics' category
    component.selectedCategory = 'electronics';
    component.onCategoryChange();

    const electronicsProducts = mockProducts.filter((p) => p.category === 'electronics');
    expect(component.displayedProducts).toEqual(electronicsProducts);
    expect(component.displayedProducts.length).toBe(2);
  });

  it('should show all products when "all" category is selected', () => {
    // First select a specific category
    component.selectedCategory = 'electronics';
    component.onCategoryChange();

    // Then switch back to 'all'
    component.selectedCategory = 'all';
    component.onCategoryChange();

    expect(component.displayedProducts).toEqual(mockProducts);
    expect(component.displayedProducts.length).toBe(3);
  });

  it('should update displayed products when product service emits new products', () => {
    const newProducts: Product[] = [
      {
        id: 4,
        title: 'Product 4',
        price: 25.99,
        description: 'Description 4',
        category: 'books',
        image: 'image4.jpg',
      },
    ];

    productsSubject.next(newProducts);
    fixture.detectChanges();

    expect(component.products).toEqual(newProducts);
    expect(component.displayedProducts).toEqual(newProducts);
    expect(component.categories).toEqual(['all', 'books']);
  });
});
