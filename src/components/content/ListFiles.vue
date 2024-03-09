<script setup>
import FileItem from '@/components/content/FileItem.vue';

const props = defineProps({
  modelValue: {type: Array, default: []}
})

const emit = defineEmits(['update:modelValue'])

const onDelete = (file)=>
    emit('update:modelValue', props.modelValue.filter(item=>item.name != file.name))
</script>

<template>
<div class="files" v-if="modelValue.length > 0">
  <div class="files__wrapper">
    <div class="files__items">
      <file-item 
          v-for="file in modelValue" 
          :model-value="file"
          :onDelete="onDelete"
      />
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.files{
  &__wrapper{
    margin-top: 2rem;
  }

  &__items{
    display: flex;
    flex-wrap: wrap;

    gap: 1rem;
  }
}
</style>