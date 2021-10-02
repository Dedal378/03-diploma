<template>
  <select v-model="selectedElement" @change="newStatus">
    <option disabled selected value="">
      Статус
    </option>
    <option
        v-for="(option, idx) in arrElements"
        :key="idx"
        :value="option"
    >
      {{ option.toUpperCase() }}
    </option>
  </select>
  <button class="btn prime ml-2" @click="resetFilter">Сбросить фильтр</button>
</template>
<script>
import { ref } from "vue";

export default {
  name: 'AppFilter',
  props: ['arrElements'],
  emits: ['new-status'],
  setup(_, { emit }) {
    const selectedElement = ref('')
    const newStatus = () => emit('new-status', selectedElement.value)
    const resetFilter = () => {
      selectedElement.value = ''
      return emit('reset-filter')
    }

    return { selectedElement, newStatus, resetFilter }
  }
}
</script>
