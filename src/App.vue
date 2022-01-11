<template>
  <div>
        <svg style="display: none" xmlns="http://www.w3.org/2000/svg" >
            <symbol id="plus" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" >
                <line x1="7" y1="4.37114e-08" x2="7" y2="14" stroke-width="2"/>
                <line y1="7" x2="14" y2="7" stroke-width="2"/>
            </symbol>
            <symbol id="cross" xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" >
                <line x1="7.72198" y1="1.36248" x2="0.344393" y2="8.37191" />
                <line x1="0.520254" y1="0.772184" x2="7.52968" y2="8.14977" />
            </symbol>
        </svg>
        <div class="container">
            <app-lang></app-lang>

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
            <div v-if="needDoList.length || completeList.length">
                <div class="title">{{ this.$t("list") }}</div>
                <ul class="list">
                    <li v-for="(mask, index) in needDoList" :key="mask.id" class="list__item">
                        <label>
                            <input type="checkbox" v-on:change="doCheck(index, 'need')">
                            <span>{{ mask.title }}</span>
                        </label>
                        <button class="btn-cross" @click="removeAlert(index, 'need')">
                            <svg>
                                <use xlink:href="#cross" />
                            </svg>
                        </button>
                    </li>
                </ul>
                <hr>
                <div class="acc">
                    <div class="acc__title" :class="isOpen === true ? 'open' : '' " @click.prevent="changeOpen()">{{ completeList.length }} {{ this.$tc("count_done", completeList.length) }}</div>
                    <ul class="acc__content">
                        <li v-for="(mask, index) in completeList" :key="mask.id" v-on:click="doCheck(index, 'complete')" class="done-item">{{ mask.title }}</li>
                    </ul>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
    import Lang from './views/components/Lang.vue'
    import Swal from 'sweetalert2'

    export default {
        components: {
            'app-lang': Lang
        },
        data() {
            return {
                valueInput: '',
                needDoList: [],
                completeList: [],
                isOpen: false
            };
        },
        mounted () {

        },
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
            removeAlert (index, type) {
                const toDoList = type === 'need' ? this.needDoList : this.completeList;
                const self = this
                Swal.fire({
                    title: self.$t("shure_to_delete"),
                    showCloseButton: false,
                    showCancelButton: true,
                    buttonsStyling: false,
                    confirmButtonText: self.$t("general.yes"),
                    cancelButtonText: self.$t("general.no"),
                    customClass: {
                        confirmButton: 'btn btn--primary',
                        cancelButton: 'btn btn--danger',
                        popup: 'swal2-popup--primary'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        toDoList.splice(index, 1);
                    }
                });
            },
            changeOpen () {
                if (this.isOpen === true) {
                    this.isOpen = false
                } else {
                    this.isOpen = true
                }
            }
        }
    }

</script>

<style>

</style>
