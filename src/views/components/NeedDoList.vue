<template>
    <div>
        <div class="title">{{ this.$t("list") }}</div>
        <ul class="list">
            <li v-for="(mask, index) in needDoList" :key="mask.id" class="list__item">
                <label>
                    <input type="checkbox" v-on:change="doCheckNeed(index)">
                    <span>{{ mask.title }}</span>
                </label>
                <button class="btn-cross" @click="removeAlert(index, 'need')">
                    <svg>
                        <use xlink:href="#cross" />
                    </svg>
                </button>
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
                needDoList: [],
                completeList: [],
            }
        },
        mounted () {

            this.emitter.on('addTaskItem', valueInput => {
                this.valueInput = valueInput;
                this.needDoList.push({
                    title: this.valueInput,
                    id: Math.random(),
                    type: 'need'
                });
                this.emitter.emit('needDo', this.needDoList);
                this.emitter.emit('completeDo', this.completeList);
            })
        },
        methods: {
            doCheckNeed (index) {
                const completeMask = this.needDoList.splice(index, 1);
                this.completeList.push(...completeMask);
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
        }
    }
</script>