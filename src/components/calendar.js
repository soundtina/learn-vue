let datePicker = require('../js/lib/picker.date.js')
let _template = `<section><input placeholder="{{placeholder}}" v-el:date type="date" class="datepicker"> </section>`;


export default {
    template: _template,
    props: {
        placeholder:String
    },
    ready(){
        $(this.$els.date).pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        });
    }
}
