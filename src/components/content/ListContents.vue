<script setup>
defineProps({
  contents: {type: Array, default: []},
  selected: {type: Object, default: null}
})

const emit = defineEmits(['update:selected'])
</script>

<template>
<div class="contents">
  <div class="contents__items">
    <div 
      v-for="content in contents"
      class="contents__item"
      @click="()=>emit('update:selected', selected)"
    >
      {{ content.name }}
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.contents{
  &__item{
    padding: 0.6rem 1.2rem;

    color: $dark-secondary;
    background-color: $background-secondary;
    border-radius: 1rem;
    border-top: 2px solid rgba(255, 255, 255, 0);
    border-bottom: 1px solid $dark-secondary;

    transform: translateY(0px);

    &:not(:first-child){
      margin-top: 0.8rem;
    }

    &:hover{
      border-top: 0px solid rgba(255, 255, 255, 0);
      border-bottom: 3px solid $dark-secondary;
      transform: translateY(-2px);
    }
  }
}
</style>