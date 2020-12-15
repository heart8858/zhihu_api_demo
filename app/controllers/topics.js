const Topic = require('../models/topics')

class TopicsCtl {
    async find(ctx) {
        ctx.body = await Topic.find();
    }
    async findById(ctx) {
        const { fields } = ctx.query;
        const selectFields = fields.split(';').filter(f => f).map(f => " +" + f).join('');
        const topic = await (await Topic.findById(ctx.params.id)).select(selectFields);
        ctx.body = topic;
    }
}

module.exports = new TopicsCtl();