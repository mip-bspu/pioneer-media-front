<script setup>
defineProps({
  srcImage: {type: String},
  dataFile: {type: Object}
})
</script>

<template>
<div class="preview preview__wrapper">
  <div class="preview__image">
    <img :src="srcImage" v-if="srcImage"/>

    <div class="preview__background">
      <q-icon name="mdi-camera-burst"/>
    </div>
  </div>

  <div class="preview__icon">
    <q-icon name="mdi-play-circle"></q-icon>
  </div>

  <div class="preview__description">
    <div class="preview__name">{{ dataFile.name }}</div>
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

      .preview__icon{
        color: rgba(255, 255, 255, 0.8);
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

  &__description{
    padding: 0.4rem;
    width: 100%;
    position: absolute;
    z-index: 2;
    bottom: 0;

    color: rgb(213, 213, 213);
    font-size: 0.8em;
    user-select: none;

    background-color: #363E4E;
  }

  &__icon{
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0.5rem;

    font-size: 1.7rem;
    color: rgba(255, 255, 255, 0.4);

    transition: all 0.2s ease;
  }
}
</style>