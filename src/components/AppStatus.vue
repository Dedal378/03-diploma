<template>
  <span :class="['badge', classType]">{{ value }}</span>
</template>

<script>
import { ref, watch } from "vue"

export default {
  props: {
    type: {
      type: String,
      default: 'primary',
      requires: true,
    },
  },
  setup(props) {
    const classes = {
      active: 'primary',
      pending: 'warning',
      done: 'primary',
      cancelled: 'danger'
    }

    const values = {
      active: 'Активен',
      pending: 'Выполняется',
      done: 'Завершен',
      cancelled: 'Отменен'
    }

    const classType = ref(classes[props.type])
    const value = ref(values[props.type])

    watch(props, val => {
      classType.value = classes[val.type]
      value.value = values[val.type]
    })

    return {
      classType, value
    }
  },
}
</script>