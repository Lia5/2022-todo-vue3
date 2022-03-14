import en from './lang/i18n/en.json';
import ua from './lang/i18n/ua.json';
import ru from './lang/i18n/ru.json';

import { createI18n } from 'vue-i18n'
//   function loadLocaleMessages () {
//     const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
//     const messages = {}
//     locales.keys().forEach(key => {
//       const matched = key.match(/([A-Za-z0-9-_]+)\./i)
//       if (matched && matched.length > 1) {
//         const locale = matched[1]
//         messages[locale] = locales(key).default
//       }
//     })
//     return messages
//   }
  
  export default createI18n({
    locale: process.env.VUE_APP_I18N_LOCALE || 'en',
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
    messages: {
        en: en,
        ua: ua,
        ru: ru
    },
    pluralizationRules: {
        /**
         * @param item {number} a item index given by the input to $tc: `$tc('path.to.rule', choiceIndex)`
         * @param completeList {number} an overall amount of available items
         * @returns a final item index to select plural word by
         */
        'ua': function(item, completeList) {
            if(item === 0) {
                return 0;
            }
            const teen = item > 10 && item < 20;
            const endsWithOne = item%10 === 1;
            if (completeList < 4 ){
                return (!teen && endsWithOne) ? 1 : 2;
            } 
            if (!teen && endsWithOne) {
                return 1;
            }
            if (!teen && item % 10 >= 2 && item % 10 <= 4) {
                return 2;
            }
    
            return (completeList < 4) ? 2 : 3;

        },
        'ru': function(item, completeList) {
            if(item === 0) {
                return 0;
            }
            const teen = item > 10 && item < 20;
            const endsWithOne = item%10 === 1;
            if (completeList < 4 ){
                return (!teen && endsWithOne) ? 1 : 2;
            } 
            if (!teen && endsWithOne) {
                return 1;
            }
            if (!teen && item % 10 >= 2 && item % 10 <= 4) {
                return 2;
            }
    
            return (completeList < 4) ? 2 : 3;

        }
    }
  })
  