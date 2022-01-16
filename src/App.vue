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

            <adding-box></adding-box>
            <div class="lists" :class="needDoList.length || completeList.length ? 'show' : ''">
                <need-do-list></need-do-list>
                <hr>
                <complete-list></complete-list>
            </div>
        </div>
  </div>
</template>

<script>
    import Lang from './views/components/Lang.vue'
    import AddingBox from './views/components/AddingBox.vue'
    import NeedDoList from './views/components/NeedDoList.vue'
    import CompleteList from './views/components/CompleteList.vue'

    export default {
        components: {
            'app-lang': Lang,
            'adding-box': AddingBox,
                NeedDoList,
            'need-do-list': NeedDoList,
            'complete-list': CompleteList
        },
        data() {
            return {
                needDoList: [],
                completeList: [],
            };
        },
        // props: ['needDoList'],
        mounted () {
            this.emitter.on('needDo', needDoList => {
               this.needDoList = needDoList
            })
            this.emitter.on('completeDo', completeList => {
               this.completeList = completeList
            })
        },
        methods: {
        }
    }

</script>

<style>

</style>
