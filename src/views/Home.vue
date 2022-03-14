<template>
    <div>
        <div class="container">
            <div class="offset-1 offset-lg-3 offset-xl-3 offset-xxl-4 col-10 col-lg-6 col-xl-6 col-xxl-4 ">
                <app-lang></app-lang>

                <adding-box></adding-box>
                <div class="lists show">
                    <need-do-list></need-do-list>
                    <complete-list></complete-list>
                </div>
            </div>


        </div>
    </div>
</template>
<script>
    
    import Lang from './components/Lang.vue'
    import AddingBox from './components/AddingBox.vue'
    import NeedDoList from './components/NeedDoList.vue'
    import CompleteList from './components/CompleteList.vue'

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