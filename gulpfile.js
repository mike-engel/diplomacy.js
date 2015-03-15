var gulp = require( 'gulp' ),
    jscs = require( 'gulp-jscs' ),
    jshint = require( 'gulp-jshint' );

gulp.task( 'jscs', function scriptsJSCSTask() {
    'use strict';

    return gulp.src([ './**/*.js', '!./node_modules/**/*.js' ])
        .pipe( jscs());
});

gulp.task( 'jshint', function scriptsJSHintTask() {
    'use strict';

    return gulp.src([ './**/*.js', '!./node_modules/**/*.js' ])
        .pipe( jshint())
        .pipe( jshint.reporter( 'default' ))
        .pipe( jshint.reporter( 'fail' ));
});

gulp.task( 'default', [ 'jscs', 'jshint' ]);
gulp.task( 'test', [ 'jscs', 'jshint' ]);
