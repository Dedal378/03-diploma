<template>
  <span :class="['badge', type]">Активен</span>
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
  setup() {
    const computedType = computed(() => {
        return 'asdfasd'
      }
    )

    return {
      computedType,
    }
  },
}
</script>
in
