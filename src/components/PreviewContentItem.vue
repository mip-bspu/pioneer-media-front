<script setup>
import { ref } from 'vue'
import { assignTimeForImageFile } from "@/services/action.service"

defineProps({
  srcImage: {type: String},
  dataFile: {type: Object},
  onDelete: {type: Function},
  selected: {type: Boolean, default: true},
  time: {type: Boolean, default: false}
})

let active = ref(false)
</script>

<template>
<div :class="['preview', 'preview__wrapper', selected ? 'selected' : '']">
  <div class="preview__image">
    <img :src="srcImage" v-if="srcImage"/>

    <div class="preview__background">
      <q-icon name="mdi-camera-burst"/>
    </div>
  </div>

  <div class="preview__icons">
    <q-icon 
        :name="!selected ? 'mdi-delete-circle-outline' : 'mdi-close-circle-outline'" 
        class="preview__icon-btn preview__delete" 
        @click.stop="()=>onDelete(dataFile, selected)"
    ></q-icon>

    <q-icon name="mdi-play-circle"></q-icon>
  </div>

  <div class="preview__description" @click.stop>
    <div v-if="!time" class="preview__name">
      <span>{{ dataFile.name }}</span>
    </div>

    <template v-else>
      <button class="preview__btn" @click="active = !active">
        <span>{{ dataFile.name }}</span>
        <q-icon 
            name="mdi-chevron-down" 
            :class="['preview__arrow', active ? 'active' : '']"
        />
      </button>

      <q-input 
          type="time"
          dense outlined
          bg-color="white"
          v-show="active"
          @update:modelValue="(v)=>assignTimeForImageFile(dataFile, v)" 
          :modelValue="dataFile.time"
      />
    </template>
  </div>
</div>
</template>

<style lang="scss" scoped>
.preview{
  &__wrapper{
    cursor: pointer;

    position: relative;
    overflow: hidden;

    border: 1px solid white;
    border-radius: 0.4em;

    &.selected{
      filter: grayscale(80%);

      & .preview__icon-btn{
        color: rgb(255, 255, 255);
      }
    }

    &{
      background: linear-gradient(180deg, rgba(35, 35, 35, 0) 30%, rgba(0, 0, 0, 0));
    }

    &:hover{
      border: 1px solid $primary;

      .preview__icons{
        color: rgba(255, 255, 255, 0.8);
        background: linear-gradient(180deg, rgba(35, 35, 35, 0.588) 30%, rgba(0, 0, 0, 0.068));
      }
 
      img{
        transform: scale(1.1);
      }
    }
  }

  &__background{
    position: absolute;
    z-index: -1;
    top: 0; bottom: 0;
    left: 0; right: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 3rem;
    color: #363E4E69;
    background-color: #290B1032;
  }

  &__image{
    width: 100%;
    height: 140px;

    position: relative;
    z-index: 1;

    img{
      transition: all 0.2s ease;

      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__btn{
    cursor: pointer;

    padding: 0.2rem 0.4rem;
    border-radius: 0.2rem;

    color: rgb(213, 213, 213);
    font-size: 0.9rem;

    display: flex;
    align-items: center;
    justify-content: space-between;

    &:hover{
      color: rgb(247, 247, 247);
      background-color: rgba(213, 213, 213, 0.291);
    }
  }

  &__name{
    color: rgb(213, 213, 213);
    font-size: 0.9rem;
  }

  &__arrow{
    font-size: 1.2rem;

    transition: all 0.2s ease;
    &.active{
      transform: rotate(180deg);
    }
  }

  &__description{
    position: absolute;
    z-index: 2;
    bottom: 0;

    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    padding: 0.4rem;
    width: 100%;

    font-size: 0.8em;
    user-select: none;

    background-color: #363E4E;
  }

  &__icons{
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0rem;

    width: 100%;

    padding: 0.25rem 0.5rem;
    display: flex;
    justify-content: space-between;

    font-size: 1.7rem;
    color: rgba(255, 255, 255, 0.4);

    transition: all 0.3s ease;
  }

  &__icon-btn:hover{
    color:rgb(255, 255, 255)
  }

  &__delete:hover{
    color:rgb(255, 255, 255);
  }
}
</style>