<template>
  <h1
      v-if="tasks.length === 0"
      class="text-white center"
  >
    Задач пока нет
  </h1>

  <template v-else>
    <h3 class="text-white">Всего активных задач: {{ tasks.length }}</h3>
    <div
        class="card"
        v-for="task in tasks"
        :key="task.id"
    >
      <h2 class="card-title">
        {{ task.title }}
        <AppStatus :type="task.status" />
      </h2>
      <p>
        <strong>
          <small>
            {{ task.date }}
          </small>
        </strong>
      </p>
      <button class="btn primary">Посмотреть</button>
    </div>
  </template>
</template>

<script>
import AppStatus from '../components/AppStatus'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    return {
      tasks: store.getters.tasks,
    }
  },
  components: { AppStatus },
}
</script>
