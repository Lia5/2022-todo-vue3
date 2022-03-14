<template>
    <div>
        <div class="main-title">{{ this.$t("main_title") }}</div>
        <div class="adding-box show">
            <div class="adding-box__line">
                <input id="todo-field" type="text" :placeholder="this.$t('new_task')" v-bind:value="valueInput" v-on:input="handlyInput" v-on:keypress.enter="addTask">
                <button class="btn-add btn btn-primary" v-on:click="addTask">
                    <svg>
                        <use xlink:href="#plus" />
                    </svg>
                </button>
            </div>

            <div class="error" v-if="error">{{ this.$t("error_text") }}</div>

            <hr>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AddingBox',
    data() {
        return {
            valueInput: '',
            isShow: false,
            error: false
        }
    },
    methods: {
        // hideAddingBox () {
        //     this.isShow = false
        //     document.getElementById('todo-field').value="";
        // },

        handlyInput (event) {
            this.valueInput = event.target.value;
        },
        addTask () {
            if(this.valueInput === '') { 
                this.error = true;
                return 
            }
            this.emitter.emit('addTaskItem', this.valueInput);
            this.valueInput = '';
            this.error = false;
        },
    }
}
</script>
<style lang="scss">
    .error {
        width: 100%;
        text-align: left;
        color: red;
        padding-top: 5px;
        font-size: 12px;
    }
</style>