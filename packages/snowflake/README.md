# `@wawanakwa/snowflake`

*An implementation of the Twitter snowflake standard in TypeScript.*

## Table of Contents

- [`@wawanakwa/snowflake`](#wawanakwasnowflake)
	- [Table of Contents](#table-of-contents)
	- [Installation](#installation)
	- [Usage](#usage)
	- [Licensing](#licensing)

## Installation

```sh
# npm
npm i --save @wawanakwa/snowflake

# pnpm (preferred)
pnpm add @wawanakwa/snowflake

# yarn
yarn add @wawanakwa/snowflake
```

## Usage

Using `@wawanakwa/snowflake` is pretty easy.

```ts
import Snowflake, { DiscordSnowflake } from "@wawanakwa/snowflake";

const MY_EPOCH = 123456789n;

// We need to provide an epoch time for the snowflake. Not passing in any
// overrides will let generation take complete control.
//
// Fields like workerId will always default to 0, however.
let mySnowflake = new Snowflake(MY_EPOCH);

// We can also pass in an existing snowflake-like value to completely override
// it.
mySnowflake = new Snowflake(MY_EPOCH, 123456789n);

// Another thing we can do is pass in options for overriding specific parts of
// the generated snowflake.
mySnowflake = new Snowflake(MY_EPOCH, {
	// Defaults to Date.now() converted to a bigint.
	timestamp: 1n,
	// Defaults to 0, you will have to pass this option to customize it.
	workerId: 2,
	// Defaults to the amount of previously generated snowflakes (without an
	// overridden increment).
	increment: 3,
});

// You don't pass in an epoch, it automatically uses Discord's.
mySnowflake = new DiscordSnowflake({
	// Same as Snowflake's.
	timestamp: 1n,
	// Same as Snowflake's, other than it now being only 5 bits.
	workerId: 2,
	// New to DiscordSnowflake, 5 bits.
	processId: 3,
	// Same as Snowflake's.
	increment: 4,
});

// You can also use a Snowflake in a template string, it will print as the
// snowflake itself.
console.log(`Hello, User ${mySnowflake}.`) // Hello, User 4206596.
```

> **Note**
> `@wawanakwa/snowflake` only supports ESM, you won't be able to import it from CJS files as it does
> not define an export for `require`, nor does it provide compatible files.
>
> It's highly recommended that you use ESM anyways, it's simply better.

## Licensing

The `@wawanakwa/snowflake` sub-package is licensed under the [BSD-3-Clause](LICENSE) license.
