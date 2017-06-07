var superagent = require('superagent');
var cheerio = require('cheerio');

var getXrsf = function () {
    return new Promise((resolve, reject) => {
        superagent.get(header.url.url).end(function (err, res) {
            if (!err) {
                var $ = cheerio.load(res.text);
                header.loginMsg._xsrf = $('[name=_xsrf]').attr('value');
                resolve();
            } else {
                console.log(err);
            }
        });
    })
}

var getLoginCookie = function () {
    return new Promise((resolve, reject) => {
        superagent.get(header.url.login_url).set('User-Agent', header.browserMsg['User-Agent']).send(header.loginMsg).redirects(0).end((err, response) => {
            if (!err) {
                header.cookie = response.headers['set-cookie'];
                resolve();
            } else {
                console.log(err);
            }
        });
    })
}

var getFollower = function () {
    return new Promise((resolve, reject) => {
        superagent.get(header.url.target_url).set('Cookie', JSON.stringify(header.cookie)).set('User-Agent', header.browserMsg['User-Agent']).end((err, response) => {
            if (err) {
                console.log(err)
            } else {
                var $ = cheerio.load(response.text);
                var array = $('#zh-favlist-following-wrap .zm-item');
                console.log('收藏夹标题' + ' ' + '收藏人数');
                if (array && array.length > 0) {
                    array.each(() => {
                        console.log($(this).find('.zm-item-title>a').text() + ' ' + ($(this).find('.zg-num').text() ? $(this).find('.zg-num').text() : '0'))
                    })
                }
                resolve();
            }
        })
    })
}

function People() {
    this.avatar = '';
    this.name = '';
    this.sex = '';
    this.bio = '';
    this.answer = '';
    this.posts = '';
    this.followers = '';
}

var getPeopleInfo = function (html) {
    var $ = cheerio.load(html);
    var people = [];
    let list = $('.list.users').find('li.item');
    list.each((i, e) => {
        let peo = new People();
        let content = list.eq(i).find('div.content');
        let gird = list.eq(i).find('div.extra div.grid');
        let body = content.find('div.body');
        peo.avatar = list.eq(i).find('div.content').find('a.avatar-link img').attr('src');
        peo.name = body.find('a.name-link').html();
        peo.sex = (body.find('i').attr('title') === '她') ? '女' : '男';
        peo.bio = body.find('span.bio').html();
        peo.answer = gird.find('a.col').eq(0).find('strong').html();
        peo.posts = gird.find('a.col').eq(1).find('strong').html();
        peo.followers = gird.find('a.col').eq(2).find('strong').html();
        people.push(peo);
    })
    return JSON.stringify(people);
}

module.exports = {
    getXrsf,
    getLoginCookie,
    getFollower,
    getPeopleInfo
}