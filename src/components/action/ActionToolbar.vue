<script setup>
import InputSetAction from '@/components/action/InputSetAction.vue';

import {ref} from 'vue'

let visible = ref(false)
</script>

<template>
<div class="toolbar card">
  <div class="toolbar__header">
    <div class="toolbar__header-box card__header" v-ripple @click="visible = !visible">
      <div class="toolbar__title">
        Создание события
      </div>

      <q-icon name="mdi-chevron-up" :class="'arrow' + (visible ? ' arrow_active': '')"/>
    </div>
  </div>

  <transition :duration="330" name="nested">
    <div class="toolbar__body card__body outer" v-show="visible">
      <div class="inner">
        <input-set-action/>

        <q-separator class="q-mt-md"/>

        <div class="q-mt-lg row justify-end">
          <q-btn 
            outline 
            label="создать событие" 
            color="primary" 
          />
        </div>
      </div>
    </div>
  </transition>
</div>
</template>

<style lang="scss" scoped>
.toolbar{
  &__header{
    position: relative;
    overflow: hidden;
  }
  &__header-box{
    user-select: none;
    cursor: pointer;

    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
  }
  &__title{
    font-size: 1.2rem;
  }
  &__arrow{
    
  }
  &__body{
  }
}

.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  opacity: 0;
}
.arrow{
  font-size: 2rem;
  transition: all 0.3s ease;

  &_active{
    transform: rotate(180deg);
  }
}
</style>