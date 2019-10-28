App({
    AUTHORIZATION_URL:'http://60.190.254.12:9003/dd_demo/authLogin/url',
    AUTHORIZATION_RESULT_URL:'http://60.190.254.12:9003/dd_demo/authLogin/result',
    // AUTHORIZATION_URL:'http://127.0.0.1:8080/dd_demo/authLogin/url',
    // AUTHORIZATION_RESULT_URL:'http://127.0.0.1:8080/dd_demo/authLogin/result',
  onLaunch(options) {

  },
  onShow(options) {
   
  },
  /**
     * @param url         :请求的地址
     * @param param       :请求参数，param json对象 
     * @param successFun  :访问成功回调函数,注意，这个函数内不能再调用别的函数，钉钉不支持
     * @param errorFun    :请求失败回调函数，如果是null,那么会打印默认的错误信息 @function showError ，这个函数内不能再调用别的函数。钉钉不支持
     * @param pointer     :调用者对象指针
     */
    request(url, param, successFun, errorFun,pointer) {
        dd.getNetworkType({
            success: (res) => {
                if (!res.networkAvailable) {
                    dd.hideLoading();
                    dd.showToast({
                        type: 'exception',
                        content: '当前网络不可用，请您检查网络状态',
                        duration: 3000,
                    });
                    return;
                }
                if(param == null || param == undefined){
                     param = {};
                }
                console.info(param);
                dd.httpRequest({
                    url: url,
                    method: 'POST',
                    timeout: 6000,
                    data: param,
                    dataType: 'json',
                    success: function(res) {
                        successFun(res);
                        console.info(res);
                    },
                    fail: function(res) {
                        if (errorFun != null) {
                            errorFun(res);
                        } else {
                            dd.hideLoading();
                            dd.showToast({
                                type: 'exception',
                                content: '服务端无响应，请稍后再试',
                                duration: 3000,
                            });
                        }
                    }
                });
            }
        });

    },
});
