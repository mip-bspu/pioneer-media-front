<script setup>
const props = defineProps({
  actions: {type: Array, default: []}
})

const emit = defineEmits(['update:selected'])

const getPeriod = (action)=> `${Date.formatDateIso(action.from)} \u2013 ${Date.formatDateIso(action.to)}`
</script>

<template>
<div class="actions actions__list">
  <div class="actions__item action" v-for="action in actions" @click="emit('update:selected', action)">
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
.actions{
  &__item{
    
    &:not(:first-child){
      margin-top: 0.8rem;
    }
  }
}
.action{
  position: relative;

  background-color: white;

  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;

  &:hover{
    border: 1px solid $primary;
  }

  &__wrapper{
    user-select: none;
    cursor: pointer;

    padding: 1rem;
    display: flex;
  }

  &__column{
    &:not(:last-child){
      flex: 1 1 60%;
    }
  }

  &__life{
    height: 100%;

    font-size: 0.8rem;
    color: rgb(97, 97, 97);

    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: end;

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