<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Subtitle from '~/components/course/Subtitle.vue';
import Description from '~/components/course/Description.vue';
import CodeBlock from '~/components/course/CodeBlock.vue';

import { FANTASY_LAND } from '~/utils/course/constants';

import { IDevice } from '~/layouts/course.vue';

export default defineComponent({
  name: 'FantasyLand',
  components: {
    Subtitle,
    Description,
    CodeBlock,
  },
  props: {
    device: {
      type: Object as PropType<IDevice>,
      required: true,
    },
  },
  data() {
    return {
      FANTASY_LAND
    }
  }
});
</script>

<template>
  <section :id="FANTASY_LAND">
      <Subtitle>Fantasy-land (Страна фантазий)</Subtitle>
      <Description>
        <p>
          Спецификация <strong>Fantasy-land (Страна фантазий)</strong> - это набор правил,
          публичных интерфейсов описывающих абстракции из теории категорий.
          <a href="https://github.com/fantasyland/fantasy-land" target="_blank">*подробнее</a>
        </p>
        <p>
          Эти правила и законы опираются на алгебраические структуры данных.
        </p>
        <p>
          По сути реализовывая эти интерфейсы и законы, мы следуем спецификации <strong>Fantasy-land (Страна фантазий)</strong>
        </p>
      </Description>
      <CodeBlock v-if="device.mobile">
        <template #default>
          <code>

  // Вот как она выглядит

  <pre> <a href="#setoid">Setoid</a>   <a href="#emigroupoid">Semigroupoid</a>  <a href="#semigroup">Semigroup</a>   <a href="#foldable">Foldable</a>        <a href="#functor">Functor</a>      <a href="#contravariant">Contravariant</a>  <a href="#filterable" class="">Filterable</a>
  (<a href="#equals-method">equals</a>)    (<a href="#compose-method">compose</a>)    (<a href="#concat-method">concat</a>)   (<a href="#reduce-method">reduce</a>)         (<a href="#map-method">map</a>)        (<a href="#contramap-method">contramap</a>)    (<a href="#filter-method">filter</a>)
      |           |           |           \         / | | | | \
      |           |           |            \       /  | | | |  \
      |           |           |             \     /   | | | |   \
      |           |           |              \   /    | | | |    \
      |           |           |               \ /     | | | |     \
    <a href="#ord">Ord</a>      <a href="#category">Category</a>     <a href="#monoid">Monoid</a>         <a href="#traversable">Traversable</a> | | | |      \
    (<a href="#lte-method">lte</a>)       (<a href="#id-method">id</a>)       (<a href="#empty-method">empty</a>)        (<a href="#traverse-method">traverse</a>)  / | | \       \
                              |                      /  | |  \       \
                              |                     /   / \   \       \
                              |             <a href="#profunctor">Profunctor</a> /   \ <a href="#bifunctor">Bifunctor</a> \
                              |              (<a href="#promap-method">promap</a>) /     \ (<a href="#bimap-method">bimap</a>)   \
                              |                      /       \           \
                            <a href="#group">Group</a>                   /         \           \
                          (<a href="#invert-method">invert</a>)               <a href="#alt">Alt</a>        <a href="#apply">Apply</a>      <a href="#extend">Extend</a>
                                                (<a href="#alt-method">alt</a>)        (<a href="#ap-method">ap</a>)     (<a href="#extend-method">extend</a>)
                                                  /           / \           \
                                                /           /   \           \
                                                /           /     \           \
                                              /           /       \           \
                                              /           /         \           \
                                            <a href="#plus">Plus</a>    <a href="#applicative">Applicative</a>    <a href="#chain">Chain</a>      <a href="#comonad">Comonad</a>
                                          (<a href="#zero-method">zero</a>)       (<a href="#of-method">of</a>)      (<a href="#chain-method">chain</a>)    (<a href="#extract-method">extract</a>)
                                              \         / \         / \
                                              \       /   \       /   \
                                                \     /     \     /     \
                                                \   /       \   /       \
                                                  \ /         \ /         \
                                              <a href="#alternative">Alternative</a>    <a href="#monad">Monad</a>     <a href="#chainrec">ChainRec</a>
                                                                      (<a href="#chainrec-method">chainRec</a>)
  </pre>

          </code>

        </template>
      </CodeBlock>
      <CodeBlock v-else>
        <template #default>
          <code>

            // Вот как она выглядит

  <pre>
  <a href="#setoid">Setoid</a>   <a href="#emigroupoid">Semigroupoid</a>  <a href="#semigroup">Semigroup</a>   <a href="#foldable">Foldable</a>        <a href="#functor">Functor</a>      <a href="#contravariant">Contravariant</a>  <a href="#filterable" class="">Filterable</a>
  (<a href="#equals-method">equals</a>)    (<a href="#compose-method">compose</a>)    (<a href="#concat-method">concat</a>)   (<a href="#reduce-method">reduce</a>)         (<a href="#map-method">map</a>)        (<a href="#contramap-method">contramap</a>)    (<a href="#filter-method">filter</a>)
      |           |           |           \         / | | | | \
      |           |           |            \       /  | | | |  \
      |           |           |             \     /   | | | |   \
      |           |           |              \   /    | | | |    \
      |           |           |               \ /     | | | |     \
    <a href="#ord">Ord</a>      <a href="#category">Category</a>     <a href="#monoid">Monoid</a>         <a href="#traversable">Traversable</a> | | | |      \
    (<a href="#lte-method">lte</a>)       (<a href="#id-method">id</a>)       (<a href="#empty-method">empty</a>)        (<a href="#traverse-method">traverse</a>)  / | | \       \
                              |                      /  | |  \       \
                              |                     /   / \   \       \
                              |             <a href="#profunctor">Profunctor</a> /   \ <a href="#bifunctor">Bifunctor</a> \
                              |              (<a href="#promap-method">promap</a>) /     \ (<a href="#bimap-method">bimap</a>)   \
                              |                      /       \           \
                            <a href="#group">Group</a>                   /         \           \
                          (<a href="#invert-method">invert</a>)               <a href="#alt">Alt</a>        <a href="#apply">Apply</a>      <a href="#extend">Extend</a>
                                                (<a href="#alt-method">alt</a>)        (<a href="#ap-method">ap</a>)     (<a href="#extend-method">extend</a>)
                                                  /           / \           \
                                                /           /   \           \
                                                /           /     \           \
                                              /           /       \           \
                                              /           /         \           \
                                            <a href="#plus">Plus</a>    <a href="#applicative">Applicative</a>    <a href="#chain">Chain</a>      <a href="#comonad">Comonad</a>
                                          (<a href="#zero-method">zero</a>)       (<a href="#of-method">of</a>)      (<a href="#chain-method">chain</a>)    (<a href="#extract-method">extract</a>)
                                              \         / \         / \
                                              \       /   \       /   \
                                                \     /     \     /     \
                                                \   /       \   /       \
                                                  \ /         \ /         \
                                              <a href="#alternative">Alternative</a>    <a href="#monad">Monad</a>     <a href="#chainrec">ChainRec</a>
                                                                      (<a href="#chainrec-method">chainRec</a>)
  </pre>

          </code>

        </template>
      </CodeBlock>

      <Description>
        <p>
          Давайте мы попробуем с Вами создать <strong>Functor</strong>
          согласно <strong>Fantasy-land (Страна фантазий)</strong>
        </p>
      </Description>
      <CodeBlock v-if="device.mobile">
        <template #default>
          <code>
    // Сигнатура
    fantasy-land/map :: Functor f => f a ~> (a -> b) -> f b

    // Создание функтора
    // ==== синтаксис es5 ======

    // подготавливаем прототип для функции конструктора
    // удалив наследование Object.prototype дефолтная
    var prototypeFunctor = Object.create(null)

    // Название строки функции и метода согласно спецификации
    const FANTASY_LAND_MAP = 'fantasy-land/map'

    // создаем функцию конструктор
    function Functor(value) {
      this.value = value
    }

    // создаем правильные связи между прототипом и функций конструктором
    Functor.prototype = prototypeFunctor
    prototypeFunctor.constructor = Functor

    //  а вот теперь самое главное реализовываем интерфейс функтора
    prototypeFunctor[FANTASY_LAND_MAP] = function (fn) {
      return new Functor(fn(this.value))
    }

    // Давайте разделим ключевую логику на части
    // return new Functor(fn(this.value))
    // 1. Текущей содержимое контейнера мы пропускаем через функцию
    fn(this.value)
    // 2. Возвращаем новый экземпляр типа функтор уже с новым значением
    return new Functor(тут результат инструкции выше)

    // Пример
    var functorObj = new Functor(5)

    var functorResult = functorObj[FANTASY_LAND_MAP](value => value * 2)

    // отсутствуют мутации
    // реализован интерфейс спецификации
    console.log(functorObj.value) // 5
    console.log(functorResult.value) // 10

    // =========================

    // Полифил
    // как устроен примерно внутри Object.create(objectProto)
    var createObjectProto = function (obj) {
      // для создания экземпляра формируем конструктор
      function XXX() {}

      // устанавливаем правильные ссылки
      XXX.prototype = obj || Object.prototype
      XXX.prototype.constructor = XXX

      // создаем экземпляр и возвращаем
      return new XXX()
    }

    // ==== синтаксис es6 ======
    // тут все гораздо проще
    // тут в прототипе мы также можем уничтожить дефолтное наследование Object.prototype
    class Functor {
      constructor (value) {
        this.value = value
      }

      // этот метод и так уже будет хранится по дефолту в прототипе
      [FANTASY_LAND_MAP] (fn) {
        return new Functor(fn(this.value))
      }
    }

    // Пример описанный выше также сработает
    const functorObj = new Functor(5)
    // =========================


    // ==== через чистые функции ======
    // Создание функтора без создания экземпляров
    // через чистые функции
    const functor = value => ({
      value,
      [FANTASY_LAND_MAP]: (fn) => functor(fn(value))
    })

    // создали объект и вернули его
    const objA = functor(10)
    const objB = objA[FANTASY_LAND_MAP](value => value - 5)

    console.log(objA.value) // 10
    console.log(objB.value) // 5

    // =========================
          </code>
        </template>
      </CodeBlock>
      <CodeBlock v-else>
        <template #default>
          <code>
            // Сигнатура
            fantasy-land/map :: Functor f => f a ~> (a -> b) -> f b

            // Создание функтора
            // ==== синтаксис es5 ======

            // подготавливаем прототип для функции конструктора
            // удалив наследование Object.prototype дефолтная
            var prototypeFunctor = Object.create(null)

            // Название строки функции и метода согласно спецификации
            const FANTASY_LAND_MAP = 'fantasy-land/map'

            // создаем функцию конструктор
            function Functor(value) {
              this.value = value
            }

            // создаем правильные связи между прототипом и функций конструктором
            Functor.prototype = prototypeFunctor
            prototypeFunctor.constructor = Functor

            //  а вот теперь самое главное реализовываем интерфейс функтора
            prototypeFunctor[FANTASY_LAND_MAP] = function (fn) {
              return new Functor(fn(this.value))
            }

            // Давайте разделим ключевую логику на части
            // return new Functor(fn(this.value))
            // 1. Текущей содержимое контейнера мы пропускаем через функцию
            fn(this.value)
            // 2. Возвращаем новый экземпляр типа функтор уже с новым значением
            return new Functor(тут результат инструкции выше)

            // Пример
            var functorObj = new Functor(5)

            var functorResult = functorObj[FANTASY_LAND_MAP](value => value * 2)

            // отсутствуют мутации
            // реализован интерфейс спецификации
            console.log(functorObj.value) // 5
            console.log(functorResult.value) // 10

            // =========================

            // Полифил
            // как устроен примерно внутри Object.create(objectProto)
            var createObjectProto = function (obj) {
              // для создания экземпляра формируем конструктор
              function XXX() {}

              // устанавливаем правильные ссылки
              XXX.prototype = obj || Object.prototype
              XXX.prototype.constructor = XXX

              // создаем экземпляр и возвращаем
              return new XXX()
            }

            // ==== синтаксис es6 ======
            // тут все гораздо проще
            // тут в прототипе мы также можем уничтожить дефолтное наследование Object.prototype
            class Functor {
              constructor (value) {
                this.value = value
              }

              // этот метод и так уже будет хранится по дефолту в прототипе
              [FANTASY_LAND_MAP] (fn) {
                return new Functor(fn(this.value))
              }
            }

            // Пример описанный выше также сработает
            const functorObj = new Functor(5)
            // =========================


            // ==== через чистые функции ======
            // Создание функтора без создания экземпляров
            // через чистые функции
            const functor = value => ({
              value,
              [FANTASY_LAND_MAP]: (fn) => functor(fn(value))
            })

            // создали объект и вернули его
            const objA = functor(10)
            const objB = objA[FANTASY_LAND_MAP](value => value - 5)

            console.log(objA.value) // 10
            console.log(objB.value) // 5

            // =========================
          </code>
        </template>
      </CodeBlock>
    </section>
</template>
