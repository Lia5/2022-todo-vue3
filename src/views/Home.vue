<template>
    <div>
        <div class="container">
            <app-lang></app-lang>

            <adding-box></adding-box>
            <div class="lists" :class="needDoList.length || completeList.length ? 'show' : ''">
                <need-do-list></need-do-list>
                <hr>
                <complete-list></complete-list>
            </div>

        </div>
        <app-weather></app-weather>
    </div>
</template>
<script>
    
    import Lang from './components/Lang.vue'
    import AddingBox from './components/AddingBox.vue'
    import NeedDoList from './components/NeedDoList.vue'
    import CompleteList from './components/CompleteList.vue'
    import Weather from './components/Weather.vue'

    export default {
        components: {
            'app-lang': Lang,
            'adding-box': AddingBox,
                NeedDoList,
            'need-do-list': NeedDoList,
            'complete-list': CompleteList,
            'app-weather': Weather
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