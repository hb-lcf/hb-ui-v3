<template>
  <transition name="hb-dialog" @after-enter="$emit('onOpen')" @after-leave="$emit('onClose')">
    <div :class="['hb-dialog-packing', { 'hb-dialog-modal': modal }]" :style="{ zIndex }" v-show="modelValue" @click.self="packingClose">
      <div class="hb-dialog" :style="{ width, marginTop: top }">
        <div v-if="showHeader" class="hb-dialog-header">
          <span v-if="$slots.title" class="hb-dialog-title">
            <slot name="title" />
          </span>
          <span v-else class="hb-dialog-title">{{ title }}</span>
          <i v-if="showClose" class="hb-icon hb-icon-CloseDefault" @click.stop="close" />
        </div>
        <div v-if="$slots.default" class="hb-dialog-body">
          <slot />
        </div>
        <div v-if="$slots.footer" class="hb-dialog-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { watch, getCurrentInstance } from 'vue'

export default {
  name: "HbDialog",
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '30%'
    },
    top: {
      type: String,
      default: '15vh'
    },
    title: {
      type: String,
      default: ''
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
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
  emits: [
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
    const packingClose = () => {
      if (!props.modalClose) return
      close()
    }
    const self = getCurrentInstance()
    watch(
      () => props.modelValue,
      (value) => {
        if (value) emit('open')
        const el = self.proxy.$el
        if (value && props.appendToBody) {
          document.body.appendChild(el)
        }
      }
    )

    return {
      close,
      packingClose,
    }
  }
}
</script>

<style lang="scss" scoped>
.hb-dialog-packing {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  .hb-dialog {
    padding: 20px;
    box-sizing: border-box;
    background: #fff;
    margin: auto;
    border-radius: 2px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);

    .hb-dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20px;

      .hb-dialog-title {
        font-size: 15px;
        color: #333;
      }

      .hb-ui-close {
        cursor: pointer;
      }
    }

    .hb-dialog-footer {
      padding-top: 10px;
      text-align: right;
    }
  }
}

.hb-dialog-modal {
  background: rgba(0, 0, 0, 0.4);
}

.hb-dialog-enter-active {
  transition: all 0.2s ease-out;
}

.hb-dialog-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.hb-dialog-enter-from,
.hb-dialog-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>