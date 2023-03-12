const fs = require("fs");

const gulp = require("gulp");
const rimraf = require("rimraf");

const postcss = require("gulp-postcss");
const postcssImport = require("postcss-import");
const postcssCsso = require("postcss-csso");
const postcssMinMax = require("postcss-media-minmax");
const replace = require("gulp-replace");

const rollup = require("rollup");
const babel = require("@rollup/plugin-babel");
const resolve = require("@rollup/plugin-node-resolve");
const terser = require("@rollup/plugin-terser");

/**
 * Processing CSS
 */

const getPostcssTask = () =>
	postcss([postcssImport, postcssCsso, postcssMinMax]);

gulp.task("styles::base::postcss", () => {
	return gulp
		.src("../src/styles/styles.css")
		.pipe(getPostcssTask())
		.pipe(gulp.dest("../dist/styles"));
});

gulp.task("styles::inline", () => {
	return gulp
		.src("../dist/**/*html")
		.pipe(
			replace(
				/<link rel="stylesheet" href="\/styles\/styles.css"*>/,
				() => {
					const styles = fs.readFileSync("../dist/styles/styles.css");

					return `<style>${styles}</style>`;
				}
			)
		)
		.pipe(gulp.dest("../dist"));
});

gulp.task("styles::schemes::postcss", () => {
	return gulp
		.src("../src/styles/schemes/*.css")
		.pipe(getPostcssTask())
		.pipe(gulp.dest("../dist/styles/schemes"));
});

/**
 * Processing JS
 */

gulp.task("scripts", () => {
	return rollup
		.rollup({
			input: "../src/scripts/scripts.js",
			output: {
				file: "../dist/scripts/scripts.js",
				format: "iife",
			},
			plugins: [
				resolve(),
				babel({
					root: process.cwd(),
				}),
				terser(),
			],
		})
		.then((bundle) => {
			return bundle.write({
				file: "../dist/scripts/scripts.js",
				format: "iife",
			});
		});
});

/**
 * Maybe shouldn't copy on build stage and copy only inside docker file
 */
// gulp.task("copy-sites", () => {
// 	return gulp.src("sites/**/*.*").pipe(gulp.dest("../dist/sites"));
// });

gulp.task("clean", () => {
	return rimraf(["../dist/styles/styles.css"], {
		glob: true,
	});
});

gulp.task(
	"build",
	gulp.series(
		"styles::base::postcss",
		"styles::schemes::postcss",
		"styles::inline",
		"scripts",
		// "copy-sites",
		"clean"
	)
);
