require('isomorphic-fetch')
require('dotenv').config()

const Koa = require('koa'),
session = require('koa-session'),
shopifyAuth = require('@shopify/koa-shopify-auth').default,
verifyRequest = require('@shopify/koa-shopify-auth').verifyRequest,
views = require('koa-render-view'),
path = require('path'),
securerRutes = require('./routes'),
Router = require('koa-router'),
serve = require('koa2-static-middleware'),
router = new Router(),
app = new Koa(),
{
    SHOPIFY_API_KEY,
    SHOPIFY_SECRET
  } = process.env
app.keys = [ SHOPIFY_SECRET ]

// Rendering Install View html file
router.get('/install', async (ctx) => {
    await ctx.render('install', { title : 'Install' }) 
})
// Serving React dist static files folder
router.get('/dist/*', serve('client/dist'))

app
.use(session(app)) 
.use(shopifyAuth({
        // if specified, mounts the routes off of the given path
        // eg. /shopify/auth, /shopify/auth/callback
        // defaults to ''
        prefix: '/shopify',
        // your shopify app api key
        apiKey: SHOPIFY_API_KEY,
        // your shopify app secret
        secret: SHOPIFY_SECRET,
        // scopes to request on the merchants store
        scopes: ['write_orders, write_products'],
        // set access mode, default is 'online'
        // callback for when auth is completed
        afterAuth(ctx) {
            const { shop, accessToken } = ctx.session
            console.log(`We did it on ${shop} with ${accessToken}`)

            ctx.redirect(`https://${shop}/admin/apps/`)
        }
    })
)
.use(views(path.join(__dirname, '/views')))
.use(router.routes())
.use(
    verifyRequest({
      // path to redirect to if verification fails
      // defaults to '/auth'
      authRoute: '/shopify/auth',
      // path to redirect to if verification fails and there is no shop on the query
      // defaults to '/auth'
      fallbackRoute: '/install'
    })
  )
.use(securerRutes)
module.exports = app