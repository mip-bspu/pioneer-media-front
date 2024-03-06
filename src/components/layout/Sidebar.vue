<script setup>

</script>

<template>
<div class="sidebar">
<div class="sidebar__content">
  <nav>
    <ul class="sidebar__items">
      <li class="sidebar__item">item1</li>
      <li class="sidebar__item">item2</li>
      <li class="sidebar__item">item3</li>
    </ul>
  </nav>
</div>
</div>
</template>

<style lang="scss" scoped>
.sidebar{
  max-width: 300px;
  width: 100%;
  height: 100%;

  display: flex;
  
  color: white;
  
  &__content{
    width: 100%;

    margin: 1rem 0;
    padding: 1rem;

    background: linear-gradient(-45deg, $primary 10%, $secondary 150%);
    border-radius: 1rem;
  }

  &__items{
    font-size: 1.5rem;
  }
}
</style>