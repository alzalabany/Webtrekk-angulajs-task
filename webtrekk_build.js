/* eslint-disable */
var fs = require('fs-extra'),
    ngAnnotate = require('ng-annotate'),
    babel = require("babel-core"),
    UglifyJS = require('uglify-js'),
    glob = require('glob'),
    templatecache = require('ng-templatecache'),
    autoprefixer = require('autoprefixer'),
    postcss      = require('postcss'),
    vendors = [
      "./node_modules/angular/angular.min.js",
      "./node_modules/@uirouter/angularjs/release/angular-ui-router.min.js"
    ],
    vendorCss  = [
      // "./node_modules/bootstrap/dist/css/bootstrap-reboot.min.css",
      "./node_modules/bootstrap/dist/css/bootstrap.min.css",
    ],
    srcDir   = __dirname + '/src',
    dist     = __dirname + '/public/vendor.js',
    distCss  = __dirname + '/public/vendor.css',
    app      = __dirname + '/public/app.js',
    appCss   = __dirname + '/public/app.css',
    index    = srcDir + '/index.html',
    distIndex= __dirname + '/public/index.html';

var babelOptions = {
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 8"]
      }
    }]
  ]
};

var globOptions = {
  cwd:srcDir,
  ignore:[
    '**/*.spec.js',
    '**/*.e2e.js',
    'index.html',
  ]
};


var __PRO__ = !!(process.env.NODE_ENV === 'production' || process.argv[2]==='prod');
var src = '';

function buildVendor(){
  fs.ensureFileSync(dist);
  fs.outputFileSync(dist, vendors.map(File => fs.readFileSync(File, "utf8")).join("\n").replace(/\/\/\# sourceMappingURL=.*.map/g,''));
  console.log('_vendor.js updated');
  // console.log('done concating vendor code');
  fs.ensureFileSync(distCss);
  fs.outputFileSync(distCss, vendorCss.map(File=>fs.readFileSync(File, "utf8")).join("\n").replace(/\/\/\# sourceMappingURL=.*.map/g,'').replace(/sourceMappingURL=.*.map/g,''));
  console.log('_vendor.css updated');
}

function updateIndexHtml() {
  fs.ensureFileSync(distIndex);
  var src = fs.readFileSync(index, "utf8");
  if(__PRO__){
    // run production code... not sure now what it is :D !!
    console.log('..production mode..');
    var p = src.split('<!--START_DEV-->');
    var p2 = p[1].split('<!--END_DEV-->')[1];
    fs.outputFileSync(distIndex, p[0]+p2);
    console.log('index.html updated');
  } else {
    fs.outputFileSync(distIndex, src); // copy as is
    vendors = vendors.map(i=>i.split('.min.js').join('.js')); // include whole file
  }
}

function updateAppJsAndHtml(){
  // prepare $templateCache
  var cache = templatecache({
                  entries: glob.sync('**/*.html', globOptions).map(File=>({
                    content: fs.readFileSync(srcDir+'/'+File, "utf8"),
                    path: '/'+File,
                  })),
                  module: 'webtrekk',
                  standalone: false,
              }).replace(/^\s+|\s+$|\s+(?=\s)/g, "") // not sure if i should remove extra white spaces or not.. if it cause trouble i will remove it
// @@todo in above line u remove \s+, this action need revision, might be dangerious.
cache = `
(function(angular) {
  'use strict';
  ${cache}
})(angular);
`;
console.log('html cached using ngAnnotate');

// prepare app js; and include $templateCache at end;
var src = glob.sync('**/*.js', globOptions).map(File=>fs.readFileSync(srcDir+'/'+File, "utf8")).concat(cache).join("\n");
src = babel.transform(src, babelOptions).code;
src = ngAnnotate(src, {add:true, remove:true}).src;
src = (__PRO__) ? UglifyJS.minify(src) : {code: src};

  if(!src.error && !src.warnings){
    fs.ensureFileSync(app);
    fs.outputFileSync(app, src.code);
    console.log('_app.js updated');
  } else {
    console.log('app.js failed');
    console.log(src);
  }
}

function updateAppCss(){
   // prepare css;
   var css = glob.sync('**/*.css', globOptions).map(File=>fs.readFileSync(srcDir+'/'+File, "utf8")).join("\n")
   fs.ensureFileSync(appCss);
   postcss([ autoprefixer ]).process(css).then(function (result) {
    result.warnings().forEach(function (warn) {
        console.warn(warn.toString());
    });
    fs.outputFileSync(appCss, result.css);
    console.log('_app.css prefixed and updated');
   });
}

function build(skip_vendor){

  updateIndexHtml();

  if(!skip_vendor) buildVendor();

  updateAppJsAndHtml();

  updateAppCss();
}
console.log('Args::'+process.argv);
if(process.argv.length > 2){
  build(process.argv[2]==='skip');
}

module.exports = {
  default: build,
  build,
  updateAppCss,
  updateAppJsAndHtml,
  updateIndexHtml,
  buildVendor,
};
/* eslint-enable */