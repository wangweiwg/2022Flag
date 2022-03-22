module.exports = () => {
    return async (ctx, next) => {
        console.log(`【log--】{method: ${ctx.request.method}, url: ${ctx.request.url}, header: ${JSON.stringify(ctx.header)}}`);
        if (next) {
            next()
        }
    }
}