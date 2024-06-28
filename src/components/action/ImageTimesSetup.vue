<script setup>
import { assignTimeForImageFile } from '@/services/action.service'

defineProps({
  modelValue: { type: Boolean },
  disable: { type: Boolean },
  imageFiles: { type: Array }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
<div class="image-setup">
  <q-toggle
      :modelValue="modelValue"
      @update:modelValue="emit('update:modelValue', !modelValue)" 
      class="q-my-sm"
      :disable="disable"
  > 
    <span class="image-setup__label">Настроить время показа изображений</span>
  </q-toggle>

  <div class="image-setup__block" v-show="modelValue">
    <div class="image-setup__times image-setup__wrapper">
      <div v-for="file in imageFiles" class="image-setup__item">
        <span class="ellipsis">{{ file.name }}</span>

        <q-input 
            @update:modelValue="(v)=>assignTimeForImageFile(file, v)" 
            :modelValue="file.time"  
            dense outlined type="time"
        />
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.image-setup{
  &__wrapper{
    display: flex;
    flex-direction: column;
  }

  &__block{
    margin-top: 0.6rem;

    display: flex;
    align-items: end;
    gap: 1rem;
  }

  &__label{
    font-size: 0.9rem;
    letter-spacing: 0.02rem;
  }

  &__item{
    margin-bottom: 0.4rem;

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.2rem;
  }
}
</style>