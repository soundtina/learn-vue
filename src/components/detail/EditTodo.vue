<template>
    <div>
        <div @click="closeEdit" class="black-bg"></div>
        <div>
            <section class="edit-todo">
                <div class="edit-title bg-{{todoItem.color}}">Edittodo</div>
                <div class="types">
                    <div class="fixed-action-btn horizontal select-type">
                        <a class="btn-floating btn-large  bg-{{todoItem.color}}">
                            <i class="large material-icons">mode_edit</i>
                        </a>
                        <ul>
                            <li @click=changeColor("red")><a class="btn-floating red"><i class="material-icons"></i></a></li>
                            <li @click=changeColor("yellow")><a class="btn-floating yellow darken-1"><i class="material-icons"></i></a></li>
                            <li @click=changeColor("green")><a class="btn-floating green"><i class="material-icons"></i></a></li>
                            <li @click=changeColor("blue")><a class="btn-floating blue"><i class="material-icons"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <form class="col s12">
                        <div class="row">
                            <div class="input-field col s12">
                                <input v-model="todoItem.text" lazy @keyup.enter="saveTodo" type="text" class="validate" placeholder="Title">
                            </div>
                        </div>
                        <div class="input-field col s12">
                          <date-time-picker :times="todoItem.times" :update-times="onUpdateTimes"></date-time-picker>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <textarea v-model="todoItem.content" class="materialize-textarea" length="360" placeholder="content"></textarea>
                            </div>
                        </div>

                        <div class="center-align">
                            <button class="btn waves-effect waves-light bg-{{todoItem.color}}" type="submit" name="action" @click="saveAndClose">Submit
                                <i class="material-icons right">send</i>
                            </button>
                        </div>

                    </form>
                </div>

            </section>
        </div>
    </div>
</template>


<script>
    import _ from 'lodash';
    import {
        updateTodoById as updateTodoByIdAction,
        setTopMsg as setTopMsgAction,
        updateEditmode as updateEditmodeAction
    } from '../../vuex/actions.js';
    import {
        getEditMode,
    } from '../../vuex/getters.js';
    import DateTimePicker from '../lib/DateTimePicker.vue';

    const initTodo = {
        id: null,
        text: '',
        content:'',
        done: false,
        time: '',
        color:'red'
    };
    export default {
        name: 'EditTodo',
        vuex: {
            actions: { updateTodoByIdAction, setTopMsgAction ,updateEditmodeAction}
        },
        props:{
          todoItem: {
              type: Object,
              default() {
                  return _.cloneDeep(initTodo).id;
              }
          },
        },
        data() {
            return {
                color:'red'
            };
        },
        methods: {
            onUpdateTimes(times) {
                todoItem.times = times;
                // console.log('v = ', v);
            },
            closeEdit(){
              this.$dispatch('closeEdit')
            },
            saveTodo(){
                const self = this;
                if (_.isEmpty(self.todoItem.text)) {
                    self.$els.editinput.focus();
                    return;
                }
                self.updateTodoByIdAction(self.todoItem).then(function(isNew) {
                    self.setTopMsgAction(isNew ? '新增成功' : '更新成功');
                }, function(errMsg) {
                    self.setTopMsgAction(errMsg);
                });
            },
            saveAndClose(){
              this.saveTodo();
              this.closeEdit();
            },
            changeColor(color){
              this.todoItem.color=color;
              this.saveTodo();
            }
        },
        components: { DateTimePicker }
    };
</script>
<style>
    .select-type {
        position: absolute;
        right: 20px;
        top: -25px;
        /*transform: translate3d(-50%,0,0);*/
    }
    .fixed-action-btn.horizontal ul li {
    display: inline-block;
    margin: 8px 10px 0 0;
}

.btn-floating{
  box-shadow: none;
}
.btn-floating:hover{
  box-shadow: none;
}

    .edit-title {
        text-align: center;
        line-height: 3;
        color: #fff;
        font-size: 24px;
        transition: .5s;
    }

    .black-bg {
        background-color: rgba(0, 0, 0, 0.6);
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    .edit-todo {
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        min-height: 500px;
        width: 540px;
        max-height: 600px;
        border-radius: 5px;
        overflow: hidden;
    }

    .input-field {
        max-height: 300px;
        overflow-y: scroll;
    }

    .types {
        position: relative;
        height: 50px;
    }
</style>
