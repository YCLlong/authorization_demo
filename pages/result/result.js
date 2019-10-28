Page({
  data: {},
  onLoad() {
      let authResult = getApp().authResult;
      this.setData({
          authResult:authResult
      });
  },
});
