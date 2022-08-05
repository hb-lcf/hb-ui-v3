<template>
  <div :class="[
      'hb-skeleton',
      {
        'hb-skeleton-round': round,
        'hb-skeleton-animation': animation
      }
    ]" :style="{ width, height }" />
</template>

<script>

export default {
  name: 'HbSkeleton',
  props: {
    round: Boolean,
    width: String,
    height: String,
    animation: Boolean
  }
}
</script>
<style lang="scss" scoped>
.hb-skeleton {
  min-height: 16px;
  width: 100%;
  background: #eee;
  display: inline-block;
  border-radius: 4px;
}

.hb-skeleton-round {
  border-radius: 30px;
}

.hb-skeleton-animation {
  animation: skeleton 1.5s infinite;
}

@keyframes skeleton {
  0% {
    opacity: 0.4;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.4;
  }
}
</style>