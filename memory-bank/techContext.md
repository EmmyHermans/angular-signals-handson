# Technical Context: Angular Webshop

## Technologies Used

### Frontend Framework
- Angular (19.2.0)
- TypeScript (5.7.2)
- RxJS for state management

### API Integration
- FakeStore API (https://fakestoreapi.com/products)
- HTTP Client Module
- JSON response handling

### State Management
- RxJS BehaviorSubject
- Observable pattern
- Data service architecture

## Development Setup
- Angular CLI
- Node.js environment
- Package management via npm
- TypeScript configuration
- Code formatting with Prettier (.prettierrc)

## Technical Constraints
- API response format must match interface:
```typescript
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
```

## Dependencies
### Core
- @angular/core
- @angular/common
- @angular/router
- rxjs

### Development
- TypeScript
- Angular CLI
- Code Quality:
  - Prettier (code formatting)
- Testing utilities:
  - Jest
  - @types/jest
  - ts-jest
  - jest-preset-angular

## API Integration Details
### Endpoints
- GET /products - List all products
- GET /products/{id} - Get single product

### Response Format
```json
[
  {
    "id": 0,
    "title": "string",
    "price": 0.1,
    "description": "string",
    "category": "string",
    "image": "http://example.com"
  }
]