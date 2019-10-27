# Ads Checkout System

## Coding Challenge

We want to offer different products to recruiters:

| Name | Description | Retail Price |
|---|---|---|
| Classic Ad | Offers the most basic level of advertisement | $269.99 |
| Standout Ad | Allows advertisers to use more company logo and longer presentation text | $322.99 |
| Premium Ad | Same benefit as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility | $394.99 |

We have established a number of special pricing rules for a small number of privileged customers:
1. SecondBite
    - Gets a 3 for 2 deal on Classic Ads
2. Axil Coffee Roasters
    - Gets a discount on Stand out Ads where the price drops to $299.99 per ad
3. MYER
    - Gets a 5 for 4 deal on Stand out Ads
    - Gets a discount on Premium Ads where the price drops to $389.99 per ad

These details are regularly renegotiated, so we need the pricing rules to be as flexible as possible as they
can change in the future with little notice.

The interface to our checkout looks like this pseudocode:

```
Checkout co = Checkout.new(pricingRules)
co.add(item1)
co.add(item2)
co.total()
```

Only spend enough time required to produce an appropriate, clean, testable and maintainable solution to the stated
problem. You should focus on delivering only a back-end OR front-end implementation. Keep it simple.

## Example scenarios

```
Customer: default
Items: `classic`, `standout`, `premium`
Total: $987.97
```

```
Customer: SecondBite
Items: `classic`, `classic`, `classic`, `premium`
Total: $934.97
```

```
Customer: Axil Coffee Roasters
Items: `standout`, `standout`, `standout`, `premium`
Total: $1294.96
```

## How to run

If you have `docker` installed, you need to run `./docker-run.sh`

If you have `nvm` installed, you need to run `nvm use`

Otherwise you need to have node version 12.13.0 installed on your machine

Afterwards
```
$ npm install       # install the dependencies
$ npm run build     # build the application
$ npm run test      # test the application
$ npm run start     # start the application
```

If you want to watch for file changes you can append the build and test `npm run` with `-- --watch`

## Notes

This coding challenge does leave some details that are open for interpretations.
More information can be found in [questions-and-assumptions](./docs/questions-and-assumptions.md)
or alternative have a look at the [architectural-decisions](./docs/architectural-decisions.md)