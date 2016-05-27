window.ShortestRange = Infinity;
import _ from 'lodash';
import moment from 'moment';
// import store from './store';
import util from './util';

function noticeTheTodo(todoInfo) {
    util.pushNotification(`快去完成：${todoInfo.text}`);
}
function getNeedNoticeTodos(list) {
    return _.orderBy(_.filter(list,(l) => {return !l.noticed}), (todoInfo) => {
        return +moment(todoInfo.time);
    });
}

module.exports = (list) => {
    let notices = getNeedNoticeTodos(_.cloneDeep(list));

    function _noticeJob(noticeTodos, index) {
        if (noticeTodos.length === index) {
            return;
        }
        if (window.noticeJob) {
            clearTimeout(window.noticeJob);
        }
        var _range = (moment(noticeTodos[index].time)).diff(moment());
        if (_range > 0) {
            window.noticeJob = setTimeout(function () {
                noticeTodos[index].noticed = true;
                noticeTheTodo(noticeTodos[index]);
                _noticeJob(noticeTodos, index + 1);
            }, _range);
        }else {
            _noticeJob(noticeTodos, index + 1);
        }
    }

    _noticeJob(notices , 0 );

}
