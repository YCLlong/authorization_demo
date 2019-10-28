Page({
    onLoad(query){
    },
    onShow(query) {
    },

    authLogin() {
        let app = getApp();
        let pageObject = this;

        //请求用户授权，为了得到用户的钉钉帐号的openId，应用方的系统中如果保存有用户的openId,就不需要这一步了
        dd.getAuthCode({
            success: function(res) {
                var authCode = res.authCode;
                //请求后台，获取ZJCA授权地址
                app.request(app.AUTHORIZATION_URL, {authCode:authCode}, function(res) {
                    let data = res.data;
                    if (data.success) {
                        //得到zjca授权地址，跳转到webView界面
                        var zjcaAuthPage = data.data;
                        dd.navigateTo({
                            url: '/pages/auth/auth?zjcaAuthPage=' + encodeURIComponent(zjcaAuthPage)
                        });
                    } else {
                        pageObject.errorMsg(data.data);
                    }
                }, function(res) {
                    pageObject.errorMsg("服务端无响应");
                }, pageObject);
            }
        });
    },

    errorMsg(msg) {
        dd.showToast({
            type: 'exception',
            content: msg,
            duration: 3000,
            
        });
    }
});
