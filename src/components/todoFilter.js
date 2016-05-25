let template = `
<section>
    <nav>
        <div class="nav-wrapper">
          <ul id="nav-mobile" class="right">
              <template v-for="st in status">
                     <li><a @click="setStatus($index)" v-translate="st"></a></li>
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
            status: ['all', 'done', 'remain']
        }
    },
    methods: {
        setStatus(_status) {
            let statusMap = [null, true, false];
            this.$dispatch('change-status', statusMap[_status]);
        }
    }
}
