<script setup>
import {router, onPage, sidebar_routes} from '@/router'


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
  width: 280px;
  height: 100%;

  display: flex;
  
  &__content{
    width: 100%;
    position: relative;

    color: white;
    background: radial-gradient(circle, #272c3c 10%,#1E2230 60%);
    border-right: 1px solid rgba(0, 0, 0, 0.1);

    &::before, &::after{
      content: '';
      width: 20%;
      height: 2px;

      position: absolute;

      border-radius: 1rem;
      background-color: $primary;
    }

    &:after{
      top: 20px;
      left: 50%;
      transform: translate(-50%);
    }

    &:before{
      bottom: 20px;
      left: 50%;
      transform: translate(-50%);
    }
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
    margin: 0 1rem;

    color: rgba(255,255,255,0.6);

    border: 4px solid rgba(255, 255, 255, 0);
    border-radius: 1rem;
    &_active{
     color: white;

     border: 4px solid white;
    }
  }
}
</style>