const { IMG_PATTERN } = require('./config.js');

/**
 *
 * @param {import('@11ty/eleventy').UserConfig} config
 * @returns
 */
module.exports = (config) => {
	config.addPassthroughCopy(`src/sites/**/${IMG_PATTERN}`);
	config.addPassthroughCopy(`src/fonts`);
	config.addPassthroughCopy(`src/images`);

	config.addFilter('parseDate', (date) => {
		const formatter = Intl.DateTimeFormat('ru');
		return formatter.format(new Date(date));
	});

	config.addFilter('year', (date) => {
		return new Date(date).getFullYear();
	});

	config.addFilter('map', (list, key) => {
		if (!Array.isArray(list)) {
			throw Error('map only for arrays');
		}
		return list.map((item) => item[key]);
	});

  console.log(__dirname)

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
