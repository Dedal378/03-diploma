<template>
  <the-navbar></the-navbar>
  <div class="container with-nav">
    <router-view v-slot="{ Component, route }">
      <transition name="fade">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar'
import { onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  components: { TheNavbar },
  setup() {
    const store = useStore()
    const loadTasks = () => store.dispatch('loadTasks')

    onMounted(() => loadTasks())

    return { loadTasks }
  },
}
</script>

<style>

</style>
