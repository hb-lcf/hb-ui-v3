<template>
  <label :class="[
      'hb-radio',
      {
        [`hb-radio-${size}`]: border,
        'hb-radio-border': border
      }
    ]" :style="labelStyle">
    <span :class="isClass">
      <input v-model="proxy.modelValue" type="radio" :name="name" :value="label" :disabled="disabled" @input="input" />
    </span>
    <span class="hb-radio-text" :style="isStyle">
      <slot />
    </span>
  </label>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'HbRadio',
  props: {
    modelValue: String,
    label: String,
    name: String,
    disabled: Boolean,
    border: Boolean,
    size: {
      type: String,
      default: 'large',
      validator: (v) => {
        return ['large', 'medium', 'small', 'mini', ''].includes(v)
      }
    }
  },
  emits: ['update:modelValue', 'change'],
  setup (props, { emit }) {
    const proxy = new Proxy(props, {
      set () {
        return true
      }
    })
    const input = (e) => {
      emit('update:modelValue', e.target.value)
      emit('change', e.target.value)
    }
    const isLabel = computed(() => props.modelValue === props.label)
    const isClass = computed(() => {
      return [
        'hb-radio-o',
        isLabel.value
          ? props.disabled
            ? 'hb-radio-disabled'
            : 'hb-radio-hig'
          : ''
      ]
    })
    const isStyle = computed(() => {
      return [
        {
          color: isLabel.value
            ? props.disabled
              ? '#b6b5b5'
              : '#3a6ff4'
            : props.disabled
              ? '#b6b5b5'
              : '#333'
        }
      ]
    })
    const labelStyle = computed(() => {
      return {
        cursor: props.disabled ? 'no-drop' : 'pointer',
        borderStyle: props.border
          ? `border: 1px solid ${isLabel.value ? (props.disabled ? '#b6b5b5' : '#3a6ff4') : '#b6b5b5'
          }`
          : ''
      }
    })
    return {
      proxy, labelStyle, isStyle, isClass, isLabel, input
    }
  }

}
</script>

<style lang="scss" scoped>
$radioColor: #3a6ff4;

.hb-radio {
  margin-right: 19px;
  user-select: none;

  // 选择的圆圈
  .hb-radio-o {
    width: 12px;
    height: 12px;
    display: inline-block;
    border: 1px solid rgb(228, 227, 227);
    vertical-align: middle;
    border-radius: 50%;
    transition: 0.3s;

    input {
      display: none !important;
    }
  }

  // 小点点
  .hb-radio-o::after {
    content: "";
    width: 4px;
    height: 4px;
    border-radius: 100%;
    background-color: #fff;
    position: absolute;
    top: 33%;
    right: 33%;
  }

  // 文字
  .hb-radio-text {
    font-size: 14px;
    margin-left: 6px;
    transition: 0.3s;
  }

  // 选中的
  .hb-radio-hig {
    background-color: $radioColor;
    border: 1px solid $radioColor;
    position: relative;
  }

  .hb-radio-disabled {
    background-color: #b6b5b5;
    border: 1px solid #b6b5b5;
    position: relative;
  }
}

.hb-radio-border {
  border-radius: 4px;
  display: inline-block;
}

.hb-radio-large {
  padding: 7px 20px 10px 20px;
}

.hb-radio-medium {
  padding: 5px 17px 8px 17px;
}

.hb-radio-small {
  padding: 3px 14px 6px 14px;
}

.hb-radio-mini {
  padding: 1px 11px 4px 11px;
}
</style>