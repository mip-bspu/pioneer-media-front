<script setup>
const props = defineProps({
  data: {type: Object}
})
</script>

<template>
<div class="device">
  <div class="device__wrapper">
    <div :class="['device__status']"></div>

    <div class="device__column">
      <q-icon name="mdi-dots-vertical" class="device__btn-edit"/>
    </div>
    <div class="device__column">
      <div class="device__description ellipsis">{{ data.description + "School 13 asdf  office asdf" }}</div>

      <div class="device__row">
        <div class="device__tags ellipsis">
          <div class="device__label">Тэги:</div>
          <div class="device__text ellipsis">{{data.tags.map(i=>Array(5).fill(i.name))[0].join(", ")}}</div>
        </div>

        <div class="device__ping">
          <div class="device__label">Статус:</div>
          <div class="device__text device__text_small">Не подключён</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.device{
  &__wrapper{
    position: relative;
    display: flex;
    flex-direction: row;

    min-width: 340px;
    height: 100px;

    padding: 0.6rem 0 0.6rem 0;

    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-width: 1px 1px 1px 4px;
    border-radius: 0.3em;

    font-size: 0.9rem;
  }

  &__column{
    display: flex;
    flex-direction: column;
    justify-content: center;

    &:last-child{
      justify-content: space-between;
      flex: 1 1 100%;
    }
  }

  &__row{
    display: flex;
    justify-content: space-between;
    gap: 0.6em;

    padding: 0 1rem;
  }

  &__btn-edit{
    margin-left: 0.1em;

    font-size: 2rem;
    cursor: pointer;

    border-radius: 50%;

    transition: all 0.1s ease;

    &:hover{
      background-color: $grey-3;
    }
    &:active{
      background-color: $grey-4;
    }
  }

  &__description{
    padding: 0 2rem 0 1rem;

    font-size: 1.24em;
    color: $primary;
    text-transform: capitalize;
  }

  &__label{
    font-size: 0.9em;
    color: $grey-8;
  }

  &__text{
    line-height: 1.1em;
    color: $grey-9;

    &_small{
      font-size: 0.9em;
    }
  }

  &__status{
    position: absolute;
    top: 0.4rem; right: 0.4rem;

    width: 12px;
    height: 12px;

    border-radius: 50%;

    background-color: $negative;

    &_active{
      background-color: $positive;
    }
  }
}
</style>