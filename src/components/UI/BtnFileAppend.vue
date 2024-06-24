<script setup>
defineProps({
  accept: {type: Array, default: ['.jpg', '.png']}
})
const emit = defineEmits(['update:change'])
</script>

<template>
<button class="file-btn" v-ripple>
  <span>Добавить файл</span>
  <q-icon name="mdi-plus" class="file-btn__icon"/>
  <input 
      type="file" 
      @change="(e)=>emit('update:change', e)"
      :accept="accept.join(', ')"
  />
</button>
</template>

<style lang="scss" scoped>
.file-btn{
  position: relative;

  border: none;
  border-radius: 0.4rem;
  color: $primary;
  background-color: $blind-primary;

  display: flex;
  align-items: center;
  gap: 0.2rem;

  &__icon{
    font-size: 1.2rem;
  }

  input{
    position: absolute;
    top: 0; bottom: 0;
    left: 0; right: 0;
    opacity: 0;
  }
}
</style>