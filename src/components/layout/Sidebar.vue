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
  
  &__content{
    width: 100%;


    color: white;
    background-color: rgb(39, 48, 58);
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }

  &__items{
    padding-top: 8vh;

    font-size: 1.4rem;
  }

  &__item:not(:first-child){
    margin-top: 0.2rem;
  }

  &__item{
    padding: 0.6rem 1.4rem;

    color: rgba(255,255,255,0.6);

    &_active{
     color: white;

     background: linear-gradient(110deg,rgb(39, 48, 58, 0.5) 5%, rgb(225, 41, 68, 0.5) 20%, rgb(39, 48, 58, 0.5) 70%, rgb(225, 41, 68, 0.4) 80%, rgb(39, 48, 58, 0.5));
    }
  }
}
</style>