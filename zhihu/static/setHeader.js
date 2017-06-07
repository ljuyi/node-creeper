var url = {
    url: 'https://www.zhihu.com',
    login_url: 'https://www.zhihu.com/#signin',
    target_url: 'https://www.zhihu.com/search'
}

var browserMsg = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
    'Content-Type':'text/html; charset=UTF-8'
}

var cookie = '';

var loginMsg = {
    email: '981765731@qq.com',
    password: 'xf19961014ljy',
    remember_me: true
}

module.exports = {
    url,
    browserMsg,
    loginMsg,
    cookie
}