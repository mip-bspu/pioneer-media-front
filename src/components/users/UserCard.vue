<script setup>
import { ref, reactive, watch } from 'vue'
import { useUsers } from '@/composables/useUsers'

const props = defineProps({
  user: {type: Object},
  options: {type: Object}
})

const { setActive, updateUser } = useUsers()

const {
  exec: onSetActive,
  state: stateSetActive
} = setActive;

const {
  exec: onUpdateUser,
  state: stateUpdateUser
} = updateUser;

let isEdit = ref(false)

let updates = reactive({
  groups: props.user.groups,
  tags: props.user.tags
})

watch(
  ()=>isEdit.value,
  (nV) => {
    if(nV){
      updates.groups = props.user.groups
      updates.tags = props.user.tags
    }
  }
)

const onActive = ()=>{
  onSetActive(props.user.id, !props.user.active)
}
const onUpdate = ()=>{
  onUpdateUser(props.user.id, {groups: updates.groups, tags: updates.tags})
}
</script>

<template>
<div class="user">
  <div :class="{'user__wrapper': true, 'user__wrapper_edit': isEdit }">
    <q-card-section class="user__header q-pb-sm">
      <div :class="['user__text', 'user__title', user.active ? 'user__title_active' : '']">
        {{ user.login }}
      </div>

      <q-toggle @update:model-value="onActive" :model-value="user.active" color="green"/>
    </q-card-section>

    <q-separator/>

    <q-card-section class="user__groups q-py-sm">
      <template v-if="!isEdit">
        <div class="user__label">Права</div>

        <div class="user__text" >{{ user.groups.join(", ") }}</div>
      </template>
      <q-select 
          v-else
          label="Права"
          multiple borderless
          :options="options.groups" 
          v-model="updates.groups" 
      />
    </q-card-section>

    <q-card-section :class="['user__tags', !isEdit ? 'q-py-sm' : 'q-py-none']">
      <template v-if="!isEdit">
        <div class="user__label">Тэги</div>

        <div class="user__text" v-if="user.tags.length">{{ user.tags.map(t=>t.name).join(", ") }}</div>
        <div v-else class="user__caption">Тэги не назначенны</div>
      </template>
      <q-select 
          v-else
          label="Тэги"
          option-label="name"
          multiple borderless
          :options="options.tags" 
          v-model="updates.tags" 
      />
    </q-card-section>

    <q-card-section class="user__info q-pt-sm" v-if="isEdit">
      <div class="user__error" v-if="stateUpdateUser.isError">
        <q-icon name="mdi-alert-circle-outline"/>
        <span>{{ stateUpdateUser.error }}</span>
      </div>
    </q-card-section>

    <q-card-section class="user__btns q-pt-md q-pb-lg">
      <template v-if="!isEdit">
        <q-btn dense outline color="primary" class="q-px-md" @click="isEdit = true">Изменить</q-btn>
        <q-btn dense outline class="q-px-md" disable>все настройки</q-btn>
      </template>
      <template v-else>
        <q-btn dense outline class="q-px-md" @click="isEdit = false">отмена</q-btn>
        <q-btn dense outline color="primary" class="q-px-md" @click="onUpdate">сохранить</q-btn>
      </template>
    </q-card-section>
  </div>


  <q-inner-loading
      :showing="stateSetActive.isLoading || stateUpdateUser.isLoading"
  >
    <q-spinner-ball size="40px"/>
    <div class="user__loading q-pt-md">
      {{ user.active ? "Деактивация...": "Активация..." }}
    </div>
  </q-inner-loading>

</div>
</template>

<style lang="scss" scoped>
.user{
  position: relative;

  &__wrapper{
    height: 100%;
    position: relative;

    background-color: rgb(255, 255, 255) !important;
    
    border-radius: 0.4rem;
    border: 1px solid $grey-4;

    &_edit{
      border: 2px dashed $grey-6;
    }
  }
  &__label{
    color: $grey-7;
    font-size: 0.9em;
  }
  &__header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__text{
    text-transform: lowercase;
    font-weight: 600;
    color: $grey-8;
    line-height: 1.715rem;
    font-size: 1.08em;

    user-select: none;
  }
  &__caption{
    font-size: 0.8rem;
    color: $grey-8;
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
  &__info{
    font-size: 0.9rem;

    padding-left: 10%;
  }
  &__error{
    color: $negative;
  }
  &__btn{
    font-size: 0.9em;
    font-weight: 600;
  }
  &__btns{
    position: absolute; 
    bottom: 0;
    left: 0; right: 0;

    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }
}
</style>