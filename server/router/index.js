import KoaRouter from 'koa-router'

const router = new KoaRouter()

router
  .get('/', (ctx, next) => {
    return ctx.render('index')
  })

export default router
