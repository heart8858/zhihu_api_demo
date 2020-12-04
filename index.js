const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const userRouter = new Router({ prefix: '/users' });



router.get('/', (ctx) => {
    ctx.body = '这是主页'
});

userRouter.get('/', (ctx) => {
    ctx.body = [{ name: '李雷' }, { name: '韩梅梅' }];
});

userRouter.post('/', (ctx) => {
    ctx.body = { name: '李雷' };
});

userRouter.get('/:id', (ctx) => {
    ctx.body = { name: '李雷' };
});

userRouter.put('/:id', (ctx) => {
    ctx.body = { name: '李雷2' };
});

userRouter.delete('/:id', (ctx) => {
    ctx.status = 204;
});


app.use(router.routes());
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.listen(3000);