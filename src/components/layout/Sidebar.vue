<script setup>
import { sidebar_routes } from '@/router/routes';
import {router, onPage} from '@/router'


</script>

<template>
<div class="sidebar">
<div class="sidebar__content">
  <nav>
    <ul class="sidebar__items">
      <li 
        :class="'sidebar__item' + (onPage(route.name) ? ' sidebar__item_active' : '')" 
        v-for="route in sidebar_routes"
      >
        <router-link :to="route.path">
          <div class="row no-wrap items-center" style="gap: 0.4rem;">
            <q-icon :name="route.meta.icon" v-if="route.meta.icon"/>

            <span>
              {{ route.meta.name }}
            </span>
          </div>
        </router-link>
      </li>
    </ul>
  </nav>
</div>
</div>
</template>

<style lang="scss" scoped>
.sidebar{
  min-width: 160px;
  
  max-width: 280px;
  width: 20vw;
  height: 100%;

  display: flex;
  
  color: rgb(255, 255, 255);
  
  &__content{
    width: 100%;

    margin: 1rem 0;
    padding: 1rem 1.4rem;

    background: linear-gradient(-45deg, $primary 10%, $secondary 150%);
    border-radius: 1rem;
  }

  &__items{
    padding-top: 8vh;

    font-size: 1.4rem;
  }

  &__item:not(:first-child){
    margin-top: 0.8rem;
  }

  &__item{

    transition: all 0.2s ease;

    border-left: 3px solid rgba(255, 255, 255, 0);

    &_active{
      border-left: 3px solid white;
      padding-left: 1rem;

      font-size: 1.56rem;
    }
  }
}
</style>