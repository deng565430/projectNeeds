setTimeout(() => {
  (async function (window, wx) {
    var USERMSG = {}
    await wx.getNetworkType({
      success: function (res) {
        USERMSG.networkType = res.networkType ? res.networkType : null
      }
    })
    await wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        USERMSG.userLocation = res.latitude ? `${res.latitude}|${res.longitude}` : null
      }
    })
    USERMSG.userAgent = navigator && navigator.userAgent
    window.USERMSG = USERMSG
  })(window, window.wx)
}, 1000)