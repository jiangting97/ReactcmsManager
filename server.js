var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');
var path = require('path');
var express = require('express');
var compiler = webpack(config);
var uuid = require('node-uuid');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
var formidable = require('formidable');
var config = JSON.parse(fs.readFileSync(path.join('./config/config.json')));
var mysql = require('mysql');
var request = require('request');
// server = new webpackDevServer(webpack(config));

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: '/'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static(__dirname + '/public'));

var connection = mysql.createConnection(config.mysql);
connection.connect();

var sql = 'SELECT * FROM zhunti_article';

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.post('/upload', function (req, res) {
    console.log("upload");
});

app.get('/getArticleById', function (req, res) {

    request('http://www.lijianzwm.com:8080/article/item/2', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // 打印google首页
        }
    })

});

app.get('/getArticles', function (req, res)  {

    let url =  'http://www.lijianzwm.com:8080/article/list?start=0&num=6';
    console.log( "req.body" + JSON.stringify(req.body));
    request(url, function (error, response, body) {
        if(!error && response.statusCode == 200) {

            console.log(body);
            // res.json(body);
            let data = JSON.parse(body)
            console.log("data = " + data);
            let articles = data.articles;
            console.log(articles);
            res.json(articles);
        }
    })
})

// {
//     "title": "test_title",
//     "type": 1,
//     "category": 1,
//     "content": "test article test article",
//     "summary": "摘要",
//     "permission": 7,
//     "pub_tm": "2017 - 09 - 19 20: 00: 00",
//     "edit_tm": "2017 - 09 - 19 20: 00: 00",
//     "pub_user": "lijian",
//     "edit_user": "jiangting",
//     "audit_user": "shidaming",
//     "stick": 0
// }

app.post('/save-artitle', function (req, res, next) {

    // let url  = 'http://www.lijianzwm.com:8080/admin/article/add?article={%22title%22:%22te23456st_title%22,%22type%22:1,%22category%22:1,%22content%22:%22test%20article%20test%20article%22,%22summary%22:%22%E6%91%98%E8%A6%81%22,%22permission%22:7,%22pub_tm%22:%222017-09-19%2020:00:00%22,%22edit_tm%22:%222017-09-19%2020:00:00%22,%22pub_user%22:%22lijian%22,%22edit_user%22:%22jiangting%22,%22audit_user%22:%22shidaming%22,%22stick%22:0}';

    let url = 'http://www.lijianzwm.com:8080/admin/article/add?article=';
    // let article = '{%22title%22:%22test_title%22,%22type%22:1,%22category%22:1,%22content%22:%22test%20article%20test%20article%22,%22summary%22:%22%E6%91%98%E8%A6%81%22,%22permission%22:7,%22pub_tm%22:%222017-09-19%2020:00:00%22,%22edit_tm%22:%222017-09-19%2020:00:00%22,%22pub_user%22:%22lijian%22,%22edit_user%22:%22jiangting%22,%22audit_user%22:%22shidaming%22,%22stick%22:0}';

    console.log("req body = " + JSON.stringify(req.body));

    let article = encodeURI(JSON.stringify(req.body));
    console.log("article = " + article);
    request.post(url + article, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // 打印google首页
        }
    })

    // request('http://www.lijianzwm.com:8080/article/item/2', function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         console.log(body) // 打印google首页
    //     }
    // })


//     let mysql = config.mysql;
//     console.log("save");
//     let insertSql = 'INSERT INTO zhunti_article (title, content) VALUES (' + req.body.title +"," + JSON.stringify(req.body.content) + ')';
// console.log(insertSql);
//     let sqltest = 'INSERT INTO zhunti_article (title, content) VALUES ( "aa1", "bb")';
//     connection.query(insertSql, function (error, result, fields) {
//         console.log(error)
//         if(error) throw error;
//     } );
//
//     connection.query(sql, function (error, results, fields) {
//         if (error) throw error;
//         console.log('The solution is: ', results[0].id);
//     });
//
//     let result = {
//         result : 'success'
//     }
//     res.json(result);


});
app.post('/file-upload', function (req, res, next) {
    console.log("upload-image");
    //创建上传表单
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置上传目录
    form.uploadDir = 'public/upload/';
    form.keepExtensions = true;
    //文件大小
    form.maxFieldsSize = 10 * 1024 * 1024;
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.send(err);
            return;
        }
        console.log(fields);
        var extName = /\.[^\.]+/.exec(files.file.name);
        var ext = Array.isArray(extName)
            ? extName[0]
            : '';
        //重命名，以防文件重复
        var avatarName = uuid() + ext;
        //移动的文件目录
        var newPath = form.uploadDir + avatarName;
        fs.renameSync(files.file.path, newPath);
        console.log("newPath " + newPath);

        let imageInfo = {
            imageUrl: '',
        };
        imageInfo.imageUrl = 'upload/' + avatarName;

        console.log("imageInfo.imageUrl " + imageInfo.imageUrl);
        res.json(imageInfo);

    });

    // console.log(req.files);
});


app.listen(3000, 'localhost', function (err, result) {
    if (err) {
        return console.log(err);
    } else {
        return console.log("listen 3000");
    }
})


