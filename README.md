# todo list

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
```
### Ссылка на задеплоенный проект
[https://lia5-todo-vue3.netlify.app/](https://lia5-todo-vue3.netlify.app/)
## Сделано:
- на vue 3;
- подключила 3 перевода  (хоть и не было в тз, но  используется везде) i18n + сделала переключатель языков;
- в переводах используется Pluralization для разных окончаний в русском и украинском языках;
- подключила стили scss (vue.config.js);
- подключила sweetalert2 (для подтверждения удаления);
- задача попадает в список также при нажатии на энтер;
- при нажатии на "Скасувати" очищается значение, если оно было введено в инпут;
- сворачивающаяся панель в списке выполненных задач;
- свг вставлены через спрайт ( и одна свг - фоном);
- состояния наведения некоторые добавлены (хотя их нет в макете), например, наведение на крестик удаления, наведение на выполненную задачу;
- добавлена возможность переместить выполненнную задачу снова в список невыполненых (просто кликом на нее).
- список карточек и выполненных задач изначально скрыты, если нет ни одной карточки к выполнению или выполненной.

## UPD:
- удалены лишние комментарии;
- удален неиспользуемый компонент;
- изменения в компоненте Lang (переключатель языков):
  * убраны ссылки в переключателях языков (вместо ссылок а используются радиобаттоны);
  * вывод списка через v-for;
  * слежение за изменением значения в радиобаттонах при помощи v-model. Переключение языка осуществляется при помощи @change;
- AddTask выделено в отдельный компонент, значение из дочернего компонента передается в родительский (использовано mitt: emitter);
- в два отдельных компонента выделены списки выполненных задач и задач для выполнения, созданы пользовательские события (emitter.emit) с передачей данных, слежение (emitter.on);
- Переделан пункт про "список карточек и выполненных задач изначально скрыты, если нет ни одной карточки к выполнению или выполненной" - вместо v-if скрытие сделано при помощи стилей (классов), так как в родительском компоненте слежение осуществляется из дочерних компонентов;
- исправлено отображение и исчезновение компонента добавление задачи - сделано через :class вместо ванильного js;
- добавлена валидация на заполнение текстового поля (Поле обязательно для заполнения) - вывод текстовой ошибки.


<!-- 
### Lints and fixes files
```
npm run lint
``` -->

<!-- ### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/). -->
