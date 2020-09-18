
const path = require('path')
const SpritesmithPlugin = require('webpack-spritesmith')
// 连接路径并返回
function resolve(dir) {
    return path.join(__dirname, dir)
}

var templateFunction = function (data) {
  var getRem = function(val) {
    const base = 36;
    return parseInt(val)/base + 'rem'
  }
  var shared = '@mixin icon { background-image: url(I);background-size: W H;}'.replace('I', data.sprites[0].image).replace('W', getRem(data.spritesheet.width))
    .replace('H', getRem(data.spritesheet.height))
  var perSprite = data.sprites.map(function (sprite) {
    return '@mixin icon-N { width: W; height: H; background-position: X Y; }'
      .replace('N', sprite.name)
      .replace('W', getRem(sprite.width))
      .replace('H', getRem(sprite.height))
      .replace('X', getRem(sprite.offset_x))
      .replace('Y', getRem(sprite.offset_y));
  }).join('\n');
  return shared + '\n' + perSprite;
}

module.exports = {
    publicPath:'/',//根路径
    outputDir:'dist',//打包的时候生成的一个文件名
    assetsDir:'assets',//静态资源目录(js,css,img,fonts)这些文件都可以写里面
    lintOnSave:false,//是否开启eslint保存检测 ,它的有效值为 true || false || 'error'
    devServer:{
        open:true,//启动项目后自动开启浏览器
        // host:'192.168.1.103',//对应的主机名 
        // port:8080,//端口号
        // https:false,//是否开启协议名,如果开启会发出警告
        // hotOnly:false,//热模块更新的一种东西,webpack中自动有过配置,但如果我们下载一些新            的模块可以更好的给我更新一些配置
        proxy:{
        //配置跨域
        '/api':{//配置跨域的名字
            target:'http//localhost:5000/api',//跨域的地址
            // ws:true,
            changOrigin:true,//是否跨域
            pathRewrite:{//当前的名字
                '^/api':''
            }
          }
 
        }
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue : 20, // 换算的基数
                        propList   : ['*'],
                    }),
                ]
            }
        }
    },
    // 引用路径重命名
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets/icons'))
            .set('components', resolve('src/components'))
    },
    configureWebpack: config => {
        config.resolve.modules = ['node_modules', './src/assets/'] 
        const Plugins = [
          new SpritesmithPlugin({
            src: {
              cwd: resolve('./src/assets/icons'),
              glob: '*.png'
            },
            target: {
              image: resolve('./src/assets/sprite.png'),
              css: [[resolve('./src/assets/_sprite.scss'), {
                // 引用自己的模板
                format: 'function_based_template'
              }],
              ]
            },
            // 自定义css处理模板
            customTemplates: {
              'function_based_template': templateFunction,
            },
            apiOptions: {
              cssImageRef: '~sprite.png'
            },
            spritesmithOptions: {
              padding: 10
            }
          })
        ]
        config.plugins = [...config.plugins, ...Plugins]
      }
};