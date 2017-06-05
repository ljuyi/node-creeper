var request = require('request');
var fs = require('fs');
var zlib = require('zlib');
var cheerio = require('cheerio');
var cookie = '';

var option = {
    'Request Method': 'GET',
    'Status Code': '200 OK',
    'Remote Address': '118.178.213.186:443',
    'Referrer Policy': 'no-referrer-when-downgrade',
    'uri': 'https://www.zhihu.com/search',
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'deflate, sdch, br',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Connection': 'keep-alive',
        'Cookie': '',
        'Host': 'www.zhihu.com',
        'Referer': 'https://www.zhihu.com/search',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
    }
}

function creeper(type, q, callback) {
    option.uri += `?type=${type}&q=${q}`;
    request(option, (err, res, body) => {
        res.setEncoding('utf-8')
        if (err) console.log(err)
        let peopleList = peopleInfo(body);
        callback(peopleList);
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

function peopleInfo(html) {
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

module.exports = creeper;