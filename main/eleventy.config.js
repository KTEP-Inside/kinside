/**
 *
 * @param {import('@11ty/eleventy').UserConfig} config
 * @returns
 */
module.exports = (config) => {
	config.addPassthroughCopy('src/sites/*/*.(webp|jpg)');
	config.addPassthroughCopy('**/*.css');

	return {
		dir: {
			input: 'src',
			output: 'dist',
			data: 'data',
			includes: 'includes',
			layouts: 'layouts',
		},
	};
};
