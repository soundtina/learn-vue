<template>
    <section>
        <input  placeholder="{{placeholder}}" v-el:date type="date" class="datepicker">
    </section>
</template>

<script>
require('../js/lib/picker.date.js')


export default {
    name: 'Calendar',
    props: {
        placeholder: String,
        val: Number,
        setDate: Function
    },
    methods:{
        setAllDate(){
            console.log('mmmm Name');
        }
    },
    ready(){
        let vm = this;
        $(this.$els.date).pickadate({
            closeOnSelect: true,
            onSet: function(context) {
                vm.val = context.select;
                console.log('Just set stuff:', context)
            },
            onClose: function(context) {
                console.log('Just close:', context)
            },
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        });
    }
};
</script>
