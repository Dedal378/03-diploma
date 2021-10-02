<template>
  <h1
      v-if="tasks.length === 0"
      :class="{ loader: loading }"
      class="text-white center"
  >
    Задач пока нет
  </h1>

  <template v-else>
    <h3 class="text-white">Всего активных задач: {{ taskActive }}</h3>

    <div class="card marked filter">
      <h3 class="">ФИЛЬТР ПО СТАТУСУ</h3>

      <AppFilter
          :arr-elements="arrElements"
          @new-status="newStatus"
          @reset-filter="resetStatus"
      />
    </div>

    <TasksElements
        :tasks="tasksByStatus"
        @open-task="openTask"
    />
  </template>
</template>

<script>
import { computed, reactive, ref } from "vue"
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import TasksElements from "@/components/TasksElements";
import AppFilter from "@/components/AppFilter";

export default {
  name: 'Home',
  components: { AppFilter, TasksElements },
  setup() {
    const arrElements = reactive(['active', 'pending', 'done', 'cancelled'])
    const selectedStatus = ref('')
    const store = useStore()
    const router = useRouter()

    const tasks = computed(() => store.getters.tasks)
    const taskActive = computed(() => store.getters.taskActive)
    const loading = computed(() => store.getters.loading)
    const tasksByStatus = computed(() => store.getters.filterByStatus(selectedStatus.value))

    const newStatus = status => selectedStatus.value = status
    const resetStatus = () => selectedStatus.value = ''

    const openTask = id => router.push(`/task/${ id }`)

    return {
      tasks, taskActive, openTask, loading, tasksByStatus,
      arrElements, newStatus, selectedStatus, resetStatus
    }
  },
}
</script>
