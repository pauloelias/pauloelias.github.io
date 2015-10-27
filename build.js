var Metalsmith    = require('metalsmith'),
    archive       = require('metalsmith-archive'),
    autoprefixer  = require('metalsmith-autoprefixer'),
    // browserSync   = require('metalsmith-browser-sync'),
    collections   = require('metalsmith-collections'),
    define        = require('metalsmith-define'),
    drafts        = require('metalsmith-drafts'),
    // excerpts      = require('metalsmith-excerpts'),
    // inPlace       = require('metalsmith-in-place'),
    ignore        = require('metalsmith-ignore'),
    jade          = require('metalsmith-jade'),
    layouts       = require('metalsmith-layouts'),
    markdown      = require('metalsmith-markdown'),
    pagination    = require('metalsmith-pagination'),
    permalinks    = require('metalsmith-permalinks'),
    snippet       = require('metalsmith-snippet'),
    highlighter   = require('highlighter');

var debug = function(files, metalsmith, done) {
              Object.keys(files).forEach(function (file) {
                var fileObject = files[file];
                console.log("key -------> ", file);
                console.log("value -----> ", fileObject);
              });
            };

Metalsmith(__dirname)
  .source('_app/source')
  .destination('./')
  .clean(false)
  .use(ignore([
    '**/*/.gitkeep',
    '**/*/.DS_Store'
  ]))
  // .use(debug)
  .use(define({
    blog: {
      uri: 'http://iam.pe',
      title: 'Paulo Elias',
      description: 'Hello world.'
    },
    owner: {
      uri: 'http://iam.pe',
      name: 'Paulo Elias'
    },
    moment: require("moment"),
    _:      require('lodash')
  }))
  .use(drafts())
  .use(collections({
    Home: {
      pattern: ''
    },
    articles: {
      perPage: 7,
      pattern: 'articles/**/*.md',
      sortBy: 'date',
      reverse: true,
      pageMetadata: {
        'title': 'Article Archive'
      }
    },
    news: {
      perPage: 7,
      pattern: 'posts/**/*.md',
      sortBy: 'date',
      reverse: true,
      pageMetadata: {
        'title': 'Posts Archive'
      }
    }
  }))
  .use(markdown({
    smartypants: true,
    smartLists: true,
    gfm: true,
    tables: true,
    highlight: highlighter()
  }))
  .use(snippet({
    maxLength: 300,
    suffix: '&hellip;'
  }))
  .use(permalinks({
    pattern: ':collection/:date/:title',
  }))
  // .use(inPlace({
  //   engine: 'jade',
  //   partials: '_app/partials',
  //   pattern: '*.jade'
  // }))
  .use(layouts({
    engine: 'jade',
    directory: './_app/layouts',
    partials: './_app/partials',
  }))
  // .use(browserSync({
  //   server : "./",
  //   files  : ["_app/source/**/*.md", "_app/**/*.jade"]
  // }))
  .build(function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log('Site build complete!');
    };
  });