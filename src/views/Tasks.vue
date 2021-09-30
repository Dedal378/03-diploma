<template>
  <h1
      v-if="tasks.length === 0"
      class="text-white center"
      :class="{loader: loading}"
  >
    Задач пока нет
  </h1>

  <template v-else>
    <transition name="fade" appear>
      <h3 class="text-white">Всего активных задач: {{ taskActive }}</h3>
    </transition>

    <div class="card marked filter">
      <h3 class="">ФИЛЬТР ПО СТАТУСУ</h3>
      <select v-model="statusSelect">
        <option disabled selected value=""><strong>Выберите cтатус</strong></option>
        <option v-for="(option, idx) in statusOptionEl" :key="idx" :value="option">{{ option.toUpperCase() }}</option>
      </select>
    </div>

    <transition-group
        name="fade"
        tag="div"
    >
      <div
          v-for="task in getFilterStatus"
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
    </transition-group>
  </template>
</template>

<script>
import AppStatus from '../components/AppStatus'
import { computed, reactive, ref } from "vue"
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Home',
  components: { AppStatus },
  setup() {
    const statusOptionEl = reactive(['', 'active', 'pending', 'done', 'cancelled'])
    const statusSelect = ref('')
    const store = useStore()
    const router = useRouter()

    const tasks = computed(() => store.getters.tasks)
    const taskActive = computed(() => store.getters.taskActive)
    const loading = computed(() => store.getters.loading)
    const getFilterStatus = computed(() => store.getters.filterByStatus(statusSelect.value))

    const openTask = id => router.push(`/task/${ id }`)

    return {
      tasks,taskActive, openTask, loading, getFilterStatus, statusSelect, statusOptionEl
    }
  },
}
</script>
