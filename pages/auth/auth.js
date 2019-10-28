Page({
  data: {
      zjcaAuthPage:''
  },
  onLoad(query) {
      this.setData({
        zjcaAuthPage:query.zjcaAuthPage
      });
  },


  /**
   * 用户在zjca授权界面操作的结果。
   * 当这个函数被调用时，说明用户在ZJCA授权界面上操作完毕，通过 e.detail 可以获得json对象的操作结果
   */
  zjcaAuthResult(e){
      console.info('zjca授权界面返回消息');
      /**
       * data的格式
       * {
       *    success:  boolean
       *    code:     int
       *    msg:      string
       *    data:     json
       * } 
       * 当success = true时，可以得到一个token。应用方需要将这个token传到自己的小程序后台，然后通过后台需要调用zjca提供的接口获取结果
       * 当success = false时，说明授权失败，msg有具体的失败详情。
       * -------------------------
       * |code   |  详情          |
       * -------------------------
       * |0      |  授权成功      |
       * -------------------------
       * |1002   |  其他错误      |
       * -------------------------
       */
     let data = e.detail;

    if(data.success){
        //zjca会返回认证结果的token，将token传到小程序后台，后台再通过接口向zjca拿用户的授权信息
        let authResult = data.data;
        let app = getApp();
        app.request(app.AUTHORIZATION_RESULT_URL,{result:JSON.stringify(authResult)},function(res){
            let resultData = res.data;
            if(resultData.success){
                app.authResult = resultData.data;
                 //跳转到授权成功之后的界面
                dd.redirectTo({
                    url: '/pages/result/result'
                });
            }else{
                dd.showToast({
                    type: 'exception',
                    content: res.data,
                    duration: 3000,
                });
            }
        },null,null);
        
       
    }else{
        /**
         * 发生错误之后（可能是应用方没有权限，或者服务器内部程序错误，或者别的。总之是可能性很小的错误）
         * ZJCA的授权界面会给用户提供友好的错误反馈，应用方可以不做任何操作。
         * 当然，应用方可以进行一些跳转或者别的操作之类
         */
        console.warn("用户授权时出错：" +  JSON.stringify(data));
    }
  }
});
