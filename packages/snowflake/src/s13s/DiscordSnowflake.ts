import Snowflake from "~/Snowflake.js";

/**
 * An extension of {@link Snowflake} specifically for
 * {@link https://discord.com/developers/docs/reference#snowflakes Discord's snowflake format}.
 */
class DiscordSnowflake extends Snowflake {
	/**
	 * The ID of the worker which created the {@link DiscordSnowflake}.
	 */
	public override get workerId(): number {
		return Number((this.valueOf() & 0x3e0000n) >> 17n);
	}

	/**
	 * The ID of the process which created the {@link DiscordSnowflake}.
	 */
	public get processId(): number {
		return Number((this.valueOf() & 0x1f000n) >> 12n);
	}

	/**
	 * Generate a new {@link DiscordSnowflake} instance, based entirely on the passed
	 * {@link SnowflakeLike} value.
	 *
	 * @param raw
	 * The raw {@link SnowflakeLike} value to create the instance from.
	 */
	constructor(raw: Snowflake.SnowflakeLike);

	/**
	 * Generate a new {@link DiscordSnowflake} instance, optionally choosing to overwrite specific
	 * parts of the generated snowflake.
	 *
	 * @param [options={}]
	 * The partial {@link DiscordSnowflake.Parts} to use as overrides on the generated snowflake.
	 */
	constructor(options?: Partial<DiscordSnowflake.Parts>);

	constructor(rawOrOptions: Snowflake.SnowflakeLike | Partial<DiscordSnowflake.Parts> = {}) {
		if (typeof rawOrOptions == "object" && "processId" in rawOrOptions)
			// Don't modify the original argument, and a revokable Proxy is too messy.
			rawOrOptions = {
				...rawOrOptions,
				workerId: ((rawOrOptions.workerId ?? 0) << 5) | rawOrOptions.processId,
			};

		super(DiscordSnowflake.DISCORD_EPOCH, rawOrOptions as any);
	}
}

namespace DiscordSnowflake {
	/**
	 * Describes the individual parts of a Discord snowflake.
	 */
	export interface Parts extends Snowflake.Parts {
		/**
		 * The numeric ID of the process which created the snowflake.
		 */
		processId: number;
	}

	/**
	 * The
	 * {@link https://discord.com/developers/docs/reference#snowflakes-snowflake-id-format-structure-left-to-right Discord epoch},
	 * this value is automatically used when creating a {@link DiscordSnowflake} instance.
	 */
	export const DISCORD_EPOCH = 1420070400000n;
}

export default DiscordSnowflake;
