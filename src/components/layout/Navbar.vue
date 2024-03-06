<script setup>

</script>

<template>
<div class="container">
  <div class="navbar navbar__box">
    <nav>
      <ul class="navbar__items">
        <li class="navbar__item">item1</li>
        <li class="navbar__item">item2</li>
        <li class="navbar__item">item3</li>
      </ul>
    </nav>

    <div class="navbar__profile">
      <div class="profile__icon"></div>
      <div class="profile__name">test</div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.navbar{
  font-size: 1.3rem;

  background-color: $primary;
  background: linear-gradient(125deg, $secondary 0%, $primary 30%, $primary 90%);
  border-radius: 1rem;

  color: white;

  &__box{
    height: 80px;

    margin-top: 0.5rem;
    padding: 1rem 2rem;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__items{
    display: flex;
  }

  &__item:not(:first-child){
    margin-left: 1rem;
  }

  &__profile{
    display: flex;
    align-items: center;
        
    gap: 1rem;
  }
}
.profile{
  &__icon{
    width: 40px;
    height: 40px;

    border-radius: 50%;
    background-color: white;
  }
}
</style>