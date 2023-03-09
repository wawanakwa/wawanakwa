import Snowflake from "~/Snowflake.js";

/**
 * An extension of {@link Snowflake} for Twitter.
 */
class TwitterSnowflake extends Snowflake {
	/**
	 * Generate a new {@link TwitterSnowflake} instance, based entirely on the passed
	 * {@link SnowflakeLike} value.
	 *
	 * @param raw
	 * The raw {@link SnowflakeLike} value to create the instance from.
	 */
	constructor(raw: Snowflake.SnowflakeLike);

	/**
	 * Generate a new {@link TwitterSnowflake} instance, optionally choosing to overwrite specific
	 * parts of the generated snowflake.
	 *
	 * @param [options={}]
	 * The partial {@link TwitterSnowflake.Parts} to use as overrides on the generated snowflake.
	 */
	constructor(options?: Partial<TwitterSnowflake.Parts>);

	constructor(rawOrOptions: Snowflake.SnowflakeLike | Partial<TwitterSnowflake.Parts> = {}) {
		super(TwitterSnowflake.TWITTER_EPOCH, rawOrOptions as any);
	}
}

namespace TwitterSnowflake {
	/**
	 * Describes the individual parts of a Twitter snowflake.
	 */
	export interface Parts extends Snowflake.Parts {}

	/**
	 * The Twitter epoch, this value is automatically used when creating a {@link TwitterSnowflake}
	 * instance.
	 */
	export const TWITTER_EPOCH = 1288834974657n;
}

export default TwitterSnowflake;
