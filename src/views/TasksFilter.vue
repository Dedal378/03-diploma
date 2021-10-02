<template>
  <select v-model="selectedStatus">
    <option disabled selected value="">
      Статус
    </option>
    <option
        v-for="(option, idx) in arrElements"
        :key="idx"
        @click="$emit('new-status', selectedStatus)"
        :value="option"
    >
      {{ option.toUpperCase() }}
    </option>
  </select>
</template>
<script>
import { ref } from "vue";

export default {
  name: 'TasksFilter',
  props: {
    arrElements: {
      type: Array,
      required: true
    }
  },
  emits: ['new-status'],
  setup() {
    const selectedStatus = ref('')

    return { selectedStatus }
  }
}
</script>
