const gulp = require("gulp");
const rimraf = require("rimraf");

const postcss = require("gulp-postcss");
const postcssImport = require("postcss-import");
const postcssCsso = require("postcss-csso");
const postcssMinMax = require("postcss-media-minmax");

gulp.task("styles::postcss", () => {
	return gulp
		.src("src/styles/styles.css")
		.pipe(postcss([postcssImport, postcssCsso, postcssMinMax]))
		.pipe(gulp.dest("dist/styles"));
});

gulp.task("clean", () => {
	return rimraf(["dist/styles"], {
		glob: true,
	});
});

gulp.task("build", gulp.series("clean", "styles::postcss"));
