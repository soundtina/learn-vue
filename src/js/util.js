function _showmsg(content, onClose) {
    let title = '启禀皇上:'
    var mynotify = new Notification(title, {
        body: content,
        icon: 'http://q4.qlogo.cn/g?b=qq&k=icUjVAN5Ja7BCDQ1ICl8Svw&s=40',
        tag: 1
    });
    mynotify.onshow = function() {
        setTimeout(function() {
            mynotify.close();
        }, 5000);
    }
    mynotify.onclick = function() {
        mynotify.close();
        // window.location.href = "http://www.baidu.com";
    }
    mynotify.onclose = function() {
        if (typeof onClose === 'function') {
            onClose(mynotify);
        }
        //可以在这里做一些有意义的事情，比如记录显示通知的次数
        // document.write('ss');
    }
}
export default {
    uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    pushNotification(msg, onClose) {
        if (window.Notification) {
            var notification = window.Notification;
            if (notification.permission == "granted") {
                //创建通知
                _showmsg(msg, onClose);
            }
            //判断许可状态
            else if (notification.permission == "default") {
                /*
                如果用户从未设置过此网站的桌面提醒状态(可能是第一次访问这个网站，或者以前允许过，
                但是在通知-例外中删除掉了)，则调用requestPermission方法，让用户选择是否允许桌面提醒
                */
                notification.requestPermission(function(permission) {
                    //在回掉函数中判断用户的选择,在这里不用为“拒绝”选项编写代码，因为既然拒绝，就什么都不做了，
                    // 也不用为默认状态编写代码，因为既然已经弹出让用户选择的选项了，就没有所谓的默认状态了。所以只需要处理用户允许的状态就可以了
                    if (permission == "granted") {
                        //创建通知
                        _showmsg(msg, onClose);
                    }
                });
            }
        }
    }
}
