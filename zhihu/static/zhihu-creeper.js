var superagent = require('superagent');
var fs = require('fs');
var zlib = require('zlib');
var cheerio = require('cheerio');
var utils = require('./utils');
var header = require('./setHeader');
var cookie = '';

function getPeople(type, q, callback) {
    header.url.target_url += `?type=${type}&q=${q}`;
    utils
        .getXrsf()
        .then(utils.getLoginCookie);
    superagent
        .get(header.url.target_url)
        .set('Cookie', JSON.stringify(header.cookie))
        .set('User-Agent', header.browserMsg['User-Agent'])
        .end((err, response) => {
            response.setEncoding('utf-8')
            if (err) {
                console.log(err)
            }
            let peopleList = utils.getPeopleInfo(response.text);
            callback(peopleList);
        })
}


module.exports = getPeople;