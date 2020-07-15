//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  getPhoneNumber (e) {

    console.log(e)
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)

      // 登录
      wx.login({
        success: res => {
          console.log(res)
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session', //仅为示例，并非真实的接口地址
            method:'get',
            data: {
              appid:'',
              secret:'',
              js_code:res.code,
              grant_type:'authorization_code'
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success (res) {
              console.log('获取到session_id为')
              console.log(res.data)
              wx.request({
                url: 'localhost:3000/getPhoneNumber', //仅为示例，并非真实的接口地址
                method:'get',
                data: {
                  appId:'',
                  sessionKey:res.data.session_key,
                  encryptedData:e.detail.encryptedData,
                  iv:e.detail.iv
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success (res) {
                  console.log('获取到session_id为')
                  console.log(res.data)
                  
                }
              })
            }
          })
        }
      })
  }
})
