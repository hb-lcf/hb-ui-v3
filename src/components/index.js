// 引入封装好的组件
import HbButton from './button.vue'
import HbSwitch from './switch.vue'
import HbDialog from './dialog.vue'
import HbDrawer from './drawer.vue'
import HbRadio from './radio.vue'
import HbSkeleton from './skeleton.vue'
import HbTable from './table.vue'

const coms = [HbButton,HbSwitch,HbDialog,HbDrawer,HbRadio,HbSkeleton,HbTable]; // 将来如果有其它组件,都可以写到这个数组里


// 批量组件注册
const install = function (Vue) {
  coms.forEach((com) => {
    Vue.component(com.name, com);
  });
};

export default install; // 这个方法以后再使用的时候可以被use调用