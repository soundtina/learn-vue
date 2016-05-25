var ajaxPlugin = {
    install(Vue, options) {
        Vue.prototype.$getJson = function(url) {
            console.log(url);
        }
    }
}
export  {ajaxPlugin};
