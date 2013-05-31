var feedparser = require('../../node_modules/feedparser');

exports.getData = function (tag,callback) {
    feedparser.parseUrl('http://instagram.com/tags/'+tag+'/feed/recent.rss').on('complete',callback);
};