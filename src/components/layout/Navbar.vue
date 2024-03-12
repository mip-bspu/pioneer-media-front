<script setup>
import { navbar_routes } from '@/router/routes';
</script>

<template>
<div class="navbar">
  <div class="container">
    <div class="navbar__box">
      <nav>
        <ul class="navbar__items">
          <li class="navbar__item" v-for="route in navbar_routes">
            <router-link :to="route.path">{{ route.meta.name }}</router-link>
          </li>
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
</div>
</template>

<style lang="scss" scoped>
.navbar{
  font-size: 1.3rem;

  background-color: white;
  color: black;
  border-bottom: 1px solid rgba(0,0,0,0.1);

  &__box{
    height: 80px;
    
    padding: 1rem 2rem;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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