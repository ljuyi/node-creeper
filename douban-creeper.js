var request = require('request');
var fs = require('fs');

var query = 'utmwv=5.6.7&utms=4&utmn=784667893&utmhn=www.douban.com&utmt=event&utme=14(26200*80*390*740*0*0*5100*5200)(26213*86*393*742*4*0*5195*5213)8(responsive_view_mode)9(desktop)&utmcs=UTF-8&utmsr=1366x768&utmvp=444x655&utmsc=24-bit&utmul=zh-cn&utmje=0&utmfl=-&utmdt=%E5%85%B3%E4%BA%8E%E4%B9%A6%E5%8D%95%E7%9A%84%E4%B9%A6%20(%E8%B1%86%E7%93%A3)&utmhid=1155380536&utmr=-&utmp=%2Ftag%2F%2525E4%2525B9%2525A6%2525E5%25258D%252595%2Fbook&utmht=1496544808126&utmac=UA-7019765-1&utmcc=__utma%3D30149280.113880206.1496502878.1496502878.1496544779.2%3B%2B__utmz%3D30149280.1496502878.1.1.utmcsr%3D(direct)%7Cutmccn%3D(direct)%7Cutmcmd%3D(none)%3B&utmjid=&utmu=qRMAAA0GAAAAAAAAQAAAAAAE~';
var option = {
    hostname: 'douban.com',
    port: 80,
    method: 'GET',
    headers:
    {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, sdch, br',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Cookie': '',
        'Pragma': 'no-cache',
        'Referer': 'https://www.google.com.hk/',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36'
    }

}
const fileBasePath = './data/';

/**
 * 
 * @param {*公共文件路径} path 
 * @param {*写入文件的数据} data 
 */
function writeFile(path, data) {
    fs.appendFileSync(path, data);
}

/**
 * 
 * @param {*爬取的url} url 
 * @param {*从爬取的数据中要提取的参数} options 
 */
function getDataByUrl(url, info) {
    var req = request(url, (err, response, body) => {
        body = JSON.parse(body);
        let data = resolveData(body['subject_collection_items'], bookOptions);
        writeFile(fileBasePath + info + '.txt', JSON.stringify(data));
    })
    req.setHeader(option);
    req.end();
}

/**
 * 
 * @param {*提取的源对象} body 
 * @param {*提取的参数} options 
 */
function resolveData(body, options) {
    var data = [];
    body.forEach((e, i) => {
        data[i] = {};
        copy(data[i], body[i], options)
    })
    copy(data, body, options);
    return data;
}

/**
 * 
 * @param {*生成的对象} obj1 
 * @param {*被提取的对象} obj2 
 * @param {*提取的参数} param 
 */
function copy(obj1, obj2, param) {
    param.forEach((value, key) => {
        if (typeof value === 'string' || typeof value === 'number') {
            obj1[value] = obj2[value];
        } else {
            if (!value instanceof Array) {
                for (let key in e) {
                    copy(obj1[key], obj2[key], e[key]);
                }
            } else {
                for (let key in value) {
                    obj1[key] = obj2[key];
                }
            }
        }
    })
}

var url = 'https://m.douban.com/rexxar/api/v2/subject_collection/';
// 电影
var movieType = ['movie_showing', 'movie_free_stream', 'movie_latest'];
// 书籍
var bookType = ['book_fiction', 'book_nonfiction', 'filter_book_fiction_hot', 'filter_book_love_hot'];
var bookOptions = ['info', 'release_date', { 'rating': ['count', 'max', 'value'] }, 'title', 'url', 'actors', 'directors'];

(main => {
    let count = 0;
    bookType.forEach((e, i) => {
        getDataByUrl(url + e + '/items?start=' + count, 'book');
    })
    movieType.forEach((e, i) => {
        getDataByUrl(url + e + '/items?start=' + count, 'movie');
    })
    console.log('提取成功');
})()