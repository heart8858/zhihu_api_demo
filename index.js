const Koa = require('koa');
const app = new Koa();


app.use(async (ctx) => {
    if (ctx.url === '/') {
        ctx.body = '这是主页';
    } else if (ctx.url === '/users') {
        if (ctx.method === 'GET') {
            ctx.body = '这是用户列表页';
        } else if (ctx.method === 'POST') {
            ctx.body = '创建用户';
        } else {
            ctx.status = 405;
        }
    } else if (ctx.url.match(/\/users\/\w+/)) {
        const userId = ctx.url.match(/\/users\/(\w+)/)[1];
        ctx.body = `这是用户 ${userId}`;
    }
    else {
        ctx.status = 404;
    }
})

app.listen(3000);