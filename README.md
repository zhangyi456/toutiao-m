项目总结

**1.创建项目**

**2.引入字体图标，通过将svg图标上传到icon font网站中 然后 引用**

**3.引入vant 组件**库**

**4.移动端REM的适配（**使用 [lib-flexible]动态设置 REM 基准值（html 标签的字体大小**）**

4.1   npm i amfe-flexible

4.2  在main.js 中引入 import 'amfe-flexible'

4.3  使用 [postcss-pxtorem] 将 `px` 转为 `rem`

4.4  npm install postcss-pxtorem -D

4.5  然后在**项目根目录**中创建 `.postcssrc.js` 文件

module.exports = {
plugins: {
'autoprefixer': {
browsers: ['Android >= 4.0', 'iOS >= 8']
},
'postcss-pxtorem': {
rootValue: 37.5,
propList: ['*']
}
}
}

**配置完毕，重新启动服务**

在这里会遇到一个问题  就是vant 使用的设计方案是375 px 的但是我们的原设计搞是750PX 的所以就造成在引入vant组件的时候导入我们的图片 不会是高清图片 所以这里我们要在 postCSS中去设置 file的值  所以就有如下代码：

// 配置使用 postcss-pxtorem 插件
// 作用：把 px 转为 rem
'postcss-pxtorem': {
rootValue ({ file }) {
return file.indexOf('vant') !== -1 ? 37.5 : 75
},

配置完毕，把服务重启一下，最后测试

**在清理页面的时候 要注意不能要路由出口 给他删掉  **
