<template>
    <section>
        <nav>
            <div class="nav-wrapper">
              <ul id="nav-mobile" class="right">
                  <template v-for="st in status">
                         <li :class="{'active':st.actived}"><a @click="setStatus($index)">{{$t(st.title)}}</a></li>
                  </template>
              </ul>
            </div>
          </nav>
    <!--
        <template v-for="st in status">
            <input name="group-status" type="radio" id="todo-{{st}}" @click="setStatus($index)" />
            <label for="todo-{{st}}">{{$t(st)}}</label>
        </template> -->
    </section>
</template>

<script>
export default {
    name: 'TodoFilter',
    data() {
        return {
            status: [
                {
                    title: 'all', actived: true
                }, {
                    title: 'done', actived: false
                }, {
                    title: 'remain', actived: false
                }
            ],
        }
    },
    methods: {
        setStatus(_index) {
            const self = this;
            const status = self.status;

            let statusMap = [null, true, false];

            self.$dispatch('change-status', statusMap[_index]);

            for (let i = 0; i < status.length; i++) {
               status[i].actived = false;
            }

            status[_index].actived = !status[_index].actived;
          }
    }
};
</script>
