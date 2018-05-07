import express from 'express'
import connection from '../config'

// 文件上传
import multiparty from 'multiparty'
import fs from 'fs'
const router = express.Router();
// 分页查询
import {jobs_pagination} from '../commonFun/pagination'
// 分页查询
router.get('/getInfo', (req, res) => jobs_pagination(req,res));
// 根据ID查询信息
router.get('/getInfoById', (req, res) => {
    let id = req.query.id;
    connection.query("SELECT * FROM jobs WHERE id=?",[id], (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});
// 根据ID删除信息
router.delete('/delete', (req, res) => {
    let id = req.query.id;
    connection.query("DELETE FROM jobs WHERE id=?",[id], (error, results) => {
        if (error) throw error;
        let resObj = results.affectedRows ? {code: 200, msg: '删除成功'} : {code: 500, msg: '该条数据已被删除'};
        res.json(resObj);
    });
});
// 根据ID和当前状态修改数据的状态
router.put('/updateStatus', (req,res) => {
    let id = req.body.id, status = req.body.status;
    connection.query("UPDATE jobs SET status = ? WHERE id = ?",[status,id], (error, results) => {
        if (error) throw error;
        let resObj = results.changedRows ? {code: 200, msg: '修改成功'} : {code: 500, msg: '修改失败'};
        res.json(resObj);
    });
});
// 新增招聘信息
router.post('/add', (req,res) => {
    let job = req.body.job,
        department = req.body.department,
        responsibility = req.body.responsibility,
        requirement = req.body.requirement;
    !job && res.json({code:500,msg:'招聘岗位不能为空'});
    !department && res.json({code:500,msg:'招聘部门不能为空'});
    !responsibility && res.json({code:500,msg:'工作职责不能为空'});
    !requirement && res.json({code:500,msg:'任职要求不能为空'});
    connection.query("INSERT INTO jobs (job,department,responsibility,requirement) VALUES (?,?,?,?)",[job,department,responsibility,requirement], (error, results) => {
        if (error) throw error;
        let resObj = results.affectedRows ? {code: 200, msg: '添加成功'} : {code: 500, msg: '添加失败'};
        res.json(resObj);
    });
});
// 根据ID修改当前招聘信息
router.put('/set', (req,res) => {
    let id = req.body.id,
        job = req.body.job,
        department = req.body.department,
        responsibility = req.body.responsibility,
        requirement = req.body.requirement;
    !job && res.json({code:500,msg:'招聘岗位不能为空'});
    !department && res.json({code:500,msg:'招聘部门不能为空'});
    !responsibility && res.json({code:500,msg:'工作职责不能为空'});
    !requirement && res.json({code:500,msg:'任职要求不能为空'});
    connection.query("UPDATE jobs SET job = ?,department = ?,responsibility = ?,requirement = ? WHERE id = ?",[job,department,responsibility,requirement,id], (error, results) => {
        if (error) throw error;
        console.log(results);
        let resObj = results.changedRows ? {code: 200, msg: '修改成功'} : {code: 500, msg: '修改失败'};
        res.json(resObj);
    });
});
// 文件上传
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