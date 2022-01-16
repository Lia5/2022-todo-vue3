<template>
    <div>
    
        <div class="acc">
            <div class="acc__title" :class="isOpen === true ? 'open' : '' " @click.prevent="changeOpen()">{{ completeList.length }} {{ this.$tc("count_done", completeList.length) }}</div>
            <ul class="acc__content">
                <li v-for="(mask, index) in completeList" :key="mask.id" v-on:click="doCheckComplete(index)" class="done-item">{{ mask.title }}</li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'completeList',
        data() {
            return {
                completeList: [],
                isOpen: false
            }
        },
        mounted () {

            this.emitter.on('needDo', needDoList => {
               this.needDoList = needDoList
            })
            this.emitter.on('completeDo', completeList => {
               this.completeList = completeList
            })
        },
        methods: {
            doCheckComplete (index) {
                const noCompleteMask = this.completeList.splice(index, 1);
                this.needDoList.push(...noCompleteMask);
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