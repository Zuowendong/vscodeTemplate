const myJsTemplate = `
import Vue from "vue";
export default Vue.extend({
    data() {
        return{
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            console.log("init");
        }
    }
})
`
module.exports = myJsTemplate;
