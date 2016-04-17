let _ = require('lodash');
let todoList = [
    {
        id: 1,
        text:'修改智慧芽线上BUG',
        done: true
    }, {
        id: 7,
        text:'搭建3.24测试环境',
        done: true
    }, {
        id: 2,
        text:'出席白宫晚宴',
        done: false
    }, {
        id: 3,
        text:'准备亚太峰会的演讲稿',
        done: false
    }, {
        id: 4,
        text:'筛选两会的提案',
        done: false
    }, {
        id: 5,
        text:'汇款50亿美元给比尔盖茨救急',
        done: false
    }, {
        id: 6,
        text:'收拾去火星的行李',
        done: false
    }
];

export default {
    getTodoList(){
        return _.cloneDeep(todoList);
    },
    updateTodoInfo(tinfo){
        let todoIndex = _.findIndex(todoList,['id', tinfo.id]);
        if (~todoIndex) {
            todoList[todoIndex] = tinfo;
            return true;
        }
        return false;
    },
    addTodoInfo(tinfo){
        todoList.push(tinfo);
        return 'true';
    }
}
