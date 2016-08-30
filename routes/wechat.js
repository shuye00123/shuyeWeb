var router = require('express').Router();
// 引用 wechat 库，详细请查看 https://github.com/node-webot/wechat
var wechat = require('wechat');
// 在云引擎 Node.js 环境中使用自定义的环境变量
var token = process.env.token;
var appid = process.env.appid;
var encodingAESKey = process.env.encodingAESKey;
var AppSecret = process.env.AppSecret;
var config = {
  token: token,
  appid: appid,
  encodingAESKey: encodingAESKey
};

var WechatAPI = require('wechat-api');
var api = new WechatAPI(appid,AppSecret);

//router.use('/', wechat(config.token).text(function(message, req, res, next) {
router.use('/', wechat(config,function(message, req, res, next) {
  // message为文本内容
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125035',
  // MsgType: 'text',
  // Content: 'http',
  // MsgId: '5837397576500011341' }
  var keyArray = ['你好', '约吗'];
  var content = message.Content;
  var keyIndex = keyArray.indexOf(content);
  switch (keyIndex) {
    case 0:
      {
        res.reply({
          type: "text",
          content: '您好，大家好才是真的好！'
        });

      }
      break;
    case 1:
      {
        res.reply({
          type: "text",
          content: '不约，不约，叔叔我们不约！'
        });

      }
      break;
    default:
      res.reply({
        type: "text",
        content: '服务器挂掉了，你的要求暂时无法满足……'
      });
      break;
  }
}).middlewarify());

module.exports = router;
