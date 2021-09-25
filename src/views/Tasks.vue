<template>
  <h1
      v-if="tasks.length === 0"
      class="text-white center"
  >
    Задач пока нет
  </h1>

  <template v-else>
    <h3 class="text-white">Всего активных задач: {{ taskActive }}</h3>

    <div
        v-for="task in tasks"
        :key="task.id"
        class="card"
    >
      <h2 class="card-title">
        {{ task.title }}
        <AppStatus :type="task.status" />
      </h2>

      <p>
        <strong>
          <small>
            {{ new Date(task.date).toLocaleDateString() }}
          </small>
        </strong>
      </p>

      <button
          @click="openTask(task.id)"
          class="btn primary"
      >
        Посмотреть
      </button>
    </div>
  </template>
</template>

<script>
import AppStatus from '../components/AppStatus'
import { computed } from "vue"
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Home',
  components: { AppStatus },
  setup() {
    const store = useStore()
    const router = useRouter()

    const tasks = computed(() => store.getters.tasks)
    const taskActive = computed(() => store.getters.taskActive)

    const openTask = id => router.push(`/task/${ id }`)

    return {
      tasks, openTask, taskActive
    }
  },
}
</script>