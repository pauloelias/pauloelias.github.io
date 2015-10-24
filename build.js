var Metalsmith    = require('metalsmith'),
    archive       = require('metalsmith-archive'),
    autoprefixer  = require('metalsmith-autoprefixer'),
    collections   = require('metalsmith-collections'),
    define        = require('metalsmith-define')
    drafts        = require('metalsmith-drafts'),
    inPlace       = require('metalsmith-in-place'),
    jade          = require('metalsmith-jade'),
    layouts       = require('metalsmith-layouts'),
    markdown      = require('metalsmith-markdown'),
    pagination    = require('metalsmith-pagination'),
    permalinks    = require('metalsmith-permalinks'),
    snippet       = require('metalsmith-snippet'),
    lodash        = require('lodash'),
    highlighter   = require('highlighter');


Metalsmith(__dirname)
  .source('_src')
  .use(drafts())
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
    moment: require('moment')
  }))
  .use(collections({
    articles: {
      perPage: 7,
      pattern: 'articles/**/*.md',
      sortBy: 'date',
      reverse: true,
      pageMetadata: {
        'title': 'Archive'
      }
    }
  }))
  .use(snippet())
  .use(permalinks({
    pattern: ':collection/:year/:month/:day/:title'
  }))
  .use(markdown({
    smartypants: true,
    gfm: true,
    tables: true,
    highlight: highlighter()
  }))
  .use(layouts({
    engine: 'jade',
    directory: '_views/layouts',
    partials: '_views/partials',
    pattern: '*.jade'
  }))
  .use(inPlace({
    engine: 'jade',
    partials: '_views/partials',
    pattern: '*.jade'
  }))
  .destination('_dist')
  .build(function(err) {
    if (err) console.log(err);
  });