<template>
  <form class="card" @submit.prevent="newTask">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="taskName">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="taskDate">
    </div>

    <div class="form-control">
      <label>Описание</label>
      <textarea type="date" id="description" v-model="taskText"></textarea>
    </div>

    <button class="btn primary" :disabled="isValid">Создать</button>
  </form>
</template>


<script>
import { computed, ref } from "vue"
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'New',
  setup() {
    const store = useStore()
    const router = useRouter()
    const taskName = ref('')
    const taskDate = ref(null)
    const taskText = ref('')

    const newTask = () => {
      const newTaskValues = {
        id: '',
        title: taskName.value,
        text: taskText.value,
        date: new Date(taskDate.value).setHours(23, 59, 59, 999),
        status: 'active'
      }

      if (newTaskValues.date < new Date()) {
        newTaskValues.status = 'cancelled'
      }

      store.dispatch('createTask', newTaskValues)
      router.push('/')
    }

    const isValid = computed(() => {
      if (taskName.value && taskDate.value && taskText.value !== '') {
        return false
      }
      return true
    })

    return {
      taskName, taskDate, taskText, newTask, isValid
    }
  },
}
</script>