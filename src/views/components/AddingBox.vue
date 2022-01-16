<template>
    <div>
        <div class="main-title">{{ this.$t("main_title") }}</div>
        <div class="adding-box" :class="isShow ? 'show' : '' ">
            <input id="todo-field" type="text" placeholer="Введіть текст" v-bind:value="valueInput" v-on:input="handlyInput" v-on:keypress.enter="addTask">
            <div class="error" v-if="error">{{ this.$t("error_text") }}</div>
            <div class="btns">
                <button class="btn btn--primary" v-on:click="addTask">{{ this.$t("general.save") }}</button>
                <button class="btn btn--danger" v-on:click="hideAddingBox">{{ this.$t("general.cancel") }}</button>
            </div>
        </div>
        <button class="btn-add" @click="showAddingBox">
            <svg>
                <use xlink:href="#plus" />
            </svg>
        </button>
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
        showAddingBox () {
            this.isShow = true
        },
        hideAddingBox () {
            this.isShow = false
            document.getElementById('todo-field').value="";
        },

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
        max-width: 268px;
        margin: 0 auto;
        text-align: left;
        color: red;
        padding-top: 5px;
        font-size: 12px;
    }
</style>