<template>
  <the-navbar></the-navbar>
  <div class="container with-nav">
    <router-view />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import TheNavbar from './components/TheNavbar'
import axios from 'axios'

export default {
  components: { TheNavbar },
  setup() {
    const firebaseData = process.env.VUE_APP_FIREBASE_DATA

    const loadTasks = async function (firebaseData) {
      // eslint-disable-next-line no-unused-vars
      const { data } = await axios.get(`${ firebaseData }/tasks.json`)
      console.log(data)
    }

    onMounted(() => loadTasks(firebaseData))

    return {
      firebaseData, loadTasks
    }
  },
}
</script>

<style>

</style>