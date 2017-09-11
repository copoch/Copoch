import KoaRouter from 'koa-router'
import { register, login } from '../db/models/Account'

const router = new KoaRouter()

router
  .get('/', (ctx, next) => {
    return ctx.render('index', {
      title: ''
    })
  })
  .get('/register', (ctx, next) => {
    return ctx.render('register', {
      title: '注册页面',
      flashMessage: ''
    })
  })
  .post('/register', async (ctx, next) => {
    const {phone, password, confirmPassword} = ctx.request.body

    if (!phone || !password) {
      ctx.throw(400)
      return
    }

    if (password !== confirmPassword) {
      ctx.throw(400, '两次输入密码不一致')
      return
    }

    const {status, message} = await register(phone, password)

    return ctx.render('register', {
      title: '注册页面',
      flashMessage: message
    })
  })
  .get('/login', (ctx, next) => {
    if (!ctx.session.isLogin) {
      ctx.session.isLogin = false
    }

    return ctx.render('login', {
      title: '登录页面',
      flashMessage: '',
      isLogin: ctx.session.isLogin
    })
  })
  .post('/login', async (ctx, next) => {
    const {phone, password} = ctx.request.body

    if (!phone || !password) {
      ctx.throw(400)
      return
    }

    const {status, message} = await login(phone, password)
    const isLogin = status && true || false

    ctx.session.isLogin = isLogin

    return ctx.render('login', {
      title: '登录页面',
      flashMessage: message,
      isLogin
    })
  })

export default router
