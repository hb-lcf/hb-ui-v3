<template>
  <button :class="classList" :disabled="disabled || loading" :style="{color}">
    <i v-if="loading || icon" :class="['hb-icon', loading ? 'hb-icon-Redo' : icon]" :style="{ color}" />
    <slot />
  </button>
</template>

<script>
import { computed } from 'vue'
export default {
  name: "HbButton",
  props: {
    // 类型
    type: {
      type: String,
      default: 'default'
    },
    //简约按钮
    simple: {
      type: Boolean,
      default: false
    },
    //方形
    square: {
      type: Boolean,
      default: false
    },
    //是否成为圆角按钮
    round: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const colors = {
      primary: ' #3a6ff4',
      success: ' #54c600',
      danger: '#d10f1b',
      warning: '#fbcc30',
      default: '#f4f5f5'
    }
    const color = computed(() => {

      if (props.simple) return colors[props.type];
      return props.type === 'default' || !props.type ? '#333' : '#fff'
    })
    const classList = computed(() => {
      return [
        'hb-button',
        `hb-button-${props.type}`,
        {
          [`hb-button-${props.size}`]: props.size,
          'hb-button-round': props.round,
          'hb-button-square': props.square,
          'hb-button-simple': props.simple,
          'hb-button-disabled': props.disabled || props.loading,
          'hb-button-block': props.block
        }
      ]
    })
    return {
      color,
      classList
    }
  },

  methods: {
    change () {
      this.$emit('click')
    }
  }
}
</script>
<style lang="scss" scoped>
$primary: #3a6ff4;
$success: #54c600;
$danger: #d10f1b;
$warning: #fbcc30;
$default: #f4f5f5;

$primaryHover: #5d88f6;
$successHover: #6bdb18;
$dangerHover: #ea3941;
$warningHover: #fbd659;
$defaultHover: #eeeeee;

$primaryActive: #0852f3;
$successActive: #45a200;
$dangerActive: #b90510;
$warningActive: #dfb118;
$defaultActive: #dbdbdb;

.hb-button {
  min-width: 40px;
  padding: 0 22px;
  min-height: 35px;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  border: none;
  outline: none;
  text-align: center;
  transition: 0.3s;
  color: #fff;
  line-height: 1;
  font-size: 14px;

  .hb-ui-loading {
    display: inline-block;
    animation: loading 1.2s linear infinite;
    -webkit-animation: loading 1.2s linear infinite;
  }

  .hb-icon {
    margin-right: 5px;
  }

  // 基础按钮
  &.hb-button-primary {
    background: $primary;

    &:hover {
      background: $primaryHover;
      opacity: 0.8;
      box-shadow: 0 0 3px $primaryHover;
    }

    &:active {
      background: $primaryActive;
    }

    // 禁用状态
    &.hb-button-disabled:hover {
      background: $primary;
      opacity: 0.6;
      box-shadow: none;
    }
  }

  &.hb-button-success {
    background: $success;

    &:hover {
      background: $successHover;
      box-shadow: 0 0 3px $successHover;
    }

    &:active {
      background: $successActive;
    }

    // 禁用状态
    &.hb-button-disabled:hover {
      background: $success;
      opacity: 0.6;
      box-shadow: none;
    }
  }

  &.hb-button-danger {
    background: $danger;

    &:hover {
      background: $dangerHover;
      box-shadow: 0 0 3px $dangerHover;
    }

    &:active {
      background: $dangerActive;
    }

    // 禁用状态
    &.hb-button-disabled:hover {
      background: $danger;
      opacity: 0.6;
      box-shadow: none;
    }
  }

  &.hb-button-warning {
    background: $warning;

    &:hover {
      background: $warningHover;
      box-shadow: 0 0 3px $warningHover;
    }

    &:active {
      background: $warningActive;
    }

    // 禁用状态
    &.hb-button-disabled:hover {
      background: $warning;
      opacity: 0.6;
      box-shadow: none;
    }
  }

  &.hb-button-,
  &.hb-button-default {
    background: $default;
    color: #333;

    &:hover {
      background: $defaultHover;
      box-shadow: 0 0 3px $defaultHover;
    }

    &:active {
      background: $defaultActive;
    }

    // 禁用状态
    &.hb-button-disabled:hover {
      background: $default;
      opacity: 0.6;
      box-shadow: none;
    }
  }

  // 圆角按钮
  &.hb-button-round {
    border-radius: 30px;
  }

  // 简约按钮
  &.hb-button-simple {
    background: $default;

    &:hover {
      background: $defaultHover;
      box-shadow: 0 0 3px $defaultHover;
    }

    &:active {
      background: $defaultActive;
    }

    // 禁用状态
    &.hb-button-disabled:hover {
      background: $default;
      opacity: 0.6;
      box-shadow: none;
    }
  }

  // 禁用状态
  &.hb-button-disabled {
    opacity: 0.6;
    cursor: no-drop;
  }

  // 按钮大小
  &.hb-button-large {
    min-width: 50px;
    padding: 0 27px;
    height: 40px;
    font-size: 15px;
  }

  &.hb-button-small {
    min-width: 30px;
    padding: 0 17px;
    height: 30px;
    font-size: 13px;
  }

  &.hb-button-mini {
    min-width: 20px;
    padding: 0 12px;
    height: 25px;
    font-size: 12px;
  }

  &.hb-button-square {
    border-radius: 0;
  }

  // 块级元素
  &.hb-button-block {
    display: block;
    width: 100%;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }

    25% {
      transform: rotate(90deg);
    }

    50% {
      transform: rotate(180deg);
    }

    75% {
      transform: rotate(270deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>