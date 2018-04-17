const express = require('express');
const router = express.Router();
const url = require('url');
const querystring = require('querystring');

/* GET home page. */
router.get('/', function (req, res, next) {
    // 解析 url 参数
    let params = url.parse(req.url, true).query;
    console.log(params.name);
    console.log(params.url);
    res.render('index');
});

router.post('/api', function (req, res, next) {
    // 定义了一个post变量，用于暂存请求体的信息
    let post = '';

    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', (chunk) => post += chunk);

    // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end', () => {
        post = querystring.parse(post);
        console.log(post);
        res.end(util.inspect(post));
    });
});

module.exports = router;
