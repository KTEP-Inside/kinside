/**
 *
 * @param {import('@11ty/eleventy').UserConfig} config
 * @returns
 */
module.exports = (config) => {
	config.addPassthroughCopy('src/sites/*/*.(webp|jpg)');
	config.addPassthroughCopy('src/styles');

	config.addWatchTarget('src/styles');

	config.addFilter('parseDate', (date) => {
		const formatter = Intl.DateTimeFormat('ru');
		return formatter.format(new Date(date));
	});

	config.setServerOptions({
		liveReload: true,
	});

	return {
		dir: {
			input: 'src',
			output: 'dist',
			data: 'data',
			includes: 'includes',
			layouts: 'layouts',
		},
		htmlTemplateEngine: 'njk',
		dataTemplateEngine: 'njk',
	};
};
