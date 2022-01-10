<template>
  <div>
        <svg style="display: none" xmlns="http://www.w3.org/2000/svg" >
            <symbol id="plus" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <line x1="7" y1="4.37114e-08" x2="7" y2="14" stroke-width="2"/>
                <line y1="7" x2="14" y2="7" stroke-width="2"/>
            </symbol>
        </svg>
        <div class="container">
            <div class="main-title">Назва заголовка</div>
            <button class="btn-add">
                <!-- <use xlink:href="#plus"></use> -->
                
                <svg id="plus" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <line x1="7" y1="4.37114e-08" x2="7" y2="14" stroke-width="2"/>
                    <line y1="7" x2="14" y2="7" stroke-width="2"/>
                </svg>
            </button>
            <hr>
            <input type="text" placeholer="Введіть текст" v-bind:value="valueInput" v-on:input="handlyInput" v-on:keypress.enter="addTask">
            <div class="btns">
                <button class="btn btn--primary" v-on:click="addTask">Зберегти</button>
                <button class="btn btn--danger">Скасувати</button>
            </div>
            <hr>
            <div class="title">Список карток</div>
            <ul class="list">
                <li v-for="(mask, index) in needDoList" :key="mask.id" class="list__item">
                    <label>
                        <input type="checkbox" v-on:change="doCheck(index, 'need')">
                        <span>{{ mask.title }}</span>
                    </label>
                    <button v-on:click="removeMask(index, 'need')">Видалити</button>
                </li>
            </ul>
            <hr>
            <div class="acc">
                <div class="acc__title">{{ completeList.length }} пунктів виконано</div>
                <ul class="acc__content">
                    <li v-for="(mask, index) in completeList" :key="mask.id" v-on:click="doCheck(index, 'complete')" class="done-item">{{ mask.title }}</li>
                </ul>
            </div>
        </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                valueInput: '',
                needDoList: [],
                completeList: []
            };
        },
        methods: {
            handlyInput (event) {
                this.valueInput = event.target.value;
            },
            addTask () {
                if(this.valueInput === '') { return }
                this.needDoList.push({
                    title: this.valueInput,
                    id: Math.random()
                });
                this.valueInput = '';
            },
            doCheck (index, type) {
                if(type === 'need') {
                    const completeMask = this.needDoList.splice(index, 1);
                    this.completeList.push(...completeMask);
                }
                else {
                    const noCompleteMask = this.completeList.splice(index, 1);
                    this.needDoList.push(...noCompleteMask);
                }
            },
            removeMask (index, type) {
                const toDoList = type === 'need' ? this.needDoList : this.completeList;
                toDoList.splice(index, 1);
            }
        }
    }

</script>

<style>

</style>
