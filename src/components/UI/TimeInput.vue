<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: "00:10" },
  seconds: { type: Array, default: ['0', '3', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'] },
  minutes: { type: Array, default: ['0', '1', '2', '3', '4', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'] }
})

const emit = defineEmits(['update:modelValue'])

let activeMenu = ref(false)

const typeTime = {
  SECONDS: 1,
  MINUTES: 0
}

function onClick(event, typeTime = typeTime.SECONDS){
  let value = event.target.innerText

  if(value && value.length){
    let values = props.modelValue.split(":")
    values[typeTime] = ("00"+value).slice(-2)

    if(values.join(":") == "00:00"){
      return;
    }

    emit('update:modelValue', values.join(":"))
  }
}

const getTimeByType = (typeTime) => props.modelValue.split(":")[typeTime]
</script>

<template>
<button class="time-input" @blur="activeMenu = false">
  <div 
      :class="['time-input__value', activeMenu ? 'active' : '']" 
      @click="activeMenu = !activeMenu"
  >
    <div class="time-input__time">
      <span class="time-input__span">{{ getTimeByType(typeTime.MINUTES) }}</span>
      <span>:</span>
      <span class="time-input__span">{{ getTimeByType(typeTime.SECONDS) }}</span>
    </div>
  
    <q-icon name="mdi-clock-outline"/>
  </div>

  <Transition name="fade">
    <div class="time-input__menu time-menu" v-if="activeMenu">
      <div class="time-menu__lines">
        <div class="time-menu__line" @click="(event)=>onClick(event, typeTime.MINUTES)">
          <div 
            v-for="n in minutes"
            :class="[
                'time-menu__num', 
                Number(getTimeByType(typeTime.MINUTES)) === Number(n) ? 'active' : ''
              ]"
          >{{ n }}</div>
        </div>

        <div class="time-menu__line" @click="(event)=>onClick(event, typeTime.SECONDS)">
          <div 
            v-for="n in seconds"
            :class="[
                'time-menu__num', 
                Number(getTimeByType(typeTime.SECONDS)) === Number(n) ? 'active' : ''
              ]"
          >{{ n }}</div>
        </div>
      </div>
      
       <!--
      <div class="time-menu__btns" v-if="false">
        <q-btn dense class="time-menu__btn" flat color="primary">отмена</q-btn>

        <q-btn dense class="time-menu__btn" color="primary">ок</q-btn>
      </div> -->
    </div>
  </Transition>
</button>
</template>

<style lang="scss" scoped>
.time-menu{
  position: absolute;

  z-index: 5;

  background-color: white;
  
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid $primary;

  transition: 0.4s all ease;

  &__lines{
    display: flex;

    max-height: 200px;
  }

  &__line{
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color:rgba(0,0,0,.2) white;
    width: 3rem;

    &:not(:last-child){
      border-right: 1px solid $primary;
    }
  }

  // &__btns{
  //   display: flex;
  //   justify-content: end;
  //   gap: 0.4rem;

  //   border-top: 1px solid $primary;

  //   padding: 0.4rem 0.6rem 0.4rem 0.6rem;
  // }

  // &__btn{
  //   padding: 0 0.6rem;
  // }

  &__num{
    cursor: pointer;
    padding: 0.2rem 0.8rem 0.2rem 0.3rem;

    &:hover{
      background-color: rgba(0, 0, 0, 0.1);
    }

    &.active{
      background-color: #F6A9B432;
      color: $primary;
    }
  }
}

.time-input{
  &__span{
    padding-top: 2px;
  }

  &__time{
    display: flex;
    align-items: center;
  }

  &__value{
    cursor: pointer;

    padding: 0.2rem 0.6rem;
    margin: 0 1px;

    border-radius: 4px;
    border: 1px solid rgba(0,0,0,0.26);

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 0.3rem;

    &:hover{
      border: 1px solid rgba(0,0,0,1);
    }

    &.active{
      outline: 1px solid $primary;
      border: 1px solid $primary;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>