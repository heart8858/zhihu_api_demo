const Koa = require('koa');
const koaBody = require('koa-body');
const KoaStatic = require('koa-static');
const error = require('koa-json-error');
const parameter = require('koa-parameter');
const path = require('path')
const mongoose = require('mongoose')
const app = new Koa();
const routing = require('./routes');
const { connectionStr } = require("./config")

mongoose.connect(connectionStr, { useUnifiedTopology: true }, () => {
    console.log('MongoDB连接成功');
});
mongoose.connection.on('error', console.error);


app.use(KoaStatic(path.join(__dirname, 'public')));
app.use(error({
    postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}));
app.use(koaBody({
    // 启用支持文件
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, '/public/uploads'),
        // 保留拓展名
        keepExtensions: true,
    }
}));
//传入app，在ctx中加入一个方法帮助校验使得可以全局使用
app.use(parameter(app));
routing(app);

app.listen(3000, () => {
    console.log('服务已经启动在3000端口')
})