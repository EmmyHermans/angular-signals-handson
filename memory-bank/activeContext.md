# Active Context: Angular Webshop

## Current Focus
- Managing shopping cart state with RxJS
- Enhancing cart functionality
- Implementing Material Design components
- Ensuring comprehensive test coverage

## Recent Changes
- Added Prettier for consistent code formatting:
  - Configured .prettierrc with Angular-friendly settings
  - Added format scripts to package.json
  - Formatted all project files
- Refactored CartItemComponent to use getter for price calculation
- Added input validation:
  - Required validation for CartItemComponent inputs
  - Error handling for invalid product IDs in ProductDetailComponent
  - User-friendly error message UI with Material design
- Project initialization
- Memory bank documentation setup
- Project requirements definition
- Added back navigation to product detail view
- Added "Add to Cart" functionality to product detail view with Material Design button
- Enhanced product detail component with Material Design components
- Added Material toolbar with navigation and branding
- Established CSS class selector pattern for styling
- Completed comprehensive test coverage for all components:
  - ProductDetailComponent tests for navigation, data loading, and input handling
  - ProductOverviewComponent tests for filtering and category management
  - ProductService tests for error handling and API integration
  - AppComponent tests for routing and title verification
- Implemented shopping cart functionality:
  - Created CartService with RxJS state management
  - Added cart models and interfaces
  - Implemented cart operations (add, remove, update)
  - Created CartComponent with Material Design
  - Added cart badge showing item count
  - Completed cart tests with Jest spies
  - Extracted cart item into a standalone component:
    - Created CartItemComponent for better modularity
    - Implemented input/output pattern for cart item interactions
    - Moved styles into component-specific SCSS

## Next Steps
1. Enhance shopping cart features:
   - Add checkout functionality
   - Implement cart persistence
   - Add cart animations
2. Further improve error handling:
   - Cart operation errors
   - Network errors
   - Additional edge cases
3. Add user feedback:
   - Toast notifications
   - Loading states
   - Success/error messages

## Active Decisions

### Testing Patterns
- Using Jest for unit testing
- Mock services with Jest spies
- Router testing with mock providers
- Component testing with TestBed
- Material component testing with NoopAnimationsModule
- Proper handling of RxJS observables in tests

### State Management
- Using RxJS BehaviorSubject for cart state
- Cart data structure with items and total
- Cart operations defined in service
- Real-time updates with observables

### Component Structure
- Planning component hierarchy
- Defining component responsibilities
- Establishing communication patterns
- Material Design integration

### API Integration
- Handling API responses
- Error scenarios
- Loading states

## Current Considerations
- Test coverage strategy:
  - Full coverage of service methods
  - Component initialization and rendering
  - User interactions and events
  - Error handling and edge cases
- Testing best practices:
  - Isolated unit tests
  - Mock external dependencies
  - Clean test setup and teardown
- Component testing patterns:
  - Input/Output testing
  - Router integration testing
  - Material component testing
- Service testing approach:
  - HTTP request mocking
  - Error handling scenarios
  - State management testing
  - Cart operations testing
- Error scenario testing
- CSS styling consistency using class selectors
- Code formatting standards:
  - Consistent formatting with Prettier
  - Angular-specific formatting rules
  - Automated formatting through npm scripts