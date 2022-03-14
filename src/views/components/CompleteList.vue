<template>
    <div>
    
        <div v-if="completeList.length">
            <div class="title" >{{ this.$t("done") }}</div>

            <ul class="list list--completed">
                <li v-for="(mask, index) in completeList" :key="mask.id" class="list__item row">
                    <div class="col-10">
                        <label>
                            <div class="row">
                                <div class="col-5">
                                <input checked type="checkbox" v-on:click="doCheckComplete(index)">
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
    </div>
</template>
<script>
    import Swal from 'sweetalert2'

    export default {
        name: 'completeList',
        data() {
            return {
                completeList: JSON.parse(localStorage.getItem("tasksComplete")) || [],
                isOpen: false
            }
        },
        mounted () {
            // this.completeList = JSON.parse(localStorage.getItem("tasksComplete")) || [];
            this.emitter.emit('completeDo', this.completeList);
            this.emitter.on('needDo', needDoList => {

                // this.valueInput = valueInput;
                // console.log("-----------");
                // console.log(this.needDoList);
                this.needDoList = needDoList;
                console.log(this.completeList);
                console.log(this.needDoList);
                // console.log(this.needDoList);
                // console.log("-----------");
                // this.needDoList = JSON.parse(localStorage.getItem("tasksNeedDo")) || [];
                
            })
            console.log(this.completeList);
            console.log(this.needDoList);
        },
        methods: {
            doCheckComplete (index) {
                const noCompleteMask = this.completeList.splice(index, 1);
                // console.log(...noCompleteMask);
                // console.log(this.needDoList);
                // console.log(this.completeList);
                this.needDoList.push(...noCompleteMask);
                // console.log("-----------");
                localStorage.setItem('tasksComplete', JSON.stringify(this.completeList));
                localStorage.setItem('tasksNeedDo', JSON.stringify(this.needDoList));
                console.log(this.completeList);
                console.log(this.needDoList);
                
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
                        // localStorage.setItem('tasksNeedDo', JSON.stringify(this.needDoList));
                        localStorage.setItem('tasksComplete', JSON.stringify(this.completeList));
                    }
                });
            },
        }
    }
</script>