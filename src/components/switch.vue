<template>
  <span v-if="closeText" class="hb-switch-closeText" :style="[`color:${switchValue ? '#333' : '#3a6ff4'}`]">
    {{ closeText }}
  </span>
  <span :class="['hb-switch', { 'hb-switch-disabled': disabled }]" :style="switchStyle" @click="clickSwitch">
    <span class="hb-switch-roll" :style="switchRollStyle" />
  </span>
  <span v-if="openText" class="hb-switch-openText" :style="[`color:${modelValue ? '#3a6ff4' : '#333'}`]">
    {{ openText }}
  </span>
</template>

<script>
import { ref, computed } from 'vue'
export default {
  name: 'HbSwitch',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    closeColor: {
      type: String,
      default: '#dcdfe6'
    },
    openColor: {
      type: String,
      default: '#3a6ff4'
    },
    closeText: {
      type: String,
      default: ''
    },
    openText: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 40
    }
  },
  emits: ["update:modelValue", "change"],
  setup (props, { emit }) {
    console.log(1)
    const switchValue = ref(props.modelValue);

    const clickSwitch = () => {
      if (props.disabled) return;
      switchValue.value = !switchValue.value;
      emit("update:modelValue", switchValue.value);
      emit("change", switchValue.value)
    };
    const switchColor = computed(() => {
      return props.modelValue ? props.openColor : props.closeColor;
    });
    const switchStyle = computed(() => {
      const width = ref(props.width);
      if (width.value < 20) width.value = 20;
      return [
        {
          width: `${width.value}px`,
          height: `${width.value / 2}px`,
          backgroundColor: switchColor.value,
        },
      ];
    });
    const switchRollStyle = computed(() => {
      const width = ref(props.width);
      if (width.value < 20) width.value = 20;
      return [
        {
          width: `${width.value / 2 - 4}px`,
          height: `${width.value / 2 - 4}px`,
          left: props.modelValue ? `${width.value / 2}px` : "0px",
        },
        `border:2px solid  ${switchColor.value}`,
      ];
    })

    return {
      switchValue,
      clickSwitch,
      switchColor,
      switchStyle,
      switchRollStyle
    }
  },

}
</script>

<style lang="scss" scoped>
.hb-switch {
  display: inline-block;
  transition: 0.3s;
  position: relative;
  border-radius: 20px;
  cursor: pointer;

  .hb-switch-roll {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    transition: 0.3s;
    border-radius: 50%;
    background-color: #fff;
  }
}
.hb-switch-disabled {
  opacity: 0.6;
  cursor: no-drop;
}
.hb-switch-closeText,
.hb-switch-openText {
  vertical-align: top;
  font-size: 13px;
  color: #333;
  transition: 0.3s;
}
.hb-switch-closeText {
  margin-right: 5px;
}
.hb-switch-openText {
  margin-left: 5px;
}
</style>
