# Architectural Decisions

Why did I come up with a solution like this? I like functional programming. I am not an expert in it, but I'd like to apply as much functional concept as possible.

## Pure functions

Pure function is basically a function that for the same input, it will always produce the same output. Also it doesn't cause any side effects while executing the implementations. A pure function also always has a return value.

Of course it's impossible to write an application entirely with just pure functions. Sooner or later we will need to come across states and classes. However if we keep the inner functions as pure as possible then they becomes easy to move around and refactor if necessary. In this solution, I put them under `services`

## Typed language

JavaScript is great, and this coding challenge was aimed to JavaScript developers. However typed language is much better than dynamic language. It helps developer from going insane trying to guess what's the shape of a variable. That's why I opt to use TypeScript.

For functional programming, types also helps designing the applications e.g. when deciding if a big function can be split in into several smaller ones.

## Data and Function

In functional programming, there's less emphasize on `class`. It's either `data` or `function`. Data have a structure but it has no state, and functions (_pure functions that is_) are mostly just transforming one data type to another data type though there could be several steps involved in a certain order.

This affects how I decide to structure the files and folders. As mentioned earlier, `services` contains pure functions. These functions are grouped into a file based on their inputs. So `cartService` for example would contain pure functions that has `cart` as an input.
