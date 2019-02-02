const Router = require('koa-router')
const router = new Router()

router.get('/', async ctx => {
        if (ctx.originalUrl === '/' && ctx.session.auth == undefined) {
            ctx.response.redirect(`/install`)
        } else {
            ctx.response.body=`
            <!DOCTYPE html>
                <html>

                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                    <title>Shopify Node App</title>
                </head>

                <body>
                    <div id="root"></div>
                    <noscript>
                        You need to enable JavaScript to run this app.
                    </noscript>
                    <script src="/dist/main.js"></script>
                </body>

                </html>
            `
        }
})

module.exports = router.routes()