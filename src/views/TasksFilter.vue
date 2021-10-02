<template>
  <select @change="(event) => $emit('new-status', event.target.value)">
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
</template>
<script>

export default {
  name: 'TasksFilter',
  props: {
    arrElements: {
      type: Array,
      required: true
    }
  },
  emits: ['new-status']
}
</script>
