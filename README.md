# AngularSignalsHandson

- run `npm install` to install the dependencies
- run `npx ng serve` to run the application


1. Add a counter component somewhere in the app that uses signals. Make sure the count is displayed and there is a + and a - button to increase and decrease the count.

2. Add computed signals to display if the count is even or odd and to display the double count (count * 2) in the counter component. 

3. Add an effect to the counter component that logs the count to the console. Adjust the increment function to update the count signal multiple times and verify that the effect will only run after all updates are finished.

4. Run the migrations to convert inputs to signals and outputs to the new output function and use the --insert-todos flag for the input migration to create TODOs for all things that could not be migrated (https://angular.dev/reference/migrations).

5. Use a computed signal to display the price in the cart-item component instead of using a getter.

6. Resolve the todo's from the migration by hand. For now use an effect to call the product service each time the id changes (see hints at the end of this file if your stuck).

7. Replace RxJS in the cart service for signals. Update all components that use the service.

## Advanced
8. Use an effect to persist the products in the cart to localStorage.

9. Try the RxJS interop package to create a signal from the api request responses.

10. Try the new Resource to fetch data from the API.

11. Create a linked signal to highlight the last clicked product in the product overview.

12. Add a filter field to the product overview to filter on product name.

13. Fix some of the unit tests.

## Hints
6.1. Use one of the build-in transform functions to convert the id input to a number.
6.2. Use a computed signal for the error message

