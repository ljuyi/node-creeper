var request = require('request');
var fs = require('fs');

const fileBasePath = './douban-data/';
var bookCount = 0;
var movieCount = 0;

/**
 * 
 * @param {*公共文件路径} path 
 * @param {*写入文件的数据} data 
 */
function writeFile(path, data) {
    fs.appendFileSync(path, data);
}
function clearFile(path, data) {
    fs.writeFile(path, "", (err) => {});
}
/**
 * 
 * @param {*爬取的url} url 
 * @param {*从爬取的数据中要提取的参数} options 
 */
function getDataByUrl(url, type, e) {
    var req = request(url, (err, response, body) => {
        if (body) {
            body = JSON.parse(body)['subject_collection_items'];
            let data = resolveData(body, options);
            type.count += body.length;
            console.log(`${type.name},${e}: ${type.count}`);
            writeFile(fileBasePath + type.name + '.txt', JSON.stringify(data));
        }

    })
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
var options = ['title', { 'rating': ['count', 'max', 'value'] }, 'info', 'release_date', 'actors', 'directors', 'url'];

(main => {
    clearFile(fileBasePath + 'book.txt', '')
    clearFile(fileBasePath + 'movie.txt', '')
    
    let book = {name: 'book', count: 0};
    let movie = {name: 'movie', count: 0};
    let page = 0;
    bookType.forEach((e, i) => {
        writeFile(fileBasePath + 'book.txt', '');
        while (page < 50) {
            getDataByUrl(url + e + '/items?start=' + page, book, e);
            page += 18;
        }
        page = 0;
    })
    page = 0;
    movieType.forEach((e, i) => {
        writeFile(fileBasePath + 'movie.txt', '');
        while (page < 50) {
            getDataByUrl(url + e + '/items?start=' + page, movie, e);
            page += 18;
        }
        page = 0;
    })
})()