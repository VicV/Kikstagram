var feedparser = require('../../node_modules/feedparser');

exports.getData = function (tag, callback) {
    feedparser.parseUrl('http://instagr.am/tags/'+tag+'/feed/recent.rss ').on('complete',callback).on('error',callback);
};