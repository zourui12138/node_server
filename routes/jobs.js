import express from 'express'
import connection from '../config'
// 文件上传
import multiparty from 'multiparty'
import fs from 'fs'
// 分页查询
import {pagination} from '../commonFun/pagination'

const router = express.Router();

/* GET home page. */
router.get('/getInfo', (req, res) => {
    pagination(req,res);
});

router.post('/api', (req, res) => {
    // 解析 post 请求体 body
    console.log(req.body);
    connection.query('SELECT * FROM test ORDER BY name', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

router.post('/upload',(req,res) => {
    // 文件路径
    let uploadDir = './upload/';
    // 解析一个文件上传
    let form = new multiparty.Form();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = uploadDir;
    //设置单文件大小限制
    form.maxFilesSize = 2 * 1024 * 1024;

    form.parse(req, function(err, fields, files){
        if(files) {
            let data = files.file[0];
            console.log(data);
            //同步重命名文件名
            fs.renameSync(data.path,uploadDir+data.originalFilename);
            res.end('Received files');
        }
    });
});

module.exports = router;
