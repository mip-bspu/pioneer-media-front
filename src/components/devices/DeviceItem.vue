<script setup>
import { ref } from 'vue'

const props = defineProps({
  data: {type: Object}
})

let showMenu = ref(false)

const close = ()=>{ 
  showMenu.value = false
}
</script>

<template>
<div class="device">
  <div :class="['device__wrapper', showMenu ? 'active' : '']">
    <div :class="['device__status',  Date.diffWithNow(new Date(data?.last_active)) < 120 ? 'device__status_active' : '']"></div>

    <div class="device__icons">
      <q-btn dense rounded @click="showMenu = !showMenu">
        <q-icon name="mdi-dots-vertical-circle-outline"/>
      </q-btn>

      <slot name="icons" :data="data"></slot>
    </div>


    <div class="device__description ellipsis q-mt-sm">
      <div class="device__label">Описание:</div>
      <div class="device__text">{{ data.description }}</div>
    </div>

    <div class="device__row q-mt-sm">
      <div class="device__tags ellipsis">
        <div class="device__label">Тэги:</div>
        <div class="device__text ellipsis">{{data.tags.map(i=>i.name).join(", ")}}</div>
      </div>

      <div class="device__ping">
        <div class="device__label">{{data?.last_active ? 'Активность:' : 'Статус:'}}</div>
        <div class="device__text device__text_small">{{data?.last_active ? Date.toLocale(data.last_active) : 'Не подключён'}}</div>
      </div>
    </div>

    <q-menu 
        :model-value="showMenu" 
        no-parent-event 
        fit persistent 
        class="device__menu" 
        :offset="[0, -5]"
    >
      <slot name="menu" :data="data" :close="close"></slot>
    </q-menu>
  </div>
</div>
</template>

<style lang="scss" scoped>
.device{
  &__wrapper{
    position: relative;

    padding: 0.6rem 0 0.6rem 0;

    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-width: 1px 1px 1px 4px;
    border-radius: 0.3em;

    font-size: 0.9rem;

    transition: box-shadow 0.1s ease;

    &.active{
      box-shadow: 0 5px 15px 5px rgba(0, 0, 0, 0.13) !important;
    }
  }
  &__row{
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 0.6em;

    padding: 0 1rem;
  }

  &__icons{
    display: flex;
    gap: 0.4rem;

    padding: 0 0.6rem;

    font-size: 1.4rem;
  }

  &__description{
    width: 100%;
    padding: 0 2rem 0 1rem;

    letter-spacing: 0.5px;
    color: $primary;

    .device__text{
      line-height: 1.24em;
      font-size: 1.1rem;
    }
  }

  &__label{
    user-select: none;
    font-size: 0.9em;
    color: $grey-8;
  }

  &__text{
    user-select: none;
    line-height: 1.1em;
    color: $grey-9;

    &_small{
      font-size: 0.9em;
    }
  }

  &__status{
    position: absolute;
    top: 6px; right: 8px;

    width: 12px;
    height: 12px;

    border-radius: 50%;

    background-color: $red-5;

    &_active{
      background-color: $positive;
    }
  }
}
</style>
<style>
.device__menu.q-menu{
  box-shadow: 0 20px 10px 5px rgba(0, 0, 0, 0.13) !important;

  border: 1px solid rgba(0, 0, 0, 0.1);
  border-width: 0px 1px 1px 4px;
}
</style>