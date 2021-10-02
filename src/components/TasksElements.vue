<template>
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
        @click="$emit('open-task', task.id)"
        class="btn primary"
    >
      Посмотреть
    </button>
  </div>
</template>
<script>
import AppStatus from '@/components/AppStatus'

export default {
  name: 'TasksElements',
  components: { AppStatus },
  props: {
    tasks: {
      type: Array,
      required: true
    },
  },
  emits: ['open-task']
}
</script>
