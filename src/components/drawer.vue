<template>
  <transition name="hb-drawer" @after-enter="$emit('onOpen')" @after-leave="$emit('onClose')">
    <div :class="['hb-drawer-packing', { 'hb-drawer-modal': modal }]" :style="{ zIndex }" v-show="modelValue" @click.self="packingClose">
      <div :class="['hb-drawer', `hb-drawer-${direction}`]" :style="isDirection ? `width: ${size}` : `height: ${size}`">
        <div v-if="showHeader" class="hb-drawer-header">
          <span v-if="$slots.title" class="hb-drawer-title">
            <slot name="title" />
          </span>
          <span v-else class="hb-drawer-title">{{ title }}</span>
          <i v-if="showClose" class="hb-icon hb-icon-CloseDefault" @click.stop="close" />
        </div>
        <div v-if="$slots.default" class="hb-drawer-body">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {
  computed,
  getCurrentInstance,
  watch,
} from 'vue'
export default {
  name: 'HbDrawer',
  props: {
    modelValue: Boolean,
    direction: {
      type: String,
      default: 'right',
      validator: (v) => {
        return ['top', 'left', 'bottom', 'right', ''].includes(v)
      }
    },
    size: {
      type: String,
      default: '30%'
    },
    title: String,
    appendToBody: Boolean,
    modal: {
      type: Boolean,
      default: true
    },
    modalClose: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 3500
    }
  },
  emit: [
    'update:modelValue',
    'open',
    'close',
    'onOpen',
    'onClose'
  ],
  setup (props, { emit }) {
    const close = () => {
      emit('close')
      emit('update:modelValue', false)
    }
    const isDirection = computed(() => {
      const p = props.direction
      return p === 'left' || p === 'right' || p === ''
    })
    const packingClose = () => {
      if (!props.modalClose) return
      close()
    }
    const self = getCurrentInstance()
    watch(
      () => props.modelValue,
      (v) => {
        if (v) emit('open')
        const el = self.proxy.$el
        if (v && props.appendToBody) {
          document.body.appendChild(el)
        }
      }
    )
    return {
      isDirection,
      packingClose
    }
  }
}
</script>

<style lang="scss" scoped>
.hb-drawer-packing {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .hb-drawer {
    position: fixed;
    background: #fff;
    z-index: 300;
    padding: 20px;
    box-shadow: 0px 7px 30px rgba(0, 0, 0, 0.2);

    .hb-drawer-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .hb-drawer-title {
        font-size: 15px;
        color: #333;
      }

      .hb-ui-close {
        cursor: pointer;
      }
    }

    .hb-drawer-body {
      margin-top: 20px;
    }
  }

  .hb-drawer-top {
    top: 0;
    left: 0;
    right: 0;
  }

  .hb-drawer-left {
    left: 0;
    top: 0;
    bottom: 0;
  }

  .hb-drawer-bottom {
    bottom: 0px;
    right: 0;
    left: 0;
  }

  .hb-drawer-,
  .hb-drawer-right {
    right: 0px;
    top: 0;
    bottom: 0;
  }
}

.hb-drawer-modal {
  background: rgba(0, 0, 0, 0.4);
}

.hb-drawer-enter-active {
  transition: all 0.2s ease-out;
}

.hb-drawer-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.hb-drawer-enter-from,
.hb-drawer-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>