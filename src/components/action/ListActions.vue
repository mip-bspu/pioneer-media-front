<script setup>
const props = defineProps({
  actions: {type: Array, default: []}
})

const emit = defineEmits(['update:selected'])

const getPeriod = (action)=> `${Date.formatDateIso(action.from)} \u2013 ${Date.formatDateIso(action.to)}`
</script>

<template>
<div class="list-actions__list">
  <div class="list-actions__item action" v-for="action in actions" @click="emit('update:selected', action)">
    <div class="action__wrapper" v-ripple>

      <div class="action__column">
        <div class="action__title">
          {{ action.name }}
        </div>
        
        <div class="action__description">
          <div class="action__tags">
            <div class="action__tag" v-for="tag in action.tags">{{ tag.name }}</div>
          </div>
        </div>
      </div>

      <div class="action__column">
        <div class="action__size">
          <span>Кол-во элементов {{ action.files.length }}</span>
        </div>

        <div class="action__life">
          <span>Время жизни</span>
          <span>{{ getPeriod(action) }}</span>
        </div>
      </div>
  
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.list-actions{
  &__list{
    width: 100%;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 1rem;
  }
  &__item{
    min-height: 110px;
    height: 100%;
  }
}
.action{
  position: relative;
  overflow: hidden;

  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;

  &:hover{
    border: 1px solid $primary;
  }

  &__wrapper{
    user-select: none;
    cursor: pointer;

    padding: 1rem;

    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  &__column{
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__life{
    height: 100%;

    font-size: 0.8rem;
    color: rgb(97, 97, 97);

    display: flex;
    flex-direction: column;


    span:first-child{
      margin-bottom: 0.3em;
    }
    span:not(:first-child){
      font-size: 0.84em;
    }
  }

  &__tags{
    margin-top: 0.6rem;

    display: flex;
    gap: 0.4rem;
  }

  &__size{
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: end;

    color: rgb(97, 97, 97);

    font-size: 0.8rem;
  }

  &__tag{
    display: inline-block;

    font-size: 0.86rem;

    padding: 0.1em 0.6em;
    border-radius: 0.5rem;

    color: $primary;
    background-color: $blind-primary;
  }

  &__title{
    font-size: 1.4rem;
  }
}
</style>