<script setup>
defineProps({
  srcImage: { type: String },
  dataFile: { type: Object },
  bgStyle: { type: Object, default: null}
})
</script>

<template>
<div class="preview preview__wrapper">
  <div class="preview__image" :style="bgStyle">
    <img :src="srcImage" v-if="srcImage"/>

    <div class="preview__background">
      <q-icon name="mdi-camera-burst"/>
    </div>
  </div>

  <div class="preview__icons">
    <slot name="icons"></slot>
  </div>

  <div class="preview__description" @click.stop>
    <div class="preview__name">
      <span>{{ dataFile.name }}</span>
    </div>
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

    &:hover{
      border: 1px solid $primary;

      .preview__icons{
        background: linear-gradient(180deg, rgba(51, 51, 51, 0.451) 20%, rgba(0, 0, 0, 0));
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

    transition: all 0.2s ease;
    img{
      transition: all 0.2s ease;

      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__name{
    color: rgb(213, 213, 213);
    font-size: 0.9rem;
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
    top: 0; left: 0;

    width: 100%;

    transition: all 0.3s ease;
  }
}
</style>