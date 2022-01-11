<template>
    <div>
        <nav class="lang">
            <a href="#" class="lang__item" :class="selectedLanguage === 'ua' ? 'active' : ''" @click.prevent="changeLanguage('ua')">UA</a>
            <a href="#" class="lang__item" :class="selectedLanguage === 'en' ? 'active' : ''" @click.prevent="changeLanguage('en')">EN</a>
            <a href="#" class="lang__item" :class="selectedLanguage === 'ru' ? 'active' : ''" @click.prevent="changeLanguage('ru')">RU</a>
        </nav>
        <!--<nav>
            <select class="custom-select" v-model="lang" @change="handleChange($event)">
                <option value="ua">Ukraine</option>
                <option value="en">English</option>
                <option value="ru">Russian</option>
            </select>
        </nav> -->
    </div>
</template>
<script>
    export default {
        name: 'Lang',
        data(){
            return {
                selectedLanguage: 'ua',
                locales: []
            }
        },
        methods: {
            changeLanguage (locale) {
                this.$i18n.locale = locale
                this.selectedLanguage = locale
                
            } 
        },
    //     data: function() {
    //         const lang = localStorage.getItem('lang') || 'ua';
    //         return {
    //             lang: lang
    //         }
    //     },
    //     methods: {
    //         handleChange: function(event) {
    //             localStorage.setItem('lang', event.target.value);
    //             window.location.reload
    //         }
    //     }
    }
</script>
<style lang="scss">
    .lang {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 20px 0;
        &__item {
            text-decoration: none;
            color: #282828;
            &+.lang__item {
                margin-left: 20px;
            }
            &:hover {
                color: $main-color;
            }
        }
    }
</style>