( function (root) {
  var templateStr = ' <div v-show="needShow">\
    <h2>{{listData.length}}</h2>\
    <ul v-for="list in listData | filterBy filterValue | custFilterEmpty">\
      <li>{{list.text }}</li>\
    <ul>\
  </div>\
  ';

  var todoComponet = {
      data:  function (){
       return {
         needShow: true
       }
     },
      template: templateStr,

      props: {
        filterValue: String ,
        listData: {
          type: Array
        }
      },
      filters: {
        custFilterEmpty: function (value) {
          this.needShow = value.length > 0;
          return value;
        }
      },
      methods:{

        onEdit(toId, value){
          //....
        },
        onDelete(toId, value){
          //....
        }

      }
    };
  root.todoComponet = todoComponet;
})(window);
