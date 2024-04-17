<script setup>
import { setActiveUser } from '@/services/admin.service.js'
import { useAsync } from '@/composables/useAsync';

const props = defineProps({
  user: {type: Object}
})

const {
  exec: execSetActive,
  state: stateSetActive
} = useAsync(setActiveUser)


async function onSetActive(val){
  await execSetActive({id: props.user.id, active: val})
    
  if( !stateSetActive.isError ){
    props.user.active = val
  }
}
</script>

<template>
<q-card bordered flat class="user">
  <div class="user__wrapper">
    <q-card-section class="user__header q-pb-sm">
      <div 
          :class="['user__text', 'user__title', user.active ? 'user__title_active' : '']"
      >{{ user.login }}</div>

      <q-toggle @update:model-value="onSetActive" :model-value="user.active" color="green"/>
    </q-card-section>

    <q-separator/>

    <q-card-section class="user__groups q-py-sm">
      <div class="user__label">Права</div>
      <div class="user__text">{{ user.groups.join(", ") }}</div>
    </q-card-section>

    <q-card-section class="user__tags q-py-sm">
      <div class="user__label">Тэги</div>
      <div class="user__text">{{ user.tags.map(t=>t.name).join(", ") }}</div>
    </q-card-section>

    <q-card-section class="user__btns q-pt-md q-pb-lg">
      <q-btn dense outline color="primary" class="q-px-md">Изменить</q-btn>
    </q-card-section>
  </div>

  <q-inner-loading
      :showing="stateSetActive.isLoading"
  >
    <q-spinner-ball size="40px"/>
    <div class="user__loading q-pt-md">
      {{ user.active ? "Деактивация...": "Активация..." }}
    </div>
  </q-inner-loading>
</q-card>
</template>

<style lang="scss" scoped>
.user{
  &__wrapper{
    background-color: rgb(255, 255, 255) !important;
    
    border-radius: 0.4rem;
    border: 1px solid $grey-5;
  }
  &__label{
    color: $grey-7;
    font-size: 0.9em;
  }
  &__header{
    display: flex;
    justify-content: space-between;
  }
  &__text{
    text-transform: lowercase;
    font-weight: 600;
    color: $grey-8;

    user-select: none;
  }
  &__title{
    font-size: 1.4rem;
    text-transform: capitalize;
    font-weight: 600;
    color: $grey-9;

    &_active{
      color: $primary
    }
  }
  &__loading{
    font-size: 0.8rem;
  }
  &__btn{
    font-size: 0.9em;
    font-weight: 600;
  }
  &__btns{
  }
}
</style>