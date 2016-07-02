<template>
    <section>
        <input v-el:datetimepicker id="date_time_picker" type="text">
    </section>
</template>

<script>
import _ from 'lodash';

require('./jquery.datetimepicker.full.js');
require('./jquery.datetimepicker.full.css');


export default {
    name: 'DateTimePicker',
    props: {
        times: {
            type: Number,
            coerce(times) {
                // 默认一个小时后提醒
                return _.isNumber(times) && times > 0 ?
                    times :
                    Date.now() + 1000 * 60 * 60;
            }
        },
        updateTimes: {
            type: Function,
            required: true
        }
    },
    ready() {
        const self = this;

        $(self.$els.datetimepicker).datetimepicker({
            value: self.times,
            onClose: function(date, $input) {
                self.updateTimes(date.getTime());
            }
            // opened: true,
            // contentWindow: self.$el
        });

    },
    watch: {
        // isShow(isShow) {
        //     console.log(isShow);
        //     $(this.$els.datetimepicker).datetimepicker({ opened: isShow });
        //     $(this.$els.datetimepicker).datetimepicker(isShow ? 'show' : 'hide');
        // }
    }
};
</script>

<style>
</style>
