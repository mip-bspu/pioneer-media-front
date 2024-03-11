<script setup>
import { ref } from 'vue'

defineProps({
  selected: {type: Object, default: null}
})

const tags = ref([
  'school', 'city',
  'sectionA'
])
</script>

<template>
<form class="form-set">
  <div class="form-set__wrapper">
    <label class="form-set__input">
      <span class="form-set__label">Название:</span>
      <q-input outlined dense/>
    </label>

    <label class="form-set__input">
      <span class="form-set__label">Дата начала:</span>
      <ui-date-input outlined dense/>
    </label>

    <label class="form-set__input">
      <span class="form-set__label">Дата окончания:</span>
      <ui-date-input outlined dense/>
    </label>

    <label class="form-set__input">
      <span class="form-set__label">Тэги:</span>
        <q-select
            outlined dense
            :options="tags"
            multiple
            use-chips
        />
    </label>
  </div>
</form>
</template>

<style lang="scss" scoped>
.form-set{
  &__wrapper{
    display: flex;
    flex-direction: column;
    gap: 0.5rem
  }

  &__label{
    font-size: 0.96rem;

    padding-left: 0.3rem;
  }
}
</style>