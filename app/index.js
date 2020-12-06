const Koa = require('koa');
const bodyparser = require('koa-bodyparser')
const error = require('koa-json-error');
const parameter = require('koa-parameter');
const mongoose = require('mongoose')
const app = new Koa();
const routing = require('./routes');
const { connectionStr } = require("./config")

mongoose.connect(connectionStr, { useUnifiedTopology: true }, () => {
    console.log('MongoDB连接成功');
});
mongoose.connection.on('error', console.error);

app.use(error({
    postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}));
app.use(bodyparser());
//传入app，在ctx中加入一个方法帮助校验使得可以全局使用
app.use(parameter(app));
routing(app);

app.listen(3000, () => {
    console.log('服务已经启动在3000端口')
})