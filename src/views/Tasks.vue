<template>
  <h1
      v-if="tasks.length === 0"
      :class="{ loader: loading }"
      class="text-white center"
  >
    Задач пока нет
  </h1>

  <template v-else>
    <transition appear name="fade">
      <h3 class="text-white">Всего активных задач: {{ taskActive }}</h3>
    </transition>

    <div class="card marked filter">
      <h3 class="">ФИЛЬТР ПО СТАТУСУ</h3>

      <TasksFilter
          :filtered-elements="filteredElements"
          @new-status="newStatus"
      />
    </div>

    <transition-group
        name="fade"
        tag="div"
    >
      <TasksElements
          :get-filter-status="getFilterStatus"
          @open-task="openTask"
      />
    </transition-group>
  </template>
</template>

<script>
import { computed, reactive, ref } from "vue"
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import TasksElements from "@/components/TasksElements";
import TasksFilter from "@/views/TasksFilter";

export default {
  name: 'Home',
  components: { TasksFilter, TasksElements },
  setup() {
    const filteredElements = reactive(['', 'active', 'pending', 'done', 'cancelled'])
    const selectedStatus = ref('')
    const store = useStore()
    const router = useRouter()

    const tasks = computed(() => store.getters.tasks)
    const taskActive = computed(() => store.getters.taskActive)
    const loading = computed(() => store.getters.loading)
    const getFilterStatus = computed(() => store.getters.filterByStatus(selectedStatus.value))

    const newStatus = status => selectedStatus.value = status

    const openTask = id =>  router.push(`/task/${ id }`)

    return {
      tasks, taskActive, openTask, loading, getFilterStatus,
      filteredElements, newStatus, selectedStatus
    }
  },
}
</script>
