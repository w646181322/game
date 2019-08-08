
const path = require('path')
// 启用热更新 第2步
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const { VueLoaderPlugin } = require('vue-loader')


module.exports = {
  // 入口，表示要使用 webpack 打包哪个文件
  entry: path.join(__dirname,'./src/main.js'),
  // 输出文件相关的配置
  output:{
    path: path.join(__dirname,'./dist'),//指定打包好的文件，输出到哪个目录中
    filename: 'bundle.js' // 这是输出的文件名
  },
  devServer:{// 配置 dev-server 命令参数的第二种形式，相对来说，麻烦一些
    // --open --port 3000 contentBase src --hot
    open: true, // 自动打开浏览器
    port: 3000, // 这只启动时候的运行端口
    contentBase: 'src', // 指定托管的根目录
    hot: true // 启用热更新 第1步
  },
  plugins: [// 配置插件的节点
    new webpack.HotModuleReplacementPlugin(),// new 一个热更新的模块对象 启用热更新 第3步
    new htmlWebpackPlugin({// 创建一个 在内存中生成的 HTML 页面的插件
      template: path.join(__dirname,'./src/index.html'),//指定 模板页面，将来会根据指定页面的路径，去生成内存中的页面
      filename: './index.html'// 指定生成页面的名称
    }),
    new VueLoaderPlugin()
  ],
  module: {// 这个节点 ， 用于配置 所有第三方模板 加载器
    rules: [// 所有第三方模板的匹配规则
      {test: /\.css$/, use: ['style-loader', 'css-loader']},//配置处理 .css文件的第三方loader 规则
      {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},// 处理 less 文件的 loader
      {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},// 处理 scss 文件的 loader
      {test:/\.(jpg|png|gif|bmp|jepg)$/, use: 'url-loader?limit=1024&name=[hash-8]-[name].[ext]'},// 处理 图片路径的 loader
      // limit 给定的值 ，是图片的大小，单位是byte ， 如果我们引用的图片大于或等于 给定的limit值，则不会转化为base64格式
      // 如果图片大小 小于给定的limit 值，则会被转化为 base64的字符串
      {test: /\.(ttf|eot|svg|woff|woff2)$/,use: 'url-loader'},// 处理 字体文件的 loader
      {test: /\.js$/, use: 'babel-loader', exclude:/node_modules/},// 配置 babel 来转化高级的 ES 语法
      {test: /\.vue$/, use: 'vue-loader'}
    ]
  },
  resolve: {
    alias: { // 修改 Vue 被导入时候的包的路径
      "vue$": "vue/dist/vue.js"

    }
  }
}