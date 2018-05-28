// 作者：小丶张学友
import createError from 'http-errors'
import express from 'express'
import ejs from 'ejs'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
// node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
import bodyParser from 'body-parser'

// 路由路径
import jobsRouter from './routes/jobs'
import usersRouter from './routes/users'
import ueditorRouter from './routes/ueditor'

const app = express();

// 设置引擎模版
app.engine('html', ejs.__express);
app.set('view engine', 'html');
// 设置模版引擎html路径
app.set('views', path.join(__dirname, 'views'));

// 控制台打印日志
//app.use(logger('dev'));
// 解析 post 请求
app.use(bodyParser.json());
// 加载用于解析 cookie 的中间件
app.use(cookieParser());
// 调用express.static中间件，指定静态资源目录
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', ueditorRouter);
app.use('/jobs', jobsRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
