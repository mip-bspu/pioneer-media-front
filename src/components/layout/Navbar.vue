<script setup>
import { navbar_routes } from '@/router';
import { useStore } from '@/store/useStore'
import { useAuth } from '@/composables/useAuth'

const { inAnyGroup } = useAuth();
const { store: UserStore } = useStore("user")

const { onLogout } = useAuth()
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
        </ul>
      </nav>

      <div class="navbar__right">
        <div class="navbar__profile">
          <div class="profile__icon">
            <q-icon name="mdi-account-circle-outline"/>
          </div>
          <div class="profile__name">{{ UserStore.getLogin() }}</div>
        </div>

        <q-separator vertical class="q-mx-md"/>

        <q-btn 
            icon="mdi-logout-variant" 
            dense flat
            @click="onLogout"
            color="grey-9"
        >Выход</q-btn>
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
    
    padding: 1rem 1rem 1rem 2rem;

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
  &__right{
    display: flex;
    flex-direction: row;
  }
  &__profile{
    display: flex;
    align-items: center;

    padding: 0 0.33em;

    text-transform: capitalize;
    color: $grey-9;
  }
}
.profile{
  &__icon{
    display: flex;
    justify-content: center;
    align-items: center;

    width: 40px;
    height: 40px;

    font-size: 2rem;

    border-radius: 50%;
    background-color: white;
  }
  &__name{
    font-size: 14px;
    font-weight: 500;
    line-height: 1.715em;
    text-transform: uppercase;
  }
}
</style>