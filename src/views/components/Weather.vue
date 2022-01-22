<template>
    <div class="weather" :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : '' " >
        <div class="weather__overlay">
            
            <div class="search-box">
                <input 
                    type="text" 
                    class="search-bar" 
                    :placeholder = "this.$t('weather.search')"
                    v-model="query"
                    @keypress="getWeather"
                >
            </div>
            <div class="weather__wrap" v-if="isWeather() != 'undefined'" >
                <div class="location-box">
                    <div class="location">
                        {{ weather.name }}, {{ weather.sys.country}}
                    </div>
                    <div class="date">{{ dateBuilder() }}</div>
                </div>
                <div class="weather__box">
                    <div class="weather__temp">{{ Math.round(weather.main.temp) }}°c</div>
                    <div class="weather__description">{{ weather.weather[0].description }}</div>
                </div>
            </div>
            <div class="weather__none" v-else>{{ this.error_text }}</div>
        </div>

    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'weather',
    data(){
        return {
            api_key: '1d51a950b237108ee21d79a9abbbd7bb',
            url_base: 'https://api.openweathermap.org/data/2.5/',
            query: '',
            weather: {},
            error_text: '',
            selectedLanguage: 'ua'
        }
    }, 
    mounted () {
        this.emitter.on('currentLang', selectedLanguage => {
            this.selectedLanguage = selectedLanguage;
            this.getWeather(13);
        })
    },

    created () {
    },
    methods: {
        isWeather () {
            return typeof this.weather.main;
        },
        getWeather(e) {
            if (e.keyCode == 13 || e == 13) {
                axios.get(`${this.url_base}weather?q=${this.query}&units=metric&lang=${this.selectedLanguage}&appid=${this.api_key}`)
                .then(responce => {
                    this.weather = responce.data
                    console.log(this.weather);
                })
                .catch( err => {
                    // this.errors.push(err);
                    if (err.response) {
                        this.error_text = this.$t(`weather.errors.${err.response.data.cod}`)
                        // client received an error response (5xx, 4xx)
                    } else if (err.request) {
                        this.error_text = this.$t(`weather.errors.request}`)
                        // client never received a response, or request never left 
                    } else {
                        this.error_text = this.$t(`weather.errors.other}`)
                        // anything else 
                    }
                })
            }
        },
        dateBuilder () {
            let fullDate = new Date(),
                day    = this.$t(`weather.days.${fullDate.getDay()}`),
                date   = fullDate.getDate(),
                month  = this.$t(`weather.months.${fullDate.getMonth()}`),
                year   = fullDate.getFullYear();
      
            return `${day}, ${date} ${month}, ${year}`
        }
    } 
}
</script>
<style lang="scss">
    .weather {
        position: absolute;
        top: 0;
        right: 0;
        background-image: url('../../assets/weather/cold-bg.jpeg');
        background-size: cover;
        background-position: center;
        transition: 0.5s;
        max-width: 300px;
        @media screen and (max-width: 1140px) {
            position: static;
            margin: 30px auto;
        }
        &.warm {
            background-image: url('../../assets/weather/warm-bg.jpeg');
        }
        &__overlay {
            width: 100%;
            height: 100%;
            padding: 15px;
            min-height: 100px;
            background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
        }
        .search-box {
            margin-bottom: 15px;
        }
        .search-bar {
            transition: 0.5s;
            background-color: rgba(255, 255, 255, 0.25);
            &:focus {
                background-color: rgba(255, 255, 255, 0.75);
            }
        }
        &__wrap {
            color: #fff;
        }
        &__none {
            color: #fff;
            font-size: 14px;
            text-align: center;
        }
        &__box {
            text-align: center;
        }
        &__temp {
            display: inline-block;
            padding: 10px 25px;
            font-size: 77px;
            margin: 30px 0;
            background: rgba(255, 255, 255, 0.25);
            text-shadow: 3px 6px rgba(255, 255, 255, 0.25);
            box-shadow: -2px 0px 3px rgba(40, 40, 40, 0.18);
        }
        &__description {
            font-size: 25px;
            font-style: italic;
            font-weight: 700;
            text-shadow: 3px 6px rgba(255, 255, 255, 0.25);
        }
    }
    .location {
        font-size: 25px;
        font-weight: 700;
        text-align: center;
        text-shadow: 1px 3px rgba(255, 255, 255, 0.25);
    }
    .date {
        font-size: 16px;
        text-align: center;
        font-style: italic;
    }
</style>