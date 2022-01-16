<template>
    <div>
        <div class="main-title">{{ this.$t("main_title") }}</div>
        <div class="adding-box">
            <input id="todo-field" type="text" placeholer="Введіть текст" v-bind:value="valueInput" v-on:input="handlyInput" v-on:keypress.enter="addTask">
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

        }
    },
    props: ['needDoList'],
    methods: {
        showAddingBox () {
            document.querySelector('.adding-box').classList.add('show');
        },
        hideAddingBox () {
            document.querySelector('.adding-box').classList.remove('show');
            document.getElementById('todo-field').value="";
        },

        handlyInput (event) {
            this.valueInput = event.target.value;
        },
        addTask () {
            console.log(this.valueInput);
            if(this.valueInput === '') { return }
            this.emitter.emit('addTaskItem', this.valueInput);
            this.valueInput = '';
        },
    }
}
</script>
<style lang="scss">

</style>