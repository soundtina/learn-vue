import noticeJob from './notice-job'
const DBUrl = 'https://todoyonghua110.wilddogio.com/todoList';

let Wilddog = require('wilddog');


export default {
    getTodoList(){
        return new Promise(function(resolve, reject) {
            new Wilddog(DBUrl).once('value', (response) => {
                let data = response.val() || {};
                let todoList = [];

                for (const todoId in data) {
                    if (!data.hasOwnProperty(todoId) || !data[todoId]) {
                        continue;
                    }
                    todoList.push(data[todoId]);
                }
                // debugger
                resolve(todoList);
                // new Wilddog(DBUrl).set({});
            }, (errMsg) => {
                reject(errMsg);
            });
        });
    },
    addListener() {},
    updateTodoInfo(todoInfo){
        return new Promise(function(resolve, reject) {
            new Wilddog(DBUrl).child(todoInfo.id).update(todoInfo, (errMsg) => {
                errMsg ? reject(errMsg) : resolve(true);
            });
            // new Wilddog(DBUrl).child(key.toString()).set(tinfo,(err) => {
            //     if (err) {
            //         reject(err);
            //     }else {
            //         resolve(true);
            //     }
            // });
        }).then(() => {
            // noticeJob(this.todoList)
            console.log(1111);
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
