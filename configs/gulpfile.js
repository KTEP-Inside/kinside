const fs = require("fs");
const path = require("path");

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

gulp.task("scripts", async () => {
	console.log(__dirname, path.resolve("."));

	const bundle = await rollup.rollup({
		input: "../src/scripts/scripts.js",
		output: {
			file: "../dist/scripts/scripts.js",
			format: "iife",
		},
		plugins: [
			resolve(),
			babel({
				babelHelpers: "bundled",
        root: path.resolve('configs')
			}),
			terser(),
		],
	});

	return bundle.write({
		file: "../dist/scripts/scripts.js",
		format: "iife",
	});
});

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
		"clean"
	)
);
