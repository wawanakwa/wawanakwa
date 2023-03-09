/**
 * The base implementation of a Twitter snowflake, it requires passing an epoch time for snowflake
 * generation.
 */
class Snowflake {
	/**
	 * The live count of the number of generated snowflakes.
	 *
	 * @internal
	 */
	static #increment: number = 0;

	/**
	 * Retrieve the current increment.
	 */
	public static get increment(): number {
		return this.#increment;
	}

	/**
	 * The internal representation of a snowflake's epoch.
	 *
	 * @internal
	 */
	#epoch: bigint;

	/**
	 * The epoch of the {@link Snowflake} instance.
	 */
	public get epoch(): bigint {
		return this.#epoch;
	}

	/**
	 * The internal representation of the snowflake.
	 *
	 * @internal
	 */
	#inner: bigint;

	/**
	 * The timestamp of the {@link Snowflake}
	 */
	public get timestamp(): bigint {
		return (this.#inner >> 22n) + this.#epoch;
	}

	/**
	 * The ID of the worker which created the {@link Snowflake}.
	 */
	public get workerId(): number {
		return Number((this.#inner & 0x3ff000n) >> 12n);
	}

	/**
	 * The number of previously created {@link Snowflake} instances.
	 */
	public get increment(): number {
		return Number(this.#inner & 0xfffn);
	}

	/**
	 * Generate a new {@link Snowflake} instance, based entirely on the passed {@link SnowflakeLike}
	 * value.
	 *
	 * @param epoch
	 * The {@link EpochLike} to use as the snowflake's epoch.
	 *
	 * @param raw
	 * The raw {@link SnowflakeLike} value to create the instance from.
	 */
	constructor(epoch: Snowflake.EpochLike, raw: Snowflake.SnowflakeLike);

	/**
	 * Generate a new {@link Snowflake} instance, optionally choosing to overwrite specific parts of
	 * the generated snowflake.
	 *
	 * @param epoch
	 * The {@link EpochLike} to use as the snowflake's epoch.
	 *
	 * @param [options={}]
	 * The partial {@link Snowflake.Parts} to use as overrides on the generated snowflake.
	 */
	constructor(epoch: Snowflake.EpochLike, options?: Partial<Snowflake.Parts>);

	constructor(
		epoch: Snowflake.EpochLike,
		rawOrOptions: Snowflake.SnowflakeLike | Partial<Snowflake.Parts> = {},
	) {
		this.#epoch = BigInt(epoch instanceof Date ? epoch.getTime() : epoch);
		if (typeof rawOrOptions != "object") {
			this.#inner = BigInt(rawOrOptions);
			return;
		}

		const { timestamp = 0n, workerId = 0, increment = Snowflake.#increment++ } = rawOrOptions;
		this.#inner =
			(timestamp << 22n) | BigInt((workerId & 0b11111) << 12) | BigInt(increment & 0xfff);
	}

	/**
	 * Returns a string representation of the internal snowflake representation.
	 *
	 * @param radix
	 * Specifies a radix for converting the bigint to a string.
	 */
	public toString(radix?: number): string {
		return this.#inner.toString(radix);
	}

	// @ts-ignore
	private [Symbol.toStringTag] = this.toString;

	// @ts-ignore
	private [Symbol.toPrimitive](hint: "default" | "string" | "number"): string | number {
		return hint == "number" ? Number(this.#inner) : this.toString();
	}

	/**
	 * Returns the primitive value of the {@link Snowflake} instance.
	 */
	public valueOf(): bigint {
		return this.#inner;
	}
}

namespace Snowflake {
	/**
	 * Describes types that can be passed to functions, methods or constructors that are (typically)
	 * convertible to a {@link Snowflake} instance.
	 */
	export type SnowflakeLike = string | number | bigint;

	/**
	 * Describes types that can be passed to functions, methods or constructors that are (typically)
	 * convertible to an epoch.
	 */
	export type EpochLike = string | number | bigint | Date;

	/**
	 * Describes the individual parts of a Discord snowflake.
	 */
	export interface Parts extends Record<string, bigint | number> {
		/**
		 * The snowflake's timestamp INCLUDING its epoch.
		 */
		timestamp: bigint;

		/**
		 * The numeric ID of the worker which created the snowflake.
		 */
		workerId: number;

		/**
		 * The amount of previously created snowflakes.
		 */
		increment: number;
	}
}

export default Snowflake;
