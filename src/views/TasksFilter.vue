<template>
  <select v-model="selectedStatus">
    <option disabled selected value="">
      <strong>Статус</strong>
    </option>
    <option
        v-for="(option, idx) in filteredElements"
        :key="idx"
        :value="option"
        @click="$emit('new-status', selectedStatus)"
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
    filteredElements: Object,
  },
  emits: ['new-status'],
  setup() {
    const selectedStatus = ref('')

    return { selectedStatus }
  },
  /*  data() {
    return {
      selectedStatus: '',
    }
  }*/
}
</script>
