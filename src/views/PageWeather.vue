<template>
    <div>
        <app-weather></app-weather>
    </div>
</template>
<script>

    import Weather from './components/Weather.vue'

    export default {
        name: 'PageWeather',
        components: {
            'app-weather': Weather
        }
    }
</script>
<style lang="scss" scoped>
    .weather {
        position: static;
        margin-left: auto;
        margin-right: auto;
    }
</style>