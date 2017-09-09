/**
 * Created by lijian on 2017/8/1.
 */

var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');
var path = require('path');
var express = require('express');
var compiler = webpack(config);
var uuid = require('node-uuid');
var fs = require('fs');
var app = express();
var formidable = require('formidable');
// server = new webpackDevServer(webpack(config));


app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: '/'
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static(__dirname + '/public'));
// app.use(express.static('/src'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.post('/upload', function (req, res) {
    console.log("upload");
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
        imageInfo.imageUrl = 'upload/'+ avatarName;

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


