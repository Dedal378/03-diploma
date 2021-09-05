<template>
  <span :class="['badge', computedType]">Активен</span>
</template>

<script>
import { computed } from "vue"

export default {
  props: {
    type: {
      type: String,
      default: 'primary',
      requires: true,
    },
  },
  setup(props) {
    const computedType = computed(() => props.type)

    return {
      computedType,
    }
  },
}
</script>