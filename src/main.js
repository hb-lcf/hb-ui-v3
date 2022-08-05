import { createApp} from 'vue'
import App from './App.vue'
import HbUI from './components/index'
// import HbButton from './components/button.vue'
// import HbSwitch from './components/switch.vue'
// import HbDialog from './components/dialog.vue'
// import HbDrawer from './components/drawer.vue'
// import HbRadio from './components/radio.vue'
// import HbSkeleton from './components/skeleton.vue'
// import HbTable from './components/table.vue'

import './assets/font/iconfont.css'

const app = createApp(App)
app.use(HbUI)
// app.component('hb-button',HbButton)
// .component('hb-switch',HbSwitch)
// .component('hb-dialog',HbDialog)
// .component('hb-drawer',HbDrawer)
// .component('hb-radio',HbRadio)
// .component('hb-skeleton',HbSkeleton)
// .component('hb-table',HbTable)
.mount('#app')

