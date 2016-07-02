export default {
    data() {
        return{
            __loadtime : 0
        }
    },
    init: function () {
        this.__loadtime = +Date.now();
    },
    ready(){
        // console.log(this.$options.name + ':'+ (+Date.now() - this.__loadtime));
    }
}
