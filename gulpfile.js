

"use strict";

	import gulp from "gulp"
	import autoprefixer from "gulp-autoprefixer"
	import exec from "gulp-exec"
	import browserSync from "browser-sync"
	import cp from "child_process"
	import gulpSass from "gulp-sass"
	import nodeSass from "sass"
	import concat from 'gulp-concat'	
	const sass = gulpSass(nodeSass)

//gulp.task("css", function() {
//	return gulp.src( '_assets_scss/**/*.scss' )
//		.pipe( sass().on('error', sass.logError) )
//		.pipe( autoprefixer() )
//		.pipe( gulp.dest( './docs/scss/' ) )
//		.pipe( browserSync.stream({ match: '**/*.css' }) )
//	;
//});

gulp.task("css", function() {
	return gulp.src( '_assets_css/**/*.css' )
		.pipe( autoprefixer() )
		.pipe( gulp.dest( './docs/css/' ) )
		.pipe( browserSync.stream({ match: '**/*.css' }) )
	;
});

// Jekyll
gulp.task("jekyll", function() {
	return cp.spawn("bundle", ["exec", "jekyll", "build"], { stdio: "inherit", shell: true });
});

gulp.task("watch", function() {

	browserSync.init({
		server: {
            baseDir: "./docs/"
		}
	});

	gulp.watch( '_assets_css/**/*.css', gulp.series('css') );
	//gulp.watch( '_assets_scss/**/*.scss', gulp.series('css') );

	gulp.watch(
		[
			"./*.html",
			"./_includes/*.html",
			"./_layouts/*.html",
			"./_posts/**/*.*"
		]
	).on('change', gulp.series('jekyll', 'css') );

	gulp.watch( 'docs/**/*.html' ).on('change', browserSync.reload );
	gulp.watch( 'docs/**/*.js' ).on('change', browserSync.reload );
});

gulp.task("deploy", gulp.series('jekyll', 'css'));
gulp.task("default", gulp.series('jekyll', 'css', 'watch'));

