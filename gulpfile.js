var gulp           = require('gulp'),
    gutil          = require('gulp-util'),
    sass           = require('gulp-sass'),
    browserSync    = require('browser-sync'),
    concat         = require('gulp-concat'),
    uglify         = require('gulp-uglify'),
    cleanCSS       = require('gulp-clean-css'),
    rename         = require('gulp-rename'),
    del            = require('del'),
    imagemin       = require('gulp-imagemin'),
    pngquant       = require('imagemin-pngquant'),
    cache          = require('gulp-cache'),
    autoprefixer   = require('gulp-autoprefixer'),
    fileinclude    = require('gulp-file-include'),
    gulpRemoveHtml = require('gulp-remove-html'),
    bourbon        = require('node-bourbon'),
    rigger         = require('gulp-rigger');


gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'dist',
			proxy: 'begin'
		},
		notify: false
	});
});


gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass({
			includePaths: bourbon.includePaths
		}).on('error', sass.logError))
		//.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 5 versions'], { cascade: true }))
		//.pipe(cleanCSS())
		.pipe(gulp.dest('app/css'))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({stream: true}));
});


gulp.task('css-libs', function(){
	return gulp.src([
			'app/libs/normalize-css/normalize.css',
			//'app/libs/magnific-popup/dist/magnific-popup.css',
			//'app/libs/owl.carousel/dist/assets/owl.carousel.min.css',
			//'app/libs/owl.carousel/dist/assets/owl.theme.default.min.css',
			//'app/libs/bootstrap/dist/css/bootstrap.min.css'
		])
		.pipe(concat('libs.min.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest('app/css'))
		.pipe(gulp.dest('dist/css'));
});


gulp.task('js-libs', function(){
	return gulp.src([
		'app/libs/jquery/dist/jquery.slim.min.js',
		'app/libs/device.js/lib/device.min.js',
		//'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
		//'app/libs/owl.carousel/dist/owl.carousel.js',
		//'app/libs/bootstrap/bootstrap.min.js'
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))
		.pipe(gulp.dest('dist/js'));
});


gulp.task('js', function(){
	return gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.reload({stream: true}));
});


gulp.task('html', function(){
	return gulp.src('app/*.html')
		.pipe(rigger())
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({stream: true}));
});


gulp.task('watch', ['sass', 'css-libs', 'js-libs', 'html', 'js', 'browser-sync'], function(){
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/**/*.html', ['html']);
	gulp.watch('app/*.php', browserSync.reload);
	gulp.watch('app/js/**/*.js', ['js']);
});


gulp.task('imagemin', function(){
	return gulp.src('app/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img')); 
});


gulp.task('buildhtml', function(){
  gulp.src(['app/*.php'])
    .pipe(fileinclude({
      prefix: '@@'
    }))
    .pipe(gulpRemoveHtml())
    .pipe(gulp.dest('dist'));
});


gulp.task('removedist', function(){ return del.sync('dist'); });
gulp.task('clearcache', function(){ return cache.clearAll(); });


gulp.task('build', ['removedist', 'buildhtml', 'imagemin', 'sass', 'css-libs', 'js-libs', 'html'], function(){

	var buildCSS = gulp.src('app/css/**/*')
		.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	var buildJS = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'));

});


gulp.task('default', ['watch']);
