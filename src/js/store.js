import noticeJob from './notice-job'
const DBUrl = 'https://todoyonghua110.wilddogio.com/todoList';

let Wilddog = require('wilddog');


export default {
    getTodoList(resetTodolist){
        new Wilddog(DBUrl).on('value', (response) => {
            let data = response.val() || {};
            let todoList = [];

            for (const todoId in data) {
                if (!data.hasOwnProperty(todoId) || !data[todoId]) {
                    continue;
                }
                todoList.push(data[todoId]);
            }
            if (typeof resetTodolist === 'function') {
                resetTodolist(todoList);
            }
        }, (errMsg) => {
            console.error(errMsg);
        });
    },
    addListener() {},
    updateTodoInfo(todoInfo){
        return new Promise(function(resolve, reject) {
            new Wilddog(DBUrl).child(todoInfo.id).update(todoInfo, (errMsg) => {
                errMsg ? reject(errMsg) : resolve(true);
            });
        }).then(() => {
            noticeJob(todoInfo)
            return Promise;
        });
    },
    removeTodoInfo(todoInfo) {
        return new Promise(function(resolve, reject) {
            new Wilddog(DBUrl).child(todoInfo.id).set(null, (errMsg) => {
                errMsg ? reject(errMsg) : resolve(true);
            });
        });
    }
}
