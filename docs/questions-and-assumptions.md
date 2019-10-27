# Questions and Assumptions

## What does it mean by delivering frontend or backend solution?
Usually I think that frontend means a client side app (e.g. a react app) while backend is an API which will be called by the client side app.

However I assume that the main objective of this coding challenge is not assessing how the candidate is setting up a React app or how the candidate is setting up an API. This coding exercise emphasize more on how the application logic is setup.

Thus I decide to go with another solution, creating an Node App which is robust enough so that in the future it can
be easily refactored into client side app and/or backend API.

## When do we get the customer, available ads, and the pricing rules?
In the sample pseudocode, when `Checkout` is initialised, pricing rules are passed in as parameters.
What are these pricing rules? Are they the one that applies to a customer or all available pricing rules regardless
of customers?

When do we get the customer? Do we get it outside `Checkout`?

In my opinion getting the customer and pricing rules should be done like the following and *in order*
1. get the customer
2. get the pricing rules based on the customer. Alternatively we can get all pricing lists, but that's a waste, isn't it?

and of course we need to know when we get the available ads too ... but it can happen in paralell or before/after the above.

## Whenever there are more Pricing Rule on the same ad type, what should happen?
- Should both be applied? Which order?
- Should one be applied? Which one? The latest one? The one that cost the least?

For the purpose of this coding test, I'll use the latest Pricing Rule on that ad type.

## When do we get the base/retail price?
- When the available ads are loaded into the app?
- When someone add the ad into the shopping cart?
- When someone total/checkout?

Customers would be unhappy/surprised if the price shown in checkout differs (_especially if it becomes more expensive_) from the price when they put it into the shopping cart.

But we also need to take into consideration if the cost can be altered in transit between functions. For a simple standalone app, this might be okay, but if we are considering frontend and backend, than it's becomes security vs performance vs consistency (double counting)

For the purpose of this coding challenge, I opt to calculate the cost at the very end. It's more centralised than having the price item being passed everywhere needlessly

A good developer should not only know what needs to happen, but also when things should happen.
