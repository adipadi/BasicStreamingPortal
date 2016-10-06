'use strict';

const gulp = require('gulp');
const del = require('del');
const fs = require('fs');

function cleanDist() {
  return del(['./dist'], { force: true });
}

function cleanPub() {
  return del(['./public'], { force: true });
}

function copyImages() {
  return gulp
    .src('./src/images/**/*')
    .pipe(gulp.dest('./public/images'));
}

function copyVideos() {
  return gulp
    .src('./src/videos/**/*')
    .pipe(gulp.dest('./public/videos'));
}

function copyImageUploadComponent() {
  return gulp
    .src('./node_modules/vimond-web-components/vcc-image-upload-component/dist/image-upload.js')
    .pipe(gulp.dest('./public/javascripts'));
}

function copyNavigation() {
  return gulp
    .src('./lib/fe-pluggable-navigation.js')
    .pipe(gulp.dest('./public/javascripts'));
}

function copyPlayer() {
  return gulp
    .src('./lib/vimond-player-reference.min.js')
    .pipe(gulp.dest('./public/javascripts'));
}

function copyResources() {
  return gulp
    .src('./lib/resources/**')
    .pipe(gulp.dest('./public/resources'));
}

function copyMigration() {
  return gulp
    .src('migration/**/*.*')
    .pipe(gulp.dest('./dist/migration'));
}

function copyLib() {
  return gulp
    .src('./lib/**/*')
    .pipe(gulp.dest('./dist/lib'));
}

function copyServer() {
  return gulp
    .src('src/server/**/*')
    .pipe(gulp.dest('./dist/src/server'));
}

function copyPublic() {
  return gulp
  .src('public/**/*')
  .pipe(gulp.dest('./dist/public'));
}

function copyDist() {
  const sources = [
    'views/**/*.*',
    'package.json',
    'config.js',
    'templates/**/*.*'
  ];
  return gulp
    .src(sources)
    .pipe(gulp.dest('./dist'));
}

function validateBuild(done) {
  const importantFiles = [
    './dist/public/cms/javascripts/bundle.js'
  ];
  importantFiles.forEach(file => {
    try {
      const stat = fs.lstatSync(file);
    } catch (err) {
      done(`The file ${file} is missing from the build. Aborting.`);
    }
  });
  done();
}

exports.cleanall = gulp.parallel(cleanDist, cleanPub);
exports.cleanDist = cleanDist;
exports.cleanPub = cleanPub;
exports.copyImageUploadComponent = copyImageUploadComponent;
exports.copyImages = copyImages;
exports.copyNavigation = copyNavigation;
exports.copyVideos = copyVideos;
exports.copyDist = copyDist;
exports.copyPublic = copyPublic;
exports.copyAll = gulp.series(
  copyResources,
  copyPlayer,
  copyLib,
  copyServer,
  copyPublic,
  copyDist
);
exports.validateBuild = validateBuild;

exports.cleanAndCopy = gulp.series(exports.cleanall, exports.copyAll);
