const DBUrl = 'https://todoyonghua110.wilddogio.com/todoList';

let Wilddog = require('wilddog');
export default {
    getTodoList(){
        let _todoPromise = new Promise(function(resolve, reject) {
            let ref = new Wilddog(DBUrl);
            ref.once('value',(data)=>{
                resolve(data.val())
            },(errorObj) =>{
                reject(errorObj);
            });
        });
        return _todoPromise;
    },
    updateTodoInfo(key , tinfo){
        let _todoPromise = new Promise(function(resolve, reject) {
            let ref = new Wilddog(DBUrl);
            ref.child(key.toString()).set(tinfo,(err) => {
                if (err) {
                    reject(err);
                }else {
                    resolve(true);
                }
            });
        });
        return _todoPromise;
    }
}
