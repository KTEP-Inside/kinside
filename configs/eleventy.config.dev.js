const baseConfig = require("./eleventy.config.js");

/**
 *
 * @param {import('@11ty/eleventy').UserConfig} config
 * @returns
 */
module.exports = (config) => {
	const result = baseConfig(config);
	config.addPassthroughCopy("src/styles");
	config.addPassthroughCopy("src/scripts");

	config.addWatchTarget("src/styles");
	config.addWatchTarget("src/scripts");
	config.addWatchTarget("src/sites/**/*.md");

	config.setServerOptions({
		liveReload: true,
	});

	return result;
};
