# AngularSignalsHandson

- run `npm install` to install the dependencies
- run `ng serve` to run the application


1. Add a counter component somewhere in the app that uses signals. Make sure the count is displayed, there is a + and a - button to increase and decrease the count.

1. Add computed signals to display the double count (count * 2) and if the count is even or odd in the counter component. 

1. Add an effect to the counter component that logs the count to the console. Adjust the increase function to update the count signal multiple times and verify that the effect will only run after all updates are finished.

1. Run the migrations to convert inputs to signals and outputs to the new output function and use the --insert-todos flag to create TODOs for all things that could not be migrated (https://angular.dev/reference/migrations)

1. Resolve the todo's by hand. (see hints at the end of this file if your stuck)

1. Use a computed signal to display the price in the cart-item component instead of using a getter.

1. Replace RxJS in the cart service for signals.

## Advanced
1. Use an effect to persist the products in the cart to localStorage.

1. Try the new Resource to fetch data from the API

## Hints

