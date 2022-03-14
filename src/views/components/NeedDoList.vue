<template>
    <div>
        <ul class="list">
            <li v-for="(mask, index) in needDoList" :key="mask.id" class="list__item row">
                <div class="col-10">
                    <label>
                        <div class="row">
                            <div class="col-5">
                            <input type="checkbox" v-on:change="doCheckNeed(index)">
                            <span>{{ mask.title }}</span>
                            </div>
                            <div class="col-6">{{ mask.date }}</div>
                        </div>
                    </label>
                </div>
                <div class="col-2">
                    <button class="btn-delete btn btn-warning" @click="removeAlert(index, 'need')">
                        <svg>
                            <use xlink:href="#delete" />
                        </svg>
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>

    import Swal from 'sweetalert2'

    export default {
        name: 'needDoList',
        data(){
            return {
                needDoList: JSON.parse(localStorage.getItem("tasksNeedDo")) || [],
                // completeList: [],
                date: ''
            }
        },
        mounted () {
            function zeroPadding(num, digit) {
                var zero = '';
                for(var i = 0; i < digit; i++) {
                    zero += '0';
                }
                return (zero + num).slice(-digit);
            }
            // this.needDoList = JSON.parse(localStorage.getItem("tasksNeedDo")) || [];
            // this.emitter.emit('needDo', this.needDoList);
            this.emitter.on('completeDo', completeList => {
                this.completeList = completeList;
                // this.completeList = JSON.parse(localStorage.getItem("tasksComplete")) || [];
            })
            this.emitter.on('addTaskItem', valueInput => {
                this.valueInput = valueInput;
                this.fullDate = new Date();
                this.date = zeroPadding(this.fullDate.getDate(), 2) + '-' + zeroPadding(this.fullDate.getMonth()+1, 2) + '-' + zeroPadding(this.fullDate.getFullYear(), 4) + ' ' + zeroPadding(this.fullDate.getMinutes(), 2) + ':' + zeroPadding(this.fullDate.getSeconds(), 2);
                this.needDoList.push({
                    title: this.valueInput,
                    date: this.date,
                    id: Math.random(),
                    type: 'need'
                });
                this.emitter.emit('needDo', this.needDoList);
                localStorage.setItem('tasksNeedDo', JSON.stringify(this.needDoList));
            })
        },
        methods: {
            doCheckNeed (index) {
                // console.log(this.needDoList);
                const completeMask = this.needDoList.splice(index, 1);
                // console.log(this.needDoList);
                this.completeList.push(...completeMask);
                // console.log(this.needDoList);
                // console.log("-----------");
                localStorage.setItem('tasksNeedDo', JSON.stringify(this.needDoList));
                localStorage.setItem('tasksComplete', JSON.stringify(this.completeList));
                // console.log(...completeMask);
                // console.log(this.needDoList);
                // console.log(this.completeList);
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
                        localStorage.setItem('tasksNeedDo', JSON.stringify(this.needDoList));
                    }
                });
            },
        }
    }
</script>