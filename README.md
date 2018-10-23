# hbcx

> 这是一个航班查询系统

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


mongodb 版本回滚到2.2.33


这个航班查询是基于原生的mongo和express写的，mongo连接写在conn.js里面，由于接口较少，所有的路由写在app.js里面
