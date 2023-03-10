const fs = require("fs");

const gulp = require("gulp");
const rimraf = require("rimraf");

const postcss = require("gulp-postcss");
const postcssImport = require("postcss-import");
const postcssCsso = require("postcss-csso");
const postcssMinMax = require("postcss-media-minmax");

const replace = require("gulp-replace");

const babel = require("gulp-babel");
const browserify = require("gulp-browserify");
const uglify = require("gulp-uglify");

gulp.task("styles::postcss", () => {
	return gulp
		.src("src/styles/styles.css")
		.pipe(postcss([postcssImport, postcssCsso, postcssMinMax]))
		.pipe(gulp.dest("dist/styles"));
});

gulp.task("styles::inline", () => {
	return gulp
		.src("dist/**/*html")
		.pipe(
			replace(
				/<link rel="stylesheet" href="\/styles\/styles.css"*>/,
				() => {
					const styles = fs.readFileSync("dist/styles/styles.css");

					return `<style>${styles}</style>`;
				}
			)
		)
		.pipe(gulp.dest("dist"));
});

gulp.task("scripts::compress", () => {
	return gulp
		.src("dist/scripts/scripts.js")
		.pipe(
			babel({
				presets: ["@babel/preset-env"],
			})
		)
		.pipe(browserify())
		.pipe(uglify())
		.pipe(gulp.dest("dist/scripts"));
});

gulp.task("clean", () => {
	return rimraf(
		[
			"dist/styles/blocks",
			"dist/styles/*.css",
			"dist/styles/common",
			"dist/scripts/!(scripts.js)",
		],
		{
			glob: true,
		}
	);
});

gulp.task(
	"build",
	gulp.series(
		"styles::postcss",
		"styles::inline",
		"scripts::compress",
		"clean"
	)
);
