<template>

  <div>
    <hb-table :data="tableData" :columns="columns" />

    <hb-button simple type="primary">主要按钮</hb-button>
    <hb-button simple type="success">成功按钮</hb-button>
    <hb-button simple type="danger">危险按钮</hb-button>
    <hb-button simple type="warning">警告按钮</hb-button>
    <hb-button>1231</hb-button>
    <hb-button icon loading type="primary">222 </hb-button>
    <hb-button disabled type="success">11</hb-button>
    <hb-button disabled type="info">11</hb-button>
    <hb-button disabled round type="warning">222 </hb-button>
    <hb-button disabled circle type="danger">11</hb-button>
  </div>
  <div>
    <hb-switch v-model="aaaa" />
    <hb-switch v-model="bbbb" />

  </div>
  <hb-button simple @click="open1 = true">点我打开</hb-button>

  <hb-dialog v-model="open2" title="这是标题" :showHeader="false">
    欢迎使用 hb-ui 的 dialog 对话框！
    <template v-slot:footer>
      <hb-button type="primary" style="margin-right: 20px">确定</hb-button>
      <hb-button type="primary" simple @click="open2 = false">取消</hb-button>
    </template>
  </hb-dialog>

  <hb-button simple @click="open3 = true">点我打开第一层</hb-button>

  <hb-dialog v-model="open3" title="这是标题" width="50%">
    欢迎使用 hb-ui 的 dialog 对话框！
    <hb-button type="success" @click="open4 = true">打开第二层</hb-button>
    <hb-dialog v-model="open4" title="这是标题" top="10vh">
      hi～我是第二层的 dialog 对话框
    </hb-dialog>
  </hb-dialog>
  <hb-button type="primary" @click="open5">展示通知</hb-button>

  <hb-button type="primary" @click="open10= true">点我打开</hb-button>

  <hb-radio v-model="radio" label="right">从右面弹出</hb-radio>
  <hb-radio v-model="radio" label="left">从左面弹出</hb-radio>
  <hb-radio v-model="radio" label="bottom">从下面弹出</hb-radio>
  <hb-radio v-model="radio" label="top">从上面弹出</hb-radio>

  <hb-drawer v-model="open10" :direction="radio" title="这是标题">
    hello，欢迎使用 hb-ui!
  </hb-drawer>
  <hb-skeleton width="100%" />
  <hb-skeleton width="150px" />
  <hb-skeleton width="100px" height="100px" />
  <hb-table :data="tableData" :columns="columns" trHeight="100px" />
  <hb-table :data="tableData" :columns="columns" align="center" />
  <hb-table :data="tableData" :columns="columns" align="center" border zebra />
  <hb-table :data="tableData" :columns="columns" align="center" width="500px" height="200px" />
  <hb-table :data="tableData" :columns="columns" align="center" num />
  <hb-table :data="tableData" :columns="columns" align="center" num :important="[2, 4]" />
  <hb-table :data="tableData" :columns="columns2" align="center" />
</template>



<script>
import { ref, getCurrentInstance } from 'vue'
export default {

  name: 'App',
  components: {
  },

  methods: {
    ff () {
      console.log(123)
    }
  },
  setup () {
    const columns2 = [
      {
        title: '日期',
        key: 'date',
        width: '100px'
      },
      {
        title: '姓名',
        key: 'name',
        width: '100px'
      },
      {
        title: '地址',
        key: 'address'
      }
    ]
    const columns = [
      {
        title: '日期',
        key: 'date'
      },
      {
        title: '姓名',
        key: 'name'
      },
      {
        title: '地址',
        key: 'address'
      }
    ]
    const tableData = [
      {
        date: '2021-11-02',
        name: '张三',
        address: '浙江省杭州市上城区 231 号'
      },
      {
        date: '2021-12-04',
        name: '李四',
        address: '浙江省杭州市西湖区 12 号'
      },
      {
        date: '2021-10-01',
        name: '王英',
        address: '浙江省杭州市临平区 2 号'
      },
      {
        date: '2021-11-03',
        name: '李逵',
        address: '浙江省杭州市拱墅区 199 号'
      }
    ]
    const open5 = () => {

      Notification({
        title: '提示',
        message: '这里是提示的文案'
      })
    }
    // Notification
    const aaaa = ref(true)
    const bbbb = ref(true)
    const open1 = ref(false)
    const open2 = ref(false)
    const open3 = ref(false)
    const open4 = ref(false)
    const radio = ref('right')
    const open10 = ref(false)

    return {
      radio,
      aaaa,
      bbbb,
      open1,
      open2,
      open3,
      open4,
      open5,
      open10,
      columns,
      tableData,
      columns2
    }
  }
}
</script>

<style lang="scss">
</style>
