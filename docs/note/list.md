
### 1. Koa-v2.x.x 搭配 Webpack-v3.*.* 实现热加载
安装依赖 koa-webpack，配置参考

现在网上有特别多的教程，安装的依赖有 webpack-hot-middleware、webpack-dev-middleware、koa2-hmr-middleware、webpack-koa2-middleware 亲测，不可行，报底层错误

### 2. 内层组件直接绑定方法，如

```javascript
<button onClick={incrementAsync}>Increment Async</button>
```

最终框架会包一层再抛给 Action，这是不合理的，代码报错。需要在方法绑定中再外层包一个函数，如

```javascript
<button onClick={() => incrementAsync()}>Increment Async</button>
```

### 3. 
