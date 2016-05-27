let template = `
<section>
    <nav>
        <div class="nav-wrapper">
          <ul id="nav-mobile" class="right">
              <template v-for="st in status">
                     <li :class="{'active':st.actived}"><a @click="setStatus($index)" v-translate="st.title" ></a></li>
              </template>
          </ul>
        </div>
      </nav>
<!-- 
    <template v-for="st in status">
        <input name="group-status" type="radio" id="todo-{{st}}" @click="setStatus($index)" />
        <label for="todo-{{st}}" v-translate="st"  ></label>
    </template> -->
</section>
`;
export default {
    name: '',
    template: template,
    data() {
        return {
            status: [{title:'all',actived: true}, {title:'done',actived: false}, {title:'remain',actived: false}],
        }
    },
    methods: {
        setStatus(_index) {
            let statusMap = [null, true, false];
            this.$dispatch('change-status', statusMap[_index]);
            for (var i = 0; i < this.status.length; i++) {
               this.status[i].actived = false;
            }
            this.status[_index].actived = !this.status[_index].actived;
          }
    }
}
