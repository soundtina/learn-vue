import _ from 'lodash';
var simpleI18n = {
    install(Vue,options){
        var translateLib = options.translateLib;
        //注入全局的mixin用于观测网站语言的修改
        Vue.mixin({
            data: function(){
                return {
                    'language_':'CN'
                }
            },
            watch:{
                language_(val){
                    this.$broadcast('vue:__changeLanguage',val);
                }
            }
        });

        Vue.directive('translate', {
            update (value) {
                this.el.innerHTML = _.get(translateLib,`${this.vm.language_}.${value}`,value) ;
                this.vm.$on('vue:__changeLanguage',(lang) => {
                    this.el.innerHTML = _.get(translateLib,`${lang}.${value}`,value) ;
                    return true;
                });
            }
        })

    }
}

export default simpleI18n;
