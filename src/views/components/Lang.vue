<template>
    <div>
        <nav class="lang">
        <label v-for="item in langs" :key="item.lang" >
            <input 
                type="radio" 
                :value="item.lang" 
                name="lang" 
                class="lang__item" 
                v-model="selectedLanguage" 
                @change="changeLanguage(item.lang)"
                :class="selectedLanguage === item.lang ? 'active' : ''" >
            <span>{{ item.lang }} </span>
        </label>
        </nav>
    </div>
</template>
<script>
    export default {
        name: 'Lang',
        data(){
            return {
                langs: [
                    { 
                        lang: "ua" 
                    },
                    { 
                        lang: "en" 
                    },
                    { 
                        lang: "ru" 
                    }
                ],
                selectedLanguage: 'ua',
            }
        },
        methods: {
            changeLanguage (locale) {
                this.$i18n.locale = locale
                this.selectedLanguage = locale
                this.emitter.emit('currentLang', this.selectedLanguage);
            } 
        },
    }
</script>
<style lang="scss">
    .lang {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 20px 0;
        &__item {
            display: none;
            & + span {
                display: inline-flex;
                margin: 0 10px;
                text-transform: uppercase;
                text-decoration: none;
                color: #282828;
                cursor: pointer;
                transition: 0.5s;
            }
            &.active + span, 
            &:hover + span {
                color: $main-color;
            }
        }
    }
</style>