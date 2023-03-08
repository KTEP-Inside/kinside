const gulp = require('gulp');
const rimraf = require('rimraf');

const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const postcssCsso = require('postcss-csso');
const postcssMinMax = require('postcss-media-minmax');

const squoosh = require('gulp-libsquoosh');

const cache = require('gulp-cache');

const { IMG_PATTERN } = require('./config');

gulp.task('styles::postcss', () => {
	return gulp
		.src('src/styles/styles.css')
		.pipe(postcss([postcssImport, postcssCsso, postcssMinMax]))
		.pipe(gulp.dest('dist/styles'));
});

gulp.task('images::sites::compress', () => {
	return gulp
		.src(`src/sites/**/${IMG_PATTERN}`)
		.pipe(
			cache(
				squoosh({
					preprocessOptions: {
						resize: {
							width: 450,
						},
					},
					encodeOptions: {
						webp: 'auto',
						mozjpeg: 'auto',
					},
				})
			)
		)
		.pipe(gulp.dest('dist/sites'));
});

gulp.task('clean', () => {
	return rimraf(['dist/styles', `dist/sites/**/${IMG_PATTERN}`], {
		glob: true,
	});
});

gulp.task(
	'build',
	gulp.series('clean', 'styles::postcss', 'images::sites::compress')
);
